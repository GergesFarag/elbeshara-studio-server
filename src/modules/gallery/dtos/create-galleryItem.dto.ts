import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { IGalleryItem } from '../schemas/gallery-item.schema';
import { BaseDTO } from '../../../common/dtos/base.dto';
import { ApiProperty } from '@nestjs/swagger';

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
  thumbnailUrl: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  description: string;
}
