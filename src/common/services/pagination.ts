import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PAGINATION_LIMIT } from '../constants/pagination';

export interface PaginationResult<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
@Injectable()
export class PaginationService {
  async paginate<T>(
    model: Model<T>,
    page = 1,
    limit = PAGINATION_LIMIT,
    sort: any = { _id: -1 },
    filter: any = {},
  ): Promise<PaginationResult<T>> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      model
        .find(filter)
        .select('-createdAt -updatedAt -__v')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      model.countDocuments(filter),
    ]);
    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
