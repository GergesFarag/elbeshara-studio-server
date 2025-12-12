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
import { PromotionsService } from './promotions.service';
import { PaginationDTO } from '../../common/dtos/pagination.dto';
import { CreatePromotionDTO } from './dtos/create-promotion.dto';
import { TransformDTO } from '../../common/decorators/transform-dto.decorator';
import { PromotionResponseDto } from './dtos/promotion-response.dto';
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  @TransformDTO(PromotionResponseDto)
  findAll(@Query() pagination: PaginationDTO) {
    return this.promotionsService.findAll(pagination);
  }

  @Post()
  @TransformDTO(PromotionResponseDto)
  create(@Body() dto: CreatePromotionDTO) {
    return this.promotionsService.create(dto);
  }

  @Patch(':id')
  @TransformDTO(PromotionResponseDto)
  update(@Param('id') id: string, @Body() dto: Partial<CreatePromotionDTO>) {
    return this.promotionsService.update(id, dto);
  }

  @Delete(':id')
  @TransformDTO(PromotionResponseDto)
  delete(@Param('id') id: string) {
    return this.promotionsService.delete(id);
  }
}
