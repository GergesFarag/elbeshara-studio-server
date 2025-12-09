import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
export interface IPromotion {
  title: string;
  description: string;
  validFrom: Date;
  validTo: Date;
}
@Schema()
export class Promotion implements IPromotion {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  validFrom: Date;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  validTo: Date;
}
export const PromotionSchema = SchemaFactory.createForClass(Promotion);
