import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ enableDebugMessages: true, transform: true }),
  );
  app.enableCors();
  await app.listen(parseInt(process.env.PORT, 10) ?? 8080);
}

bootstrap();
