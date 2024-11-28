import mongooseAutoPopulate from 'mongoose-autopopulate';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BucketModule } from './bucket/bucket.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { Logger, Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { paginatePlugin, searchPlugin } from './common/db-plugins';
import { ReviewModule } from './review/review.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import {
  appConfig,
  CACHE_EXPIRY,
  cloudinaryConfig,
  databaseConfig,
  mailConfig,
} from './common/configs/constants';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    CacheModule.register({
      isGlobal: true,
      ttl: CACHE_EXPIRY, // 12 hours
    }),
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [appConfig, databaseConfig, mailConfig, cloudinaryConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('db.url'),
        connectionFactory: (connection) => {
          connection.plugin(mongooseAutoPopulate);
          connection.plugin(paginatePlugin);
          connection.plugin(searchPlugin);
          Logger.log('Database connected successfully');
          return connection;
        },
      }),
    }),
    AuthModule,
    MailModule,
    UserModule,
    BucketModule,
    ReviewModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
