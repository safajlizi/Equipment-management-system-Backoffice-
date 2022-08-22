import { User } from 'src/users/entities/user.entity';
import { IsDate, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  EquipmentPropertyEnum,
  EquipmentStatusEnum,
} from '../entities/equipment.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEquipmentDto {
  @ApiProperty()
  manager?: User;
  @ApiProperty({ enum: ['Client', 'Sofia'] })
  property: EquipmentPropertyEnum;
  @ApiProperty()
  label: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  category: string;
}
