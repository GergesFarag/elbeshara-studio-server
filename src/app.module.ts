import {
  Inject,
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
import { CloudModule } from './modules/cloud/cloud.module';
import { AboutModule } from './modules/about/about.module';
import { MailModule } from './mail/mail.module';
import helmet from 'helmet';
import { MailerModule } from '@nestjs-modules/mailer';

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
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          port: config.get<number>('MAIL_PORT'),
          secure: false,
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"Elbeshara Studio" <${config.get<string>('MAIL_FROM')}>`,
        },
      }),
      imports: [ConfigModule],
    }),
    GalleryModule,
    PromotionsModule,
    AuthModule,
    AdminModule,
    CloudModule,
    AboutModule,
    MailModule,
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
