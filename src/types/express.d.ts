import 'express';
import { JWTPayload } from 'src/modules/auth/types/jwtPayload';

declare module 'express' {
  export interface Request {
    user?: JWTPayload;
  }
}
