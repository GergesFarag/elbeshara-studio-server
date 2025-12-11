import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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
  @Expose()
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
  @Expose()
  @ApiProperty()
  email: string;

  @Prop({
    required: true,
    default: false,
  })
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  isSuperAdmin: boolean;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
