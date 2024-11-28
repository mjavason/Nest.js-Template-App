import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';
import { GoogleStrategy } from './strategy/google.strategy';
import { TokenService } from './services/token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, tokenSchema } from './entities/token.schema';

@Module({
  imports: [
    MailModule,
    UserModule,
    PassportModule,
    MongooseModule.forFeature([{ name: Token.name, schema: tokenSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('app.jwtSecret'),
        signOptions: {
          expiresIn: '12h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, TokenService],
  exports: [AuthService],
})
export class AuthModule {}
