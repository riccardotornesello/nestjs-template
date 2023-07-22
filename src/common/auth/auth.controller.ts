import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const token = await this.authService.generateAuthToken(req.user);
    return token;
  }

  @Post('register')
  async register(@Request() req) {
    const { username, email, password } = req.body;
    const user = await this.authService.registerUser(username, email, password);
    return user;
  }

  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(@Request() req) {
    return req.user;
  }
}
