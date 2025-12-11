import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { IPromotion } from '../schemas/promotion.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromotionDTO implements IPromotion {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @Type(() => Date)
  @Expose()
  @ApiProperty()
  validFrom: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @Expose()
  @ApiProperty()
  validTo: Date;
}
