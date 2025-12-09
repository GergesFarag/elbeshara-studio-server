import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PaginationDTO } from '../../common/dtos/pagination.dto';
import { CreatePromotionDTO } from './dtos/create-promotion';
import { TransformDTO } from '../../common/decorators/transform-dto.decorator';

@Controller('promotions')
@TransformDTO(CreatePromotionDTO)
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}
  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    return this.promotionsService.findAll(pagination);
  }
  @Post()
  create(@Body() dto: CreatePromotionDTO) {
    return this.promotionsService.create(dto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreatePromotionDTO>) {
    return this.promotionsService.update(id, dto);
  }
}
