import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import express, { Express, Request, Response } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

let cachedApp: Express;

export default async function handler(req: Request, res: Response) {
  if (!cachedApp) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);

    const config = new DocumentBuilder()
      .setTitle('El-Beshara Doc')
      .setDescription('API documentation for El-Beshara')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, documentFactory());
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
      prefix: 'api/v',
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.enableCors();
    await app.init();
    cachedApp = expressApp;
  }

  return cachedApp(req, res);
}
