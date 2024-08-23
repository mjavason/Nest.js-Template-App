import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IDecodedToken } from './auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) private config: ConfigService) {
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
    return { id: payload.sub };
  }
}
