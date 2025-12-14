import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryItem, GalleryItemSchema } from './schemas/gallery-item.schema';
import { PaginationService } from '../../common/services/pagination';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GalleryItem.name, schema: GalleryItemSchema },
    ]),
    AdminModule,
  ],
  controllers: [GalleryController],
  providers: [GalleryService, PaginationService],
  exports: [GalleryService],
})
export class GalleryModule {}
