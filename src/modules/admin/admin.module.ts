import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { BcryptService } from '../../common/services/bcrypt';
import { AuthModule } from '../auth/auth.module';
import { PaginationService } from 'src/common/services/pagination';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, BcryptService, PaginationService],
  exports: [AdminService],
})
export class AdminModule {}
