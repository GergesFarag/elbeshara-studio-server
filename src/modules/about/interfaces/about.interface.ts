import { SocialMediaType } from '../types/helpers.type';

export interface IAbout {
  name: string;
  logo: string;
  slogan: string;
  description: string;
  socialMedia: SocialMediaType[];
  address: {
    building: number;
    street: string;
    city: string;
  };
  email: string;
  phoneNumbers: string[];
}
