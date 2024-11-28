import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IDecodedToken } from '../interfaces/auth.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (req: Request) => {
      //     // Custom function to extract the JWT from the cookie
      //     return req?.cookies?.token || null;
      //   },
      // ]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
