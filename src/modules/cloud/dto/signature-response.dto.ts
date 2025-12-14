import { Expose } from 'class-transformer';

export class SignatureResponseDto {
  @Expose()
  signature: string;
  @Expose()
  timestamp: number;
  @Expose()
  cloudName: string;
  @Expose()
  apiKey: string;
}
