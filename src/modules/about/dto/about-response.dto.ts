import { Expose } from 'class-transformer';
import { IAbout } from '../interfaces/about.interface';
import { SocialMediaType } from '../types/helpers.type';

export class AboutResponseDto implements IAbout {
  @Expose()
  name: string;
  @Expose()
  logo: string;
  @Expose()
  slogan: string;
  @Expose()
  description: string;
  @Expose()
  socialMedia: SocialMediaType[];
  @Expose()
  address: { building: number; street: string; city: string };
  @Expose()
  email: string;
  @Expose()
  phoneNumbers: string[];
}
