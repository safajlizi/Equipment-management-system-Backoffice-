import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum HistoryTypeEnum {}
@Entity()
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, (user) => user.history, {
    nullable: false,
  })
  user: User;
  @ManyToOne((type) => Equipment, (equipment) => equipment.history, {
    nullable: false,
  })
  equipment: Equipment;
  @ManyToOne((type) => Project, (project) => project.history, {
    nullable: true,
  })
  project: Project;
  @Column()
  label: string;
  @Column()
  status: boolean;
  @Column({ nullable: true })
  defaults: string;
  @Column()
  date_res: Date;
  @Column()
  date_lib: Date;
  @Column()
  description: string;
}
