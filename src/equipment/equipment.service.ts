import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentsRepository: Repository<Equipment>,
  ) {}
  async create(createEquipmentDto: CreateEquipmentDto) {
    var equipment = this.equipmentsRepository.create(createEquipmentDto);
    return await this.equipmentsRepository.save(equipment);
  }

  async findAll() {
    return await this.equipmentsRepository.find();
  }

  async findOne(id: number) {
    return await this.equipmentsRepository.findOneBy({ id: id });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return await this.equipmentsRepository.update(id, updateEquipmentDto);
  }

  async remove(id: number) {
    return await this.equipmentsRepository.delete(id);
  }
}
