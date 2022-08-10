import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsNullable } from 'src/decorators/isnull.decorator';
import { CreateEquipmentDto } from './create-equipment.dto';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  @IsString()
  @MaxLength(255)
  label?: string;
  @IsBoolean()
  prop_client?: boolean;
  @IsString()
  @IsNullable()
  defaults?: string;
  @IsString()
  description?: string;
  @Type(() => Date)
  @IsDate()
  calibrating_date?: Date;
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  is_calibrated?: boolean;
}
