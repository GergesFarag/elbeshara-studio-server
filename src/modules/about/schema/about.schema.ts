import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAbout } from '../interfaces/about.interface';
import { AddressType, SocialMediaType } from '../types/helpers.type';

@Schema()
export class About implements IAbout {
  @Prop(String)
  name: string;
  @Prop(String)
  logo: string;

  @Prop(String)
  slogan: string;
  @Prop(String)
  description: string;
  @Prop({
    type: [String],
    default: [],
  })
  socialMedia: SocialMediaType[];
  @Prop({
    type: {
      building: { type: Number, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
    },
  })
  address: AddressType;
  @Prop(String)
  email: string;
  @Prop({
    type: [String],
    default: [],
  })
  phoneNumbers: string[];
}
export const aboutSchema = SchemaFactory.createForClass(About);
