import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserDocument } from 'src/user/user.interface';
import { IDecodedToken } from './auth.interface';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
  ) {}

  async register(body: RegisterDTO) {
    const data = await this.userService.create(body);
    const verificationToken = await this.jwtService.signAsync({ sub: data.id });

    const mailSent = await this.mailService.sendMailVerificationEmail(
      data.email,
      `${data.firstName} ${data.lastName}`,
      `${this.config.get('app.baseURL')}/${this.config.get('app.apiPrefix')}/auth/verify-email/${verificationToken}`,
    );
    if (!mailSent) {
      await this.userService.remove(data.id);
      throw new InternalServerErrorException(
        'Registration failed: Unable to send verification mail',
      );
    }

    return {
      message: "Registration successful. We've sent you an account verification email",
      data,
    };
  }

  async login(user: IUserDocument) {
    const payload: IDecodedToken = { sub: user.id };
    return await this.jwtService.signAsync(payload);
  }

  async requestForgotPassword(email: string) {
    const data = await this.userService.findOne({ email: email });
    if (!data) throw new NotFoundException('User with email does not exist');

    const verificationToken = await this.jwtService.signAsync({ sub: data.id });
    const mailSent = await this.mailService.sendForgotPasswordMail(
      data.email,
      `${data.firstName} ${data.lastName}`,
      `${this.config.get('app.baseURL')}/${this.config.get('app.apiPrefix')}/auth/reset-password/${verificationToken}`,
    );
    if (!mailSent)
      throw new InternalServerErrorException('Request failed: Unable to send verification mail');

    return {
      message: 'Forgot password request made successfully. Check your email',
    };
  }
}
