import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class Promotion {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  validFrom: Date;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  validTo: Date;
}
export const PromotionSchema = SchemaFactory.createForClass(Promotion);
