import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Concerning } from '../history.service';

export class FilterHistoryDto {
  @ApiProperty({ description: 'History concerning which entity.' })
  concerning: Concerning;
  @ApiProperty({ description: 'The Id of that specific entity.' })
  @IsString()
  id: string;
}
