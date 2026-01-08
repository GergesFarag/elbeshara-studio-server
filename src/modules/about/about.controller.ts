import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { UpdateAboutDto } from './dto/update-about.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesEnum } from '../../common/enums/roles.enum';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}
  @Get()
  getData() {
    return this.aboutService.find();
  }

  @Put()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.SUPER_ADMIN)
  updateData(@Body() updateData: UpdateAboutDto) {
    return this.aboutService.update(updateData);
  }
}
