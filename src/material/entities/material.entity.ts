import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  manager: User;
  @Column()
  prop_client: boolean;
}
