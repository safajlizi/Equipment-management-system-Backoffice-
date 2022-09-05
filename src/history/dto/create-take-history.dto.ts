import { Type } from 'class-transformer';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTakeHistoryDto {
  @Type(() => User)
  user: User;
  @Type(() => Equipment)
  equipment: Equipment;
  @Type(() => Project)
  project: Project;
  action_type?: string = 'take';
  @IsString()
  @IsNotEmpty()
  description: string;
  @Type(() => Date)
  @IsDate()
  date_lib: Date;
  date_res?: Date = new Date();
}
