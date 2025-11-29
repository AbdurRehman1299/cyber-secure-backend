import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out properties that are NOT in your DTO
      forbidNonWhitelisted: true, // Throws an error if extra properties are sent
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
