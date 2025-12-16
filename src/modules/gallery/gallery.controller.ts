import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDTO } from './dtos/create-galleryItem.dto';
import { QueryDto, VideoQueryDto } from '../../common/dtos/pagination.dto';
import { TransformDTO } from '../../common/decorators/transform-dto.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JWTPayload } from '../auth/types/jwtPayload';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesEnum } from '../../common/enums/roles.enum';
import { DeleteGalleryItemResponseDTO } from './dtos/delete-galleryItem.-response';
import { DeleteGalleryItemDTO } from './dtos/delete-galleryItem.dto';
import { GalleryItemResponseDTO } from './dtos/galleryItem-response.dto';

@Controller('gallery')
@UseGuards()
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  @Get('')
  @TransformDTO(GalleryItemResponseDTO)
  findAll(@Query() pagination: QueryDto) {
    return this.galleryService.findAll(pagination);
  }
  @Get('images')
  @TransformDTO(GalleryItemResponseDTO)
  findAllImages(@Query() pagination: QueryDto) {
    return this.galleryService.findImages(pagination);
  }
  @Get('videos')
  @TransformDTO(GalleryItemResponseDTO)
  findAllVideos(@Query() queryDto: VideoQueryDto) {
    console.log(queryDto);
    return this.galleryService.findVideos(queryDto);
  }
  @Get('audios')
  @TransformDTO(GalleryItemResponseDTO)
  findAllAudios(@Query() pagination: QueryDto) {
    return this.galleryService.findAudios(pagination);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @TransformDTO(GalleryItemResponseDTO)
  @Post('')
  create(@Body() dto: CreateGalleryItemDTO, @CurrentUser() admin: JWTPayload) {
    return this.galleryService.create(dto, admin);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @TransformDTO(GalleryItemResponseDTO)
  @Patch(':id')
  update(@Param(':id') id: string, @Body() dto: Partial<CreateGalleryItemDTO>) {
    return this.galleryService.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @TransformDTO(DeleteGalleryItemResponseDTO)
  @Delete()
  deleteMany(@Body() dto: DeleteGalleryItemDTO) {
    return this.galleryService.deleteMany(dto.ids);
  }
}
