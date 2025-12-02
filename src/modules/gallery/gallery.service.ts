import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GalleryItem } from './schemas/gallery-item.schema';
import { Model } from 'mongoose';
import { CreateGalleryItemDTO } from './dtos/create-galleryItem.dto';
import { PaginationDTO } from '../../common/dtos/pagination.dto';
import { PaginationService } from '../../common/services/pagination';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(GalleryItem.name) private galleryItemModel: Model<GalleryItem>,
    private paginatioService: PaginationService,
  ) {}
  async findAll({ limit, page }: PaginationDTO) {
    return await this.paginatioService.paginate(
      this.galleryItemModel,
      page,
      limit,
    );
  }
  async create(dto: CreateGalleryItemDTO) {
    const galleryItem = new this.galleryItemModel(dto);
    const result = await galleryItem.save();
    return result;
  }
}
