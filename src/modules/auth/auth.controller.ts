import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { TransformDTO } from 'src/common/decorators/transform-dto.decorator';
import { LoginResponseDto } from './dtos/login-response.dto';

@Controller('auth')
@TransformDTO(LoginResponseDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.adminLogin(dto);
  }
}
