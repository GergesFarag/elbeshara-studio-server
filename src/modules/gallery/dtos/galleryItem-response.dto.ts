import { Expose, Transform } from 'class-transformer';
import { IGalleryItem } from '../interfaces/gallery-item.interface';
import { galleryItems, GalleryItemType } from '../gellery-item.type';

export class GalleryItemResponseDTO implements IGalleryItem {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString() || obj._id)
  _id: string;

  @Expose()
  @Transform(({ obj }) => obj.admin.username)
  created_by: string;

  @Expose()
  //Conditional Expose
  @Transform(({ obj, value }) =>
    obj.type === galleryItems.VIDEO ? value : undefined,
  )
  isReel: boolean;

  @Expose()
  url: string;
  @Expose()
  public_id: string;
  @Expose()
  type: GalleryItemType;
}
