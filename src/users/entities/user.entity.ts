import { Equipment } from 'src/equipment/entities/equipment.entity';
import { History } from 'src/history/entities/history.entity';
import { Project } from 'src/project/entities/project.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRoleEnum {
  admin = 'ADMIN',
  user = 'USER',
  manager = 'MANAGER',
}
export function RoleToString(role: UserRoleEnum): string {
  return UserRoleEnum[role];
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ default: UserRoleEnum.user })
  role: UserRoleEnum;

  @OneToMany((type) => Equipment, (equipment) => equipment.manager)
  equipment: Equipment[];

  @OneToMany((type) => Project, (project) => project.manager, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  managed: Project[];

  @ManyToMany(() => Project, (project) => project.members)
  projects: Project[];

  @OneToMany((type) => History, (history) => history.user, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  history: History[];

  @OneToMany((type) => Equipment, (equip) => equip.created_by)
  created: Equipment[];
  @Column({ default: false })
  deleted: boolean;
}
