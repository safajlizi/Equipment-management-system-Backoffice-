import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @OneToMany((type) => Equipment, (equipment) => equipment.property)
  equipment: Equipment[];
}
