import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/common/services/bcrypt';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../admin/entities/admin.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(config.get('JWT_SECRET_KEY'));
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET_KEY') as string,
          signOptions: {
            expiresIn: '1h',
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
