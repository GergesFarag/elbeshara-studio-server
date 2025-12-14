import { Expose, Transform } from 'class-transformer';
import { CreateGalleryItemDTO } from './create-galleryItem.dto';

export class CreateGalleryItemResponseDTO extends CreateGalleryItemDTO {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString() || obj._id)
  _id: string;
}
