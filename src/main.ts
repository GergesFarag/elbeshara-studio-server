import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Express } from 'express';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: Express;

async function bootstrap(): Promise<Express> {
  if (!cachedServer) {
    const expressApp: Express = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.init();
    cachedServer = expressApp;
  }
  return cachedServer;
}

// For serverless deployment (AWS Lambda)
export const handler = async (event: any, context: any) => {
  const server = await bootstrap();
  return serverlessExpress({ app: server })(event, context);
};

// For local development
if (require.main === module) {
  const port = process.env.PORT ?? 3000;
  bootstrap().then(() => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}
