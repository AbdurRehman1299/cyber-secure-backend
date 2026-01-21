import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

const expressApp = express();

const createFunction = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors({
    origin: [
      'https://cybersecure-one.vercel.app',
      'https://cybersecure-one.vercel.app/',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();
};

createFunction(expressApp);

export default expressApp;

if (require.main === module) {
  const port = 3001; // Use a different port to avoid conflicts
  expressApp.listen(port, () => {
    console.log(
      `Serverless wrapper running locally on http://localhost:${port}`,
    );
  });
}
