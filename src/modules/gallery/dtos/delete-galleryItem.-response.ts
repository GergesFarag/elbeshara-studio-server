import { Expose } from 'class-transformer';

export class DeleteGalleryItemResponseDTO {
  @Expose()
  acknowledged: boolean;
  @Expose()
  deletedCount: number;
}
