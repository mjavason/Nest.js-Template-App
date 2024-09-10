import { AppService } from './app.service';
import { Logger, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BucketModule } from './bucket/bucket.module';
import { CommonModule } from './common/common.module';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  appConfig,
  cloudinaryConfig,
  databaseConfig,
  mailConfig,
} from './common/configs/constants';
import { paginatePlugin, searchPlugin } from './common/db-plugins';

// import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
// import { APP_INTERCEPTOR } from '@nestjs/core';

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
