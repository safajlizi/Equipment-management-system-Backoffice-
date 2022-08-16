import { History } from 'src/history/entities/history.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Project } from 'src/project/entities/project.entity';

export enum EquipmentStatusEnum {
  available = 'AVAILABLE',
  inUse = 'INUSE',
  faulty = 'FAULTY',
  notCalibrated = 'NOTCALIBRATED',
}

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /*
  @PrimaryColumn()
  ref: string;*/

  @ManyToOne((type) => User, (user) => user.equipment, {
    nullable: true,
  })
  manager: User;
  @ManyToOne((type) => Project, (project) => project.equipment, {
    cascade: true,
  })
  project: Project;
  @Column()
  prop_client: boolean;
  @Column({ type: 'date', nullable: true })
  calibrating_date: Date;
  @Column({ nullable: true, default: null })
  is_calibrated: boolean;
  @Column()
  label: string;
  @Column()
  status: EquipmentStatusEnum;
  @Column({ nullable: true })
  defaults: string;
  @Column({ type: 'timestamp', nullable: true })
  date_res: Date;
  @Column({ type: 'timestamp', nullable: true })
  date_lib: Date;
  @Column()
  description: string;
  @OneToMany((type) => History, (history) => history.equipment, {
    nullable: true,
    cascade: true,
  })
  history: History[];
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
