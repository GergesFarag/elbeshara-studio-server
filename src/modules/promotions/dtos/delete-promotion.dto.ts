import { IsArray, IsNotEmpty } from 'class-validator';

export class DeletePromotionDTO {
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
