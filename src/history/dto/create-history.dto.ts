import { IsDate, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';

export class CreateHistoryDto {
  description: string;
  label: string;
  @Type(() => Date)
  @IsDate()
  date_lib: Date;
}
