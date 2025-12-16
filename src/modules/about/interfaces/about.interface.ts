import { AddressType, SocialMediaType } from '../types/helpers.type';

export interface IAbout {
  name: string;
  logo: {
    public_id: string;
    url: string;
  };
  slogan: string;
  description: string;
  socialMedia: SocialMediaType[];
  address: AddressType;
  email: string;
  phoneNumbers: string[];
}
