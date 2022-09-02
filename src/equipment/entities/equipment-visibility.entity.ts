import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EquipmentVisibility {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  field: string;
  @Column({ default: true })
  visible: boolean;
}
