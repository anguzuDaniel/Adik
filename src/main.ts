import 'reflect-metadata';
import 'module-alias/register.js';
import { randomBytes } from 'crypto';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import metadata from './metadata.js';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for all routes
  app.use(graphqlUploadExpress({ maxFileSize: 100000, maxFiles: 10 }));

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for my Adik')
    .setVersion('1.0')
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ?? 3000;

  // Dynamically construct the URL
  const url = `http${process.env.NODE_ENV === 'production' ? 's' : ''}://localhost:${port}/graphql`;
  console.log('Server started at:', url);
  console.log(`Swagger docs available at: ${url}/docs`);

  await app.listen(port);
}
bootstrap();
