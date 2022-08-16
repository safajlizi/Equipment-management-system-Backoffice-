import { IsDate, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';

export class CreateReturnHistoryDto {
  @Type(() => User)
  user: User;
  @Type(() => Equipment)
  equipment: Equipment;
  @Type(() => Project)
  project: Project;
  action_type = 'return';
}
