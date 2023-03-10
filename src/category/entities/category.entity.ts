import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @ManyToOne((type) => Equipment, (equip) => equip.category)
  equipment: Equipment[];
}
