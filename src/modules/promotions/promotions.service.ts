import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Promotion } from './schemas/promotion.schema';
import { Model } from 'mongoose';
import { PaginationService } from '../../common/services/pagination';
import { PaginationDTO } from '../../common/dtos/pagination.dto';
import { CreatePromotionDTO } from './dtos/create-promotion';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectModel(Promotion.name) private promotionModel: Model<Promotion>,
    private paginationService: PaginationService,
  ) {}

  async findAll(pagination: PaginationDTO) {
    const now = new Date();
    const filter = {
      validFrom: { $lte: now },
      validTo: { $gte: now },
    };

    return await this.paginationService.paginate<Promotion>(
      this.promotionModel,
      pagination.page,
      pagination.limit,
      { _id: -1 },
      filter,
    );
  }

  async create(promotion: CreatePromotionDTO) {
    this.validatePromotionDates(promotion);
    const newPromotion = new this.promotionModel(promotion);
    return await newPromotion.save();
  }

  private validatePromotionDates(promotion: CreatePromotionDTO): void {
    if (promotion.validFrom >= promotion.validTo) {
      throw new BadRequestException('validFrom must be earlier than validTo');
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const validFromDate = new Date(promotion.validFrom);
    validFromDate.setHours(0, 0, 0, 0);

    if (validFromDate < now) {
      throw new BadRequestException('validFrom must be a future date');
    }
  }
}
