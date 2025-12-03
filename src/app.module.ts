import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GalleryModule } from './modules/gallery/gallery.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import helmet from 'helmet';
import { PromotionsModule } from './modules/promotions/promotions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI') as string;
        const connection = await import('./config/db').then((m) =>
          m.connectToDatabase(uri),
        );
        return { uri, connectionFactory: () => connection };
      },
      inject: [ConfigService],
    }),
    GalleryModule,
    PromotionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet(), LoggerMiddleware).forRoutes('*path');
  }
}
