import bcrypt from 'bcrypt';
import { A_MONTH_IN_MINUTES, API_PREFIX, BASE_URL } from 'src/common/configs/constants';
import { codeGenerator } from 'src/common/utils/random_token.util';
import { ConfigService } from '@nestjs/config';
import { IDecodedToken } from '../interfaces/auth.interface';
import { isExpired } from 'src/common/utils/date.util';
import { IUserDocument } from 'src/user/user.interface';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { NewPasswordDto, RegisterDTO } from '../dto';
import { TOKEN_TYPE } from '../interfaces/token.interface';
import { TokenService } from './token.service';
import { UserService } from 'src/user/user.service';
import { VerifyTokenDto } from '../dto/token.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  async register(body: RegisterDTO) {
    const data = await this.userService.create(body);
    const verificationToken = await this.jwtService.signAsync({ sub: data.id });

    const mailSent = await this.mailService.sendMailVerificationEmail(
      data.email,
      `${data.fullName}`,
      `${this.config.get('app.baseURL')}/${this.config.get('app.apiPrefix')}/auth/verify-email?token=${verificationToken}`,
    );
    if (!mailSent) {
      await data.deleteOne();
      throw new InternalServerErrorException(
        'Registration failed: Unable to send verification mail',
      );
    }

    const accessToken = await this.jwtService.signAsync({ sub: data.id });
    const refreshToken = await this.generateRefreshToken(data.id);

    return {
      message: "Registration successful. We've sent you an account verification email",
      data: { user: data, accessToken, refreshToken },
    };
  }

  async login(user: IUserDocument) {
    const payload: IDecodedToken = { sub: user.id };
    return await this.jwtService.signAsync(payload);
  }

  async socialSignIn(socialUser: { fullName: string; avatarURL: string; email: string }) {
    const email = socialUser.email.toLowerCase().trim();
    let user = await this.userService.findOne({ email });
    if (!user) {
      user = await this.userService.create({
        email: socialUser.email,
        signInWithGoogle: true,
        isEmailVerified: true,
        fullName: socialUser.fullName,
        avatarURL: socialUser.avatarURL,
      });
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    const refreshToken = await this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  async requestForgotPassword(email: string) {
    const user = await this.userService.findOne({ email });
    if (!user) throw new NotFoundException('User with email does not exist');

    const code = codeGenerator(6); // Generate a 6-digit code
    await this.tokenService.create({
      user: user.id,
      type: TOKEN_TYPE.PASSWORD_RESET,
      token: code,
    });

    const mailSent = await this.mailService.sendForgotPasswordMail(email, user.fullName, code);
    if (!mailSent) throw new InternalServerErrorException('Unable to send verification email');

    return { message: 'Password reset code sent to your email' };
  }

  async resetPassword(body: NewPasswordDto) {
    const user = await this.userService.findOne({ email: body.email });
    if (!user) throw new BadRequestException('Invalid token');

    const storedToken = await this.tokenService.findOne({
      user: user.id,
      token: body.token,
      type: TOKEN_TYPE.PASSWORD_RESET,
    });
    if (!storedToken) throw new BadRequestException('Invalid token');

    if (isExpired(storedToken?.createdAt)) {
      await storedToken.deleteOne();
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await this.userService.update(user.id, { password: hashedPassword });
    await storedToken.deleteOne();

    return { message: 'Password reset successfully' };
  }

  async verifyToken(query: VerifyTokenDto) {
    const user = await this.userService.findOne({ email: query.email });
    if (!user) throw new BadRequestException('Invalid token');

    const storedToken = await this.tokenService.findOne({ user: user.id, token: query.token });
    if (!storedToken) throw new BadRequestException('Invalid token');

    if (isExpired(storedToken?.createdAt)) {
      await storedToken.deleteOne();
      throw new BadRequestException('Invalid or expired reset token');
    }

    return { message: 'Token valid' };
  }

  async requestMailVerification(email) {
    const user = await this.userService.findOne({ email });
    if (!user) throw new BadRequestException('Request sent successfully. Check your mail');

    if (!user.isEmailVerified) {
      const verificationToken = await this.jwtService.signAsync({ sub: user.id });
      await this.mailService.sendMailVerificationEmail(
        user.email,
        `${user.fullName}`,
        `${BASE_URL}/${API_PREFIX}/auth/verify-email/${verificationToken}`,
      );
    } else {
      throw new BadRequestException('Email already verified');
    }
  }

  async refreshToken(expiredAccessToken: string, token: string) {
    const failureMessage = 'Invalid or expired token. Please log in';
    try {
      const oldRefresh = await this.tokenService.findOne({ token });
      if (!oldRefresh) throw new ForbiddenException(failureMessage);

      // one month
      if (isExpired(oldRefresh?.createdAt, A_MONTH_IN_MINUTES)) {
        await oldRefresh.deleteOne();
        throw new ForbiddenException(failureMessage);
      }

      const decoded = await this.jwtService.decode(expiredAccessToken, { complete: true });
      if (!decoded?.payload?.sub) throw new ForbiddenException(failureMessage);
      if (decoded?.payload?.sub != oldRefresh.user) throw new ForbiddenException(failureMessage);

      const newRefreshToken = await this.generateRefreshToken(decoded?.payload?.sub);
      const newAccessToken = await this.jwtService.signAsync({ sub: decoded.payload.sub });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error: unknown) {
      Logger.log(error);
      throw new ForbiddenException(failureMessage);
    }
  }

  async generateRefreshToken(userId) {
    const refreshToken = codeGenerator(9);

    // Delete previous existing tokens, then create new one
    const prevRefreshToken = await this.tokenService.findOne({
      user: userId,
      type: TOKEN_TYPE.REFRESH_TOKEN,
    });
    if (prevRefreshToken) await prevRefreshToken.deleteOne();
    await this.tokenService.create({
      user: userId,
      token: refreshToken,
      type: TOKEN_TYPE.REFRESH_TOKEN,
    });

    return refreshToken;
  }
}
