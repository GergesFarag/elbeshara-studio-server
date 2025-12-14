import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IGalleryItem } from '../interfaces/gallery-item.interface';
import { galleryItems, GalleryItemType } from '../gellery-item.type';
import { Admin, AdminDocument } from 'src/modules/admin/schemas/admin.schema';

export type GalleryItemDocument = HydratedDocument<GalleryItem>;

@Schema({ timestamps: true })
export class GalleryItem implements IGalleryItem {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  url: string;

  @Prop({
    required: true,
  })
  public_id: string;

  @Prop({
    type: String,
    enum: galleryItems,
    required: true,
  })
  type: GalleryItemType;

  @Prop({
    type: Types.ObjectId,
    ref: Admin.name,
  })
  admin: AdminDocument;
}

export const GalleryItemSchema = SchemaFactory.createForClass(GalleryItem);
