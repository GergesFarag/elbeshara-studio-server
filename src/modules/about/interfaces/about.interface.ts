import { AddressType, SocialMediaType } from '../types/helpers.type';

export interface IAbout {
  logo: {
    public_id: string;
    url: string;
  };
  socialMedia: SocialMediaType[];
  address: AddressType;
  email: string;
  phoneNumbers: string[];
}
