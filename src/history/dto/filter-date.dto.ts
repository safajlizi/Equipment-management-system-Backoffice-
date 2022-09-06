import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { FilterHistoryDto } from './filter.dto';
function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(x: any) {
  let date = new Date(x);
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

export class FilterDateDto extends FilterHistoryDto {
  @ApiProperty({ description: 'THe date to filter with.' })
  //@Transform((x) => formatDate(x))
  @Type(() => Date)
  date: Date;
}
