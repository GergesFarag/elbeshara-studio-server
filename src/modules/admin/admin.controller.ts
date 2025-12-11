import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesEnum } from '../../common/enums/roles.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JWTPayload } from '../auth/types/jwtPayload';
import { TransformDTO } from '../../common/decorators/transform-dto.decorator';
import { AdminResponseDto } from './dtos/admin-response.dto';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

@UseGuards(AuthGuard, RolesGuard)
@Roles(RolesEnum.SUPER_ADMIN)
@Controller('admin')
@TransformDTO(AdminResponseDto)
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

  @Get('all')
  getAllAdmins(@Query() dto: PaginationDTO) {
    return this.adminService.getAllAdmins(dto);
  }
}
