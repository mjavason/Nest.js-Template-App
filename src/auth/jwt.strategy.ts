import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IDecodedToken } from './auth.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          // Custom function to extract the JWT from the cookie
          return req?.cookies?.token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('app.jwtSecret'),
    });
  }

  async validate(payload: IDecodedToken) {
    // return { id: payload.sub };
    const user = await this.userService.findOne({ _id: payload.sub });
    if (!user) throw new UnauthorizedException('User account does not exist');

    return user;
  }
}
