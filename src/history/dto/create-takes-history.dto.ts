import { Type } from 'class-transformer';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTakesHistoryDto {
  @Type(() => User)
  user: User;
  equipment: string[];
  @Type(() => Project)
  project: Project;
  action_type = 'take';
  @IsString()
  @IsNotEmpty()
  description: string;
  @Type(() => Date)
  date_lib: Date;
  date_res: Date = new Date();
}
