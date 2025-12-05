import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GalleryModule } from './modules/gallery/gallery.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import helmet from 'helmet';

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
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet(), LoggerMiddleware).forRoutes({
      path: '*path',
      method: RequestMethod.ALL,
    });
  }
}
