import { User } from 'src/users/entities/user.entity';
import { IsDate, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  EquipmentPropertyEnum,
  EquipmentStatusEnum,
} from '../entities/equipment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { Property } from 'src/property/entities/property.entity';
export class CreateEquipmentDto {
  @ApiProperty()
  manager?: User;
  @ApiProperty()
  property: Property;
  @ApiProperty()
  label: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  @Type(() => Category)
  category: Category;
}
