import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1].trim();
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      req.user = payload;
      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
