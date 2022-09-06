import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FilterHistoryDto } from './filter.dto';

export class FilterDateDto extends FilterHistoryDto {
  @ApiProperty({ description: 'THe date to filter with.' })
  @Type(() => Date)
  date: Date;
}
