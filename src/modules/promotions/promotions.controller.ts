import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { CreatePromotionDTO } from './dtos/create-promotion';

@Controller('promotions')
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
}
