import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { Equipment } from './entities/equipment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ProjectModule } from 'src/project/project.module';
import { HistoryModule } from 'src/history/history.module';
import { EquipmentVisibility } from './entities/equipment-visibility.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment]),
    TypeOrmModule.forFeature([EquipmentVisibility]),
    ProjectModule,
    HistoryModule,
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
