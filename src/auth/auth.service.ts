import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponeDto } from './dto/login-respone.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: CreateUserDto): Promise<User> {
    /*
     * Todo
     *  Get username + password + email
     *  verify if username exit or not ( verify username and email )
     *  crypt password
     *  save user
     * */

    let user = await this.userService.getUserByEmailOrUsername(
      registerDto.email,
      registerDto.username,
    );
    if (user) {
      throw new UnauthorizedException('Le user existe déjà');
    }
    user = await this.userService.create(registerDto);
    delete user.password;
    delete user.salt;
    return user;
  }
  async login(credentialsDto: CredentialsDto): Promise<LoginResponeDto> {
    const { identifier, password } = credentialsDto;
    const user = await this.userService.getUserByEmailOrUsername(
      identifier,
      identifier,
    );
    if (!user) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    const isLoggedIn = await bcrypt.compare(password, user.password);
    if (!isLoggedIn) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    const payload: JwtPayloadDto = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const jwt = this.jwtService.sign(payload);
    return { jwt };
  }
}
