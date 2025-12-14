import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { SignatureResponseDto } from './dto/signature-response.dto';
@Injectable()
export class CloudService {
  getSignature(body: any): SignatureResponseDto {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      body.paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string,
    );
    return {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
      apiKey: process.env.CLOUDINARY_API_KEY as string,
      signature,
      timestamp,
    };
  }
  validateSignature(signature: string, timestamp: number): boolean {
    const expectedSignature = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      process.env.CLOUDINARY_API_SECRET as string,
    );
    return signature === expectedSignature;
  }
}
