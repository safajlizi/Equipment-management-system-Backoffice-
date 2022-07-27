import { Equipment } from 'src/equipment/entities/equipment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.history, {
    nullable: false,
  })
  user: User;
  @ManyToOne((type) => Equipment, (equipment) => equipment.history, {
    nullable: false,
  })
  equipment: Equipment;
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
}
