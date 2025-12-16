import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressType, SocialMediaType } from '../types/helpers.type';
import { IAbout } from '../interfaces/about.interface';

class SocialMediaDto implements SocialMediaType {
  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}

class AddressDto implements AddressType {
  @IsNumber()
  @IsNotEmpty()
  building: number;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}

export class UpdateAboutDto implements IAbout {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  logo: {
    public_id: string;
    url: string;
  };

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  slogan: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaDto)
  socialMedia: SocialMediaType[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressType;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  phoneNumbers: string[];
}
