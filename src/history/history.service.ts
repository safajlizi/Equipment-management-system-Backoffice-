import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
  ) {}
  async create(
    createHistoryDto: CreateHistoryDto,
    user: User,
    equipment: Equipment,
    project: Project,
  ) {
    var history = this.historyRepository.create(createHistoryDto);
    history.date_res = new Date();
    history.user = user;
    history.equipment = equipment;
    history.project = project;
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
}
