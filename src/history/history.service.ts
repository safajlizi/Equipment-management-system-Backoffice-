import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { EquipmentService } from 'src/equipment/equipment.service';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFaultyHistoryDto } from './dto/create-faulty-history.dto';
import { CreateHistoryDto } from './dto/create-history.dto';
import { CreateReturnHistoryDto } from './dto/create-return-history.dto';
import { CreateTakeHistoryDto } from './dto/create-take-history.dto';
import { CreateTakesHistoryDto } from './dto/create-takes-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
  ) {}
  async createReturn(returnDto: CreateReturnHistoryDto) {
    let history = this.historyRepository.create(returnDto);
    return await this.historyRepository.save(history);
  }
  async createTake(takeDto: CreateTakeHistoryDto) {
    let history = this.historyRepository.create(takeDto);
    return await this.historyRepository.save(history);
  }
  /*async createTakes(takesDto: CreateTakesHistoryDto) {
    let dto = new CreateTakeHistoryDto();
    dto.date_lib = takesDto.date_lib;
    dto.date_res = takesDto.date_res;
    dto.description = takesDto.description;
    dto.project = takesDto.project;
    dto.user = takesDto.user;
    takesDto.equipment.forEach(async (equip) => {
      dto.equipment = await this.equipmentService.findOne(equip);
      this.createTake(dto);
    });
  }*/
  async createFault(faultDto: CreateFaultyHistoryDto) {
    let history = this.historyRepository.create(faultDto);
    return await this.historyRepository.save(history);
  }

  async findAll() {
    return await this.historyRepository.find();
  }

  async findOne(id: string) {
    return await this.historyRepository.findOneBy({ id: id });
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto) {
    return await this.historyRepository.update(id, updateHistoryDto);
  }

  async remove(id: string) {
    return await this.historyRepository.delete(id);
  }
  async getUserHistory(userId: string) {
    return await this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.equipment', 'equipment')
      .leftJoinAndSelect('history.project', 'project')
      .where('history.user = :id', { id: userId })
      .getMany();
  }
  async getProjectHistory(projectId: string) {
    return await this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.equipment', 'equipment')
      .leftJoinAndSelect('history.user', 'user')
      .where('history.project = :id', { id: projectId })
      .getMany();
  }
  async getEquipmentHistory(equipmentId: string) {
    return await this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.user', 'user')
      .leftJoinAndSelect('history.project', 'project')
      .where('history.equipment = :id', { id: equipmentId })
      .getMany();
  }
}
