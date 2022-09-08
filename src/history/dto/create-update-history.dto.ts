import { Type } from 'class-transformer';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateHistoryDto {
  @ApiProperty({
    description: 'User id concerned by the reservation operation.',
  })
  @Type(() => User)
  user: User;
  @ApiProperty({ description: 'Id of the equipment getting reserved.' })
  @Type(() => Equipment)
  equipment: Equipment;
  @ApiProperty({
    description: 'Id of the project to which the equipment will be associated.',
  })
  @Type(() => Project)
  project?: Project;
  @ApiProperty()
  action_type?: string = 'update';
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
