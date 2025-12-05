import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

@Schema()
export class Admin {
  @Prop({
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @Prop({
    required: true,
    select: false,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
    default: false,
  })
  @IsNotEmpty()
  isSuperAdmin: boolean;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
