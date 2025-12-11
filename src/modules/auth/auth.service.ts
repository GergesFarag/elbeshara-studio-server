import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../admin/schemas/admin.schema';
import { Model } from 'mongoose';
import { BcryptService } from '../../common/services/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './types/jwtPayload';
import { RolesEnum } from '../../common/enums/roles.enum';
import { LoginResponseDto } from './dtos/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async adminLogin(dto: LoginDto): Promise<LoginResponseDto> {
    const admin = await this.adminModel
      .findOne({ email: dto.email })
      .select('+password');
    if (!admin) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }
    const isPasswordMatches = await this.bcryptService.isPasswordMatches(
      dto.password,
      admin.password,
    );
    if (!isPasswordMatches) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }
    const payload: JWTPayload = {
      id: admin._id.toString(),
      username: admin.username.toString(),
      role: admin.isSuperAdmin ? RolesEnum.SUPER_ADMIN : RolesEnum.ADMIN,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      isSuperAdmin: admin.isSuperAdmin,
    };
  }
}
