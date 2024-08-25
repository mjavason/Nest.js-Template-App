import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filter/error.filter';
import { loggerConfig } from './common/utils/logger.util';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './common/configs';
import { TransformInterceptor } from './common/interceptors/transform.intrerceptor';
import { ValidationPipe } from '@nestjs/common';
import './common/utils/ping.util';
//self ping

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: loggerConfig,
  });
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  setupSwagger(app);

  await app.listen(config.get('app.port'));
  console.log(`App listening on port ${config.get('app.port')}`);
}

bootstrap();
