import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  username: string;

  @Prop({
    required: true,
    select: false,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty()
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @Prop({
    required: true,
    default: false,
  })
  @IsNotEmpty()
  @ApiProperty()
  isSuperAdmin: boolean;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
