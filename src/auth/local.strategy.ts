import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { API_PREFIX, BASE_URL } from 'src/common/configs';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {
    // Specify email as the username field
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    email = email.toLowerCase();
    const user = await this.userService.findOne({ email });
    if (!user) throw new BadRequestException('Incorrect email or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new BadRequestException('Incorrect email or password');

    if (!user.isEmailVerified) {
      const verificationToken = await this.jwtService.signAsync({ sub: user.id });
      await this.mailService.sendMailVerificationEmail(
        user.email,
        `${user.firstName} ${user.lastName}`,
        `${BASE_URL}/${API_PREFIX}/auth/verify-email/${verificationToken}`,
      );

      throw new ForbiddenException(
        'Please verify your email before attempting to login. A verification mail has been sent to your email address. If not in inbox, check spam.',
      );
    }

    return user;
  }
}
