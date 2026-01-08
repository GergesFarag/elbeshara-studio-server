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
import { PromotionsService } from './promotions.service';
import { QueryDto } from '../../common/dtos/pagination.dto';
import { CreatePromotionDTO } from './dtos/create-promotion.dto';
import { TransformDTO } from '../../common/decorators/transform-dto.decorator';
import { PromotionResponseDto } from './dtos/promotion-response.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesEnum } from '../../common/enums/roles.enum';
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  @TransformDTO(PromotionResponseDto)
  findAll(@Query() pagination: QueryDto) {
    return this.promotionsService.findAll(pagination);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @TransformDTO(PromotionResponseDto)
  create(@Body() dto: CreatePromotionDTO) {
    return this.promotionsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @TransformDTO(PromotionResponseDto)
  update(@Param('id') id: string, @Body() dto: Partial<CreatePromotionDTO>) {
    return this.promotionsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @TransformDTO(PromotionResponseDto)
  delete(@Param('id') id: string) {
    return this.promotionsService.delete(id);
  }
}
