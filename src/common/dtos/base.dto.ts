import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export abstract class BaseDTO {
  @Expose()
  @ApiProperty()
  @Transform(({ obj }) => obj._id?.toString())
  _id?: string;
}
