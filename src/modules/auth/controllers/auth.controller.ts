import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: { email: string; password: string }) {
    return this.authService.login(dto);
  }
}
