import { Type } from 'class-transformer';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTakeHistoryDto {
  @ApiProperty()
  @Type(() => User)
  user: User;
  @ApiProperty()
  @Type(() => Equipment)
  equipment: Equipment;
  @ApiProperty()
  @Type(() => Project)
  project: Project;
  @ApiProperty()
  action_type?: string = 'take';
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @Type(() => Date)
  date_lib?: Date;
  @ApiProperty()
  date_res?: Date = new Date();
}
