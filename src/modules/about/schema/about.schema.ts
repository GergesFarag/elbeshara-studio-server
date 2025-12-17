import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAbout } from '../interfaces/about.interface';
import { AddressType, SocialMediaType } from '../types/helpers.type';

@Schema()
export class About implements IAbout {
  @Prop({
    type: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    required: true,
  })
  logo: {
    public_id: string;
    url: string;
  };

  @Prop({
    type: [
      {
        icon: { type: String, required: true },
        url: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    default: [],
  })
  socialMedia: SocialMediaType[];

  @Prop({
    type: {
      building: { type: Number, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
    },
    required: true,
  })
  address: AddressType;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({
    type: [String],
    default: [],
  })
  phoneNumbers: string[];
}
export const aboutSchema = SchemaFactory.createForClass(About);
