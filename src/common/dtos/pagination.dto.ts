import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly page: number = 1;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly limit: number = 5;
}

export class VideoQueryDto extends QueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  readonly isReel: boolean;
}
