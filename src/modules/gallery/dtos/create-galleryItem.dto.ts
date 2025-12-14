import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../common/dtos/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IGalleryItem } from '../interfaces/gallery-item.interface';
import { galleryItems, GalleryItemType } from '../gellery-item.type';

export class CreateGalleryItemDTO extends BaseDTO implements IGalleryItem {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  url: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  public_id: string;

  @IsNotEmpty()
  @IsEnum(galleryItems)
  @Expose()
  @ApiProperty()
  type: GalleryItemType;
}
