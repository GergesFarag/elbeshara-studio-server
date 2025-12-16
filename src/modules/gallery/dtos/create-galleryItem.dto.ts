import { Expose, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IGalleryItem } from '../interfaces/gallery-item.interface';
import { galleryItems, GalleryItemType } from '../gellery-item.type';

export class CreateGalleryItemDTO implements IGalleryItem {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public_id: string;

  @IsNotEmpty()
  @IsEnum(galleryItems)
  @ApiProperty()
  type: GalleryItemType;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isReel: boolean;
}

export class CreateVideoGalleryItemDTO extends CreateGalleryItemDTO {}
