import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JWTPayload } from '../auth/types/jwtPayload';

@UseGuards(AuthGuard, RolesGuard)
@Roles(RolesEnum.SUPER_ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  addAdmin(@Body() dto: CreateAdminDto) {
    return this.adminService.addAdmin(dto);
  }

  @Delete(':id')
  deleteAdmin(@Param('id') id: string) {
    return this.adminService.removeAdmin(id);
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @Get()
  getAdminData(@CurrentUser() user: JWTPayload) {
    return this.adminService.getAdminData(user);
  }
}
