import { User } from 'src/users/entities/user.entity';
import { IsNotEmpty, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { DefaultValuePipe } from '@nestjs/common';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;
  manager: string;
}
