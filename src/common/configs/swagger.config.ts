import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Startup')
    .setDescription('Nest.js app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none', // Collapse everything by default
      // defaultModelsExpandDepth: -1, // Remove models (schemas) by default
    },
  });
}
