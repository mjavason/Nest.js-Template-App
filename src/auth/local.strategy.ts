import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // Specify email as the username field
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.userService.findOne({ email });
    if (!user) throw new BadRequestException('Incorrect email or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new BadRequestException('Incorrect email or password');

    if (!user.isEmailVerified)
      throw new ForbiddenException('Please verify your email before attempting to login');

    return user;
  }
}
