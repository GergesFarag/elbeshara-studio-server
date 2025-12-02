import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryItemDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  @IsString()
  url: string;
  @IsNotEmpty()
  @IsString()
  thumbnailUrl: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
