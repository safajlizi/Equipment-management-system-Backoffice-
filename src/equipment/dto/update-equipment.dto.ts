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
import {
  EquipmentCalibrationEnum,
  EquipmentPropertyEnum,
} from '../entities/equipment.entity';
import { CreateEquipmentDto } from './create-equipment.dto';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  @IsString()
  @MaxLength(255)
  label?: string;
  @IsBoolean()
  property?: EquipmentPropertyEnum;
  @IsString()
  @IsNullable()
  defaults?: string;
  @IsString()
  description?: string;
  @Type(() => Date)
  @IsDate()
  validity_date?: Date;
  cailbration: EquipmentCalibrationEnum;
}
