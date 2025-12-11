import { Expose } from 'class-transformer';
import { CreatePromotionDTO } from './create-promotion';

export class PromotionResponseDto extends CreatePromotionDTO {
  @Expose()
  _id: string;
}
