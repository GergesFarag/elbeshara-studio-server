import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteGalleryItemDTO {
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
