import { Expose, Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IPromotion } from '../schemas/promotion.schema';
import { ApiProperty } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';

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

  @IsNotEmpty({ message: 'validFrom is required' })
  @IsDate({ message: 'validFrom must be a valid date' })
  @Type(() => Date)
  @Transform(({ value }) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('validFrom must be a valid date');
    }
    return date;
  })
  @Expose()
  @ApiProperty()
  validFrom: Date;

  @IsNotEmpty({ message: 'validTo is required' })
  @IsDate({ message: 'validTo must be a valid date' })
  @Type(() => Date)
  @Transform(({ value }) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('validTo must be a valid date');
    }
    return date;
  })
  @Expose()
  @ApiProperty()
  validTo: Date;
}
