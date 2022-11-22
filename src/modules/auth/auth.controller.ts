import { Controller, Get, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { NoAuth } from 'src/common/decorators/no-auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @NoAuth('need jwt')
  @Get('/self')
  getSelf(@User() user) {
    return user;
  }

  @NoAuth()
  @HttpCode(200)
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @NoAuth()
  @Post('/superAdmin')
  superAdmin(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
