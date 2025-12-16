import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GalleryItem } from './schemas/gallery-item.schema';
import { Model } from 'mongoose';
import { CreateGalleryItemDTO } from './dtos/create-galleryItem.dto';
import { QueryDto, VideoQueryDto } from '../../common/dtos/pagination.dto';
import { PaginationService } from '../../common/services/pagination';
import { galleryItems } from './gellery-item.type';
import { AdminService } from '../admin/admin.service';
import { JWTPayload } from '../auth/types/jwtPayload';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(GalleryItem.name) private galleryItemModel: Model<GalleryItem>,
    private paginatioService: PaginationService,
    private adminService: AdminService,
  ) {}
  async findAll({ limit, page }: QueryDto) {
    return await this.paginatioService.paginate(
      this.galleryItemModel,
      page,
      limit,
    );
  }
  async findImages({ limit, page }: QueryDto) {
    return await this.paginatioService.paginate(
      this.galleryItemModel,
      page,
      limit,
      { _id: -1 },
      { type: galleryItems.IMAGE },
      undefined,
      { path: 'admin', select: '-password' },
    );
  }
  async findVideos({ limit, page, isReel }: VideoQueryDto) {
    return await this.paginatioService.paginate(
      this.galleryItemModel,
      page,
      limit,
      { _id: -1 },
      { type: galleryItems.VIDEO, isReel },
      undefined,
      { path: 'admin', select: '-password' },
    );
  }
  async findAudios({ limit, page }: QueryDto) {
    return await this.paginatioService.paginate(
      this.galleryItemModel,
      page,
      limit,
      { _id: -1 },
      { type: galleryItems.AUDIO },
      undefined,
      { path: 'admin', select: '-password' },
    );
  }
  async create(dto: CreateGalleryItemDTO, admin: JWTPayload) {
    const adminUploadedBy = await this.adminService.getAdminData(admin);
    if (!adminUploadedBy) {
      throw new BadRequestException('Invalid admin ID');
    }
    console.log('DTO isReel : ', dto.isReel, dto.type);
    if (dto.isReel && dto.type !== galleryItems.VIDEO) {
      throw new BadRequestException('Cannot add not video type as reel');
    }
    const galleryItem = new this.galleryItemModel({
      ...dto,
      admin: adminUploadedBy._id,
    });
    const result = await galleryItem.save();
    return result;
  }
  async update(id: string, dto: Partial<CreateGalleryItemDTO>) {
    return await this.galleryItemModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }
  async deleteMany(ids: string[]) {
    try {
      return await this.galleryItemModel.deleteMany({ _id: { $in: ids } });
    } catch {
      throw new BadRequestException('Invalid gallery item IDs');
    }
  }
}
