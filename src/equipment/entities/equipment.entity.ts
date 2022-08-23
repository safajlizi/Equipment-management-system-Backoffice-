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
  availableToAll = 'AVAILABLETOALL',
  InUseToProject = 'INUSETOPROJECT',
  InUseToOthers = 'INUSETOOTHERS',
}
export enum EquipmentPropertyEnum {
  client = 'Client',
  sofia = 'Sofia',
}
export enum EquipmentConformityEnum {
  compliant = 'Compliant',
  notcompliant = 'Not Compliant',
}
export enum EquipmentCalibrationEnum {
  ok = 'Calibrated',
  nok = 'Not Calibrated',
  na = 'Not available',
}
@Entity()
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ref: string;
  @ManyToOne((type) => User, (user) => user.equipment, {
    nullable: true,
  })
  manager: User;
  @ManyToOne((type) => Project, (project) => project.equipment, {
    cascade: true,
  })
  project: Project;
  @Column({ default: EquipmentPropertyEnum.sofia })
  property: EquipmentPropertyEnum;
  @Column({ type: 'date', nullable: true })
  validity_date: Date;
  @Column({ nullable: true, default: EquipmentConformityEnum.compliant })
  conformity: EquipmentConformityEnum;
  @Column({ default: EquipmentCalibrationEnum.na })
  calibration: EquipmentCalibrationEnum;
  @Column()
  label: string;
  @Column({ default: EquipmentStatusEnum.availableToAll })
  availability: EquipmentStatusEnum;
  @Column({ nullable: true })
  defaults: string;
  @Column()
  category: string;
  /*@Column({ type: 'timestamp', nullable: true })
  date_res: Date;
  @Column({ type: 'timestamp', nullable: true })
  date_lib: Date;*/
  @Column({nullable: true })
  description: string;
  @OneToMany((type) => History, (history) => history.equipment, {
    nullable: true,
  })
  history: History[];
  @OneToMany((type) => User, (user) => user.created)
  created_by: User;
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
