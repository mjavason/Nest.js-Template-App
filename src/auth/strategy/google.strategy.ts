import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} from 'src/common/configs/constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      fullName: `${name.givenName} ${name.familyName}`,
      avatarURL: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
