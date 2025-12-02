import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Express } from 'express';

let cachedApp: Express;

async function bootstrap(): Promise<Express> {
  if (!cachedApp) {
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
    app.enableCors();
    await app.init();
    cachedApp = expressApp;
  }
  return cachedApp;
}

// Export for Vercel serverless
export default async (req: any, res: any) => {
  const app = await bootstrap();
  return app(req, res);
};

// For local development
if (require.main === module) {
  const port = process.env.PORT ?? 3000;
  bootstrap().then((app) => {
    app.listen(port, () => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  });
}
