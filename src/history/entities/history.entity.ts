import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  action_type: string;
  /*@Column()
  status: boolean;*/
  /*@Column({ nullable: true })
  defaults: string;*/
  @Column({ nullable: true })
  date_res: Date;
  @Column({ nullable: true })
  date_lib: Date;
  @Column()
  description: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
