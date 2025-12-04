import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { BcryptService } from '../../common/services/bcrypt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, BcryptService],
  exports: [AdminService],
})
export class AdminModule {}
