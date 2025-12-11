import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/dtos/base.dto';

export class AdminResponseDto extends BaseDTO {
  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  isSuperAdmin: boolean;
}
