import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CloudService } from './cloud.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesEnum } from '../../common/enums/roles.enum';
import { TransformDTO } from '../../common/decorators/transform-dto.decorator';
import { SignatureResponseDto } from './dto/signature-response.dto';

@Controller('cloud')
export class CloudController {
  constructor(private readonly cloudService: CloudService) {}
  @Post('signature')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @TransformDTO(SignatureResponseDto)
  getSignature(@Body() body: any) {
    return this.cloudService.getSignature(body);
  }

  @Post('validate-signature')
  validateSignature(
    @Body('signature') signature: string,
    @Body('timestamp') timestamp: number,
  ): boolean {
    return this.cloudService.validateSignature(signature, timestamp);
  }
}
