import 'express';
import { JWTPayload } from '../modules/auth/types/jwtPayload';

declare module 'express' {
  export interface Request {
    user?: JWTPayload;
  }
}
