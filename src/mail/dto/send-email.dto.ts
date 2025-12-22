import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SendEmailDto {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  subject: string;

  @IsString()
  @MinLength(5)
  message: string;
}
