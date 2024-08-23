import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import {
  appConfig,
  cloudinaryConfig,
  databaseConfig,
  mailConfig,
} from './common/configs/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
// import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { LogsController } from './log.controller';
import { CommonModule } from './common/common.module';
import { BucketModule } from './bucket/bucket.module';

@Module({
  imports: [
    // CacheModule.register({
    //   isGlobal: true,
    //   ttl: 1 * 60 * 60, // 12 hours
    // }),
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
          Logger.log('Database connected successfully');
          return connection;
        },
      }),
    }),
    AuthModule,
    MailModule,
    UserModule,
    BucketModule,
  ],
  controllers: [AppController, LogsController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
