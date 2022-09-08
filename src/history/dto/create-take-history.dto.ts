import { Type } from 'class-transformer';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTakeHistoryDto {
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
  project: Project;
  @ApiProperty({ default: 'take' })
  action_type?: string = 'take';
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @Type(() => Date)
  date_lib?: Date;
  @ApiProperty({
    description:
      'If sent equipment is reserved for the future, if not, default value is tha date the request was sent.',
    default: 'Date of request recieval',
  })
  date_res?: Date = new Date();
}
