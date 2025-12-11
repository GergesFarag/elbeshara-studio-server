import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { JWTPayload } from '../auth/types/jwtPayload';
import { BcryptService } from '../../common/services/bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private bcryptService: BcryptService,
  ) {}

  async getAdminData(user: JWTPayload) {
    const { id } = user;
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException('Not Found User');
    }
    return admin;
  }

  async addAdmin(dto: CreateAdminDto) {
    const isExists = await this.adminModel.findOne({ email: dto.email });
    if (isExists) {
      throw new BadRequestException('Cannot use this credentials');
    }
    const newAdmin = new this.adminModel({
      ...dto,
      password: await this.bcryptService.hashPassword(dto.password),
    });
    await newAdmin.save();
    return newAdmin;
  }

  async removeAdmin(adminId: string) {
    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new NotFoundException('Not Found');
    }
    const isSuperAdmin = admin.isSuperAdmin;
    if (isSuperAdmin) {
      throw new BadRequestException('Cannot Delete Super Admin');
    }
    const result = await this.adminModel.deleteOne({ _id: adminId });
    return result;
  }

  async getAllAdmins() {
    return await this.adminModel
      .find({ isSuperAdmin: false })
      .select('-isSuperAdmin');
  }
}
