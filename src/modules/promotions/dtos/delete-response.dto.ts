import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseDto {
  @Expose()
  @ApiProperty()
  acknowledged: boolean;

  @Expose()
  @ApiProperty()
  deletedCount: number;
}
