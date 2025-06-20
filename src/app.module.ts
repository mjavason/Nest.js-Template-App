import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BucketModule } from './bucket/bucket.module';
import { CommonModule } from './common/common.module';
import {
  appConfig,
  CACHE_EXPIRY,
  cloudinaryConfig,
  databaseConfig,
  mailConfig,
} from './common/configs/constants';
import { paginatePlugin, searchPlugin } from './common/db-plugins';
import { ContactModule } from './contact/contact.module';
import { MailModule } from './mail/mail.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

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
      ttl: CACHE_EXPIRY,
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
    // ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
