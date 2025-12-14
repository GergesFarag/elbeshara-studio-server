import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryItem, GalleryItemSchema } from './schemas/gallery-item.schema';
import { PaginationService } from '../../common/services/pagination';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GalleryItem.name, schema: GalleryItemSchema },
    ]),
    AdminModule,
    AuthModule,
  ],
  controllers: [GalleryController],
  providers: [GalleryService, PaginationService],
  exports: [GalleryService],
})
export class GalleryModule {}
