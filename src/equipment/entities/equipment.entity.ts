import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => User, (user) => user.equipment, {
    nullable: false,
  })
  manager: User;
  @Column()
  prop_client: boolean;
}
