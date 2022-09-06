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
import { FilterActionTypeDto } from './dto/filter-action_type.dto';
import { FilterDateDto } from './dto/filter-date.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';

export enum Concerning {
  equipment = 'equipment',
  user = 'user',
  project = 'project',
}

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
      .leftJoinAndSelect('history.user', 'user')
      .leftJoinAndSelect('history.equipment', 'equipment')
      .leftJoinAndSelect('history.project', 'project')
      .where('history.user = :id', { id: userId })
      .orderBy('history.created_at', 'ASC')
      .getMany();
  }
  async getProjectHistory(projectId: string) {
    return await this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.project', 'project')
      .leftJoinAndSelect('history.equipment', 'equipment')
      .leftJoinAndSelect('history.user', 'user')
      .where('history.project = :id', { id: projectId })
      .orderBy('history.created_at', 'ASC')
      .getMany();
  }
  async getEquipmentHistory(equipmentId: string) {
    return await this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.user', 'user')
      .leftJoinAndSelect('history.equipment', 'equipment')
      .leftJoinAndSelect('history.project', 'project')
      .where('history.equipment = :id', { id: equipmentId })
      .orderBy('history.created_at', 'ASC')
      .getMany();
  }

  //FILTERS

  async filterByActionType(filterData: FilterActionTypeDto) {
    switch (filterData.concerning) {
      case Concerning.equipment: {
        return await this.historyRepository
          .createQueryBuilder('history')
          .leftJoinAndSelect('history.user', 'user')
          .leftJoinAndSelect('history.equipment', 'equipment')
          .leftJoinAndSelect('history.project', 'project')
          .where('history.equipment = :id', { id: filterData.id })
          .andWhere('history.action_type = :action', {
            action: filterData.action_type,
          })
          .getMany();
      }
      case Concerning.project: {
        return await this.historyRepository
          .createQueryBuilder('history')
          .leftJoinAndSelect('history.project', 'project')
          .leftJoinAndSelect('history.equipment', 'equipment')
          .leftJoinAndSelect('history.user', 'user')
          .where('history.project = :id', { id: filterData.id })
          .andWhere('history.action_type = :action', {
            action: filterData.action_type,
          })
          .getMany();
      }
      case Concerning.user: {
        return await this.historyRepository
          .createQueryBuilder('history')
          .leftJoinAndSelect('history.user', 'user')
          .leftJoinAndSelect('history.equipment', 'equipment')
          .leftJoinAndSelect('history.project', 'project')
          .where('history.user = :id', { id: filterData.id })
          .andWhere('history.action_type = :action', {
            action: filterData.action_type,
          })
          .getMany();
      }
    }
  }

  async filterByCreationDate(filterData: FilterDateDto) {
    switch (filterData.concerning) {
      case Concerning.equipment: {
        return await this.historyRepository
          .createQueryBuilder('history')
          .leftJoinAndSelect('history.user', 'user')
          .leftJoinAndSelect('history.equipment', 'equipment')
          .leftJoinAndSelect('history.project', 'project')
          .where('history.equipment = :id', { id: filterData.id })
          .andWhere('history.created_at = :date', {
            date: filterData.date,
          })
          .getMany();
      }
      case Concerning.project: {
        return await this.historyRepository
          .createQueryBuilder('history')
          .leftJoinAndSelect('history.project', 'project')
          .leftJoinAndSelect('history.equipment', 'equipment')
          .leftJoinAndSelect('history.user', 'user')
          .where('history.project = :id', { id: filterData.id })
          .andWhere('history.created_at = :date', {
            date: filterData.date,
          })
          .getMany();
      }
      case Concerning.user: {
        return await this.historyRepository
          .createQueryBuilder('history')
          .leftJoinAndSelect('history.user', 'user')
          .leftJoinAndSelect('history.equipment', 'equipment')
          .leftJoinAndSelect('history.project', 'project')
          .where('history.user = :id', { id: filterData.id })
          .andWhere('history.created_at LIKE :date', {
            date: filterData.date,
          })
          .getMany();
      }
    }
  }
  async searchUserHistory(keyword: string, UserId: string) {
    return await this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.equipment', 'equipment')
      .leftJoinAndSelect('history.project', 'project')
      .leftJoinAndSelect('history.user', 'user')
      .where('user.id = :id', { id: UserId })
      .andWhere(
        'user.email like :keyword or user.username like :keyword or user.firstname like :keyword or user.lastname like :keyword or equipment.label like :keyword or equipment.ref like :keyword or project.name like :keyword or history.description like :keyword',
        { keyword: `%${keyword}%` },
      )
      .getMany();
  }
}
