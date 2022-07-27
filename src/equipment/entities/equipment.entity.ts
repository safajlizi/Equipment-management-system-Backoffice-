import { History } from 'src/history/entities/history.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => User, (user) => user.equipment, {
    nullable: true,
  })
  manager: User;
  @Column()
  prop_client: boolean;
  @Column()
  label: string;
  @Column()
  status: boolean;
  @Column()
  defaults: string;
  @Column()
  date_res: Date;
  @Column()
  date_lib: Date;
  @Column()
  description: string;
  @OneToMany((type) => History, (history) => history.equipment, {
    nullable: true,
  })
  history: History[];
}
