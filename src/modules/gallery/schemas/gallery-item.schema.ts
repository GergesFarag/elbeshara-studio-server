import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GalleryItemDocument = HydratedDocument<GalleryItem>;

@Schema({ timestamps: true })
export class GalleryItem {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  url: string;

  @Prop()
  thumbnailUrl: string;

  @Prop()
  description: string;
}

export const GalleryItemSchema = SchemaFactory.createForClass(GalleryItem);
GalleryItemSchema.set('toJSON', {
  transform: (doc, ret: any) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});
