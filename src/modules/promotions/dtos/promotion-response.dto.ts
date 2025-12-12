import { Expose, Transform } from 'class-transformer';
import { CreatePromotionDTO } from './create-promotion.dto';

export class PromotionResponseDto extends CreatePromotionDTO {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString() || obj._id)
  _id: string;
}
