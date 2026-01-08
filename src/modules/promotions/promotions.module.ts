import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { PaginationService } from '../../common/services/pagination';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotion, PromotionSchema } from './schemas/promotion.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionSchema },
    ]),
    AuthModule,
  ],
  controllers: [PromotionsController],
  providers: [PromotionsService, PaginationService],
  exports: [PromotionsService],
})
export class PromotionsModule {}
