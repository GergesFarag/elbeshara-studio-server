import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto, ResponseWithMetaDto } from '../dtos/response.dto';
import { ClassConstructor, plainToInstance } from 'class-transformer';

interface PaginatedResponse<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ResponseWithMetaDto<T> | ResponseDto<T>
> {
  constructor(private readonly dtoClass: ClassConstructor<T>) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T> | ResponseWithMetaDto<T>> {
    return next.handle().pipe(
      map((data) => {
        if (this.isPaginatedResponse(data)) {
          return {
            status: 'success',
            data: plainToInstance(this.dtoClass, data.items, {
              excludeExtraneousValues: true,
            }),
            meta: data.meta,
          } as ResponseWithMetaDto<T>;
        }

        // Transform single objects or arrays
        return {
          status: 'success',
          data: plainToInstance(this.dtoClass, data, {
            excludeExtraneousValues: true,
          }),
        } as ResponseDto<T>;
      }),
    );
  }

  private isPaginatedResponse(data: any): data is PaginatedResponse<T> {
    return (
      data &&
      typeof data === 'object' &&
      'items' in data &&
      Array.isArray(data.items) &&
      'meta' in data &&
      typeof data.meta === 'object' &&
      'page' in data.meta &&
      'limit' in data.meta &&
      'total' in data.meta &&
      'totalPages' in data.meta
    );
  }
}
