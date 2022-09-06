import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @ApiProperty()
  name: string;
}
