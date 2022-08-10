import { Equipment } from 'src/equipment/entities/equipment.entity';
import { History } from 'src/history/entities/history.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({})
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToOne((type) => User, (user) => user.managed, {
    nullable: true,
    cascade: true,
  })
  manager: User;
  @OneToMany((type) => Equipment, (equip) => equip.project)
  equipment: Equipment[];
  @OneToMany((type) => History, (hist) => hist.project)
  history: History[];
  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  members: User[];
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
