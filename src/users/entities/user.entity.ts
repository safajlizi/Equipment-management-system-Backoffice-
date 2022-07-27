import { Equipment } from 'src/equipment/entities/equipment.entity';
import { History } from 'src/history/entities/history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoleEnum {
  admin = 'ROLE:ADMIN',
  user = 'ROLE:USER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: UserRoleEnum;

  @OneToMany((type) => Equipment, (equipment) => equipment.manager, {
    nullable: true,
  })
  equipment: Equipment[];
  @OneToMany((type) => History, (history) => history.user, {
    nullable: true,
  })
  history: History[];
}
