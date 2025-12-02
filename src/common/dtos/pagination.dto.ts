import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly page: number = 1;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly limit: number = 5;
}
