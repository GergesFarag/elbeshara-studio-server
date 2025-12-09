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

@Controller('gallery')
@TransformDTO(CreateGalleryItemDTO)
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  @Get('')
  findAll(@Query() pagination: PaginationDTO) {
    return this.galleryService.findAll(pagination);
  }
  @Post('')
  create(@Body() dto: CreateGalleryItemDTO) {
    return this.galleryService.create(dto);
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
