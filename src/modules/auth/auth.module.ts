import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from '../../common/services/bcrypt';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../admin/schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret =
          config.get<string>('JWT_SECRET_KEY') ||
          config.get<string>('JWT_SECRET') ||
          process.env.JWT_SECRET_KEY ||
          process.env.JWT_SECRET;

        if (!secret) {
          throw new Error(
            'JWT_SECRET_KEY or JWT_SECRET must be defined in environment variables',
          );
        }

        console.log('JWT Secret loaded:', secret ? '✓' : '✗');

        return {
          global: true,
          secret,
          signOptions: {
            expiresIn: '5h',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
