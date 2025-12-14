import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDTO } from './dtos/create-galleryItem.dto';
import { PaginationDTO } from '../../common/dtos/pagination.dto';
import { TransformDTO } from '../../common/decorators/transform-dto.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JWTPayload } from '../auth/types/jwtPayload';

@Controller('gallery')
@TransformDTO(CreateGalleryItemDTO)
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  @Get('')
  findAll(@Query() pagination: PaginationDTO) {
    console.log();
    return this.galleryService.findAll(pagination);
  }
  @Get('images')
  findAllImages(@Query() pagination: PaginationDTO) {
    return this.galleryService.findImages(pagination);
  }
  @Get('videos')
  findAllVideos(@Query() pagination: PaginationDTO) {
    return this.galleryService.findVideos(pagination);
  }
  @Get('audios')
  findAllAudios(@Query() pagination: PaginationDTO) {
    return this.galleryService.findAudios(pagination);
  }
  @Post('')
  create(@Body() dto: CreateGalleryItemDTO, @CurrentUser() admin: JWTPayload) {
    return this.galleryService.create(dto, admin);
  }
  @Patch(':id')
  update(@Param(':id') id: string, @Body() dto: Partial<CreateGalleryItemDTO>) {
    return this.galleryService.update(id, dto);
  }
  @Delete()
  deleteMany(@Body('ids') ids: string[]) {
    return this.galleryService.deleteMany(ids);
  }
}
