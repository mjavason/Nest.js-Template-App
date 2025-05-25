import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './common/configs/swagger.config';
import { HttpExceptionFilter } from './common/filter/error.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { loggerConfig } from './common/utils/logger.util';
// import './common/utils/ping.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // cors: true,
    logger: loggerConfig,
  });
  const config = app.get(ConfigService);

  // CORS Configuration
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true); // Accept all origins
    },
  });
  app.setGlobalPrefix(config.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  setupSwagger(app);

  await app.listen(config.get('app.port'));
  console.log(`App listening on port ${config.get('app.port')}`);
}

bootstrap();
