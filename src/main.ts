import './env';
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('v1');

  app.use(helmet());
  app.enableCors();

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('API Backend')
    .setDescription('API Server')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  if (
    process.env.NODE_ENV &&
    (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'prod')
  ) {
    Sentry.init({
      dsn: process.env.SENTRY_DNS || '',
      environment: process.env.NODE_ENV || 'local',
    });
  }

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
