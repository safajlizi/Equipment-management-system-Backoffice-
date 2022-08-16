import { User } from 'src/users/entities/user.entity';
import { IsDate, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { EquipmentStatusEnum } from '../entities/equipment.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEquipmentDto {
  @ApiProperty()
  manager?: User;
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  prop_client: boolean;
  @ApiProperty()
  label: string;
  @ApiProperty({ enum: ['AVAILABLE', 'INUSE', 'FAULTY', 'NOTCALIBRATED'] })
  status: EquipmentStatusEnum;
  @ApiProperty()
  description: string;
}
