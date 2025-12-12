import { Expose } from 'class-transformer';
import { CreatePromotionDTO } from './create-promotion.dto';

export class PromotionResponseDto extends CreatePromotionDTO {
  @Expose()
  _id: string;
}
