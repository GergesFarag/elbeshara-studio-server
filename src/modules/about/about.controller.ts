import { Body, Controller, Get, Put } from '@nestjs/common';
import { AboutService } from './about.service';
import { UpdateAboutDto } from './dto/update-about.dto';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}
  @Get()
  getData() {
    return this.aboutService.find();
  }

  @Put()
  updateData(@Body() updateData: UpdateAboutDto) {
    return this.aboutService.update(updateData);
  }
}
