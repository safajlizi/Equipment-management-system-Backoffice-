import { Type } from 'class-transformer';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFaultyHistoryDto {
  @Type(() => User)
  user: User;
  @Type(() => Equipment)
  equipment: Equipment;
  @Type(() => Project)
  project: Project;
  action_type = 'fault';
  @IsString()
  @IsNotEmpty()
  description: string;
}
