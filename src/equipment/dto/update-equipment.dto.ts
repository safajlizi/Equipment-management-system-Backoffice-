import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { IsNullable } from 'src/decorators/isnull.decorator';
import { Property } from 'src/property/entities/property.entity';
import {
  EquipmentCalibrationEnum,
  EquipmentConformityEnum,
  EquipmentPropertyEnum,
} from '../entities/equipment.entity';
import { CreateEquipmentDto } from './create-equipment.dto';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  label?: string;
  @Type(() => Property)
  property?: Property;
  defaults?: string;
  @Type(() => Category)
  category?: Category;
  description?: string;
  conformity?: EquipmentConformityEnum;
  @Type(() => Date)
  validity_date?: Date;
  maker?: string;
  serial_number?: string;
  cailbration?: EquipmentCalibrationEnum;
}
