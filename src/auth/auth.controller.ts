import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { CredentialsDto } from './dto/credentials.dto';
import { LoginResponeDto } from './dto/login-respone.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: CreateUserDto): Promise<User> {
    return this.authService.register(registerDto);
  }
  @Post('login')
  login(@Body() credentialsDto: CredentialsDto): Promise<LoginResponeDto> {
    return this.authService.login(credentialsDto);
  }
}
