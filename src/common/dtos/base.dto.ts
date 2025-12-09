import { Expose, Transform } from 'class-transformer';

export abstract class BaseDTO {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  _id?: string;
}
