import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { Concerning } from '../history.service';
import { FilterHistoryDto } from './filter.dto';

export class FilterActionTypeDto extends FilterHistoryDto {
  @ApiProperty({ description: 'The action type wanted.' })
  @IsString()
  action_type: string;
}
