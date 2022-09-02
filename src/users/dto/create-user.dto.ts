import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;

  role?: UserRoleEnum;
}
