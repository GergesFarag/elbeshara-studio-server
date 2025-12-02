import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDTO } from './dtos/create-galleryItem.dto';
import { PaginationDTO } from '../../common/dtos/pagination.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  @Get('')
  getAll(@Query() pagination: PaginationDTO) {
    return this.galleryService.findAll(pagination);
  }
  @Post('')
  create(@Body() dto: CreateGalleryItemDTO) {
    return this.galleryService.create(dto);
  }
}
