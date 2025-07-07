import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://platepicks.pics',
      'https://www.platepicks.pics',
    ],
    credentials: true,
  });

  await app.listen(7777);
}
bootstrap();
