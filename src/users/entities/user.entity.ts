import { Material } from 'src/material/entities/material.entity';
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

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: UserRoleEnum;

  @OneToMany((type) => Material, (material) => material.manager, {
    nullable: true,
  })
  material: Material[];
}
