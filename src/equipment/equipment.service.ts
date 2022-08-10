import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNotEmpty } from 'class-validator';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';
import { HistoryService } from 'src/history/history.service';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { User } from 'src/users/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment, EquipmentStatusEnum } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentsRepository: Repository<Equipment>,
    private readonly projectService: ProjectService,
    private readonly historyService: HistoryService,
  ) {}
  async create(createEquipmentDto: CreateEquipmentDto) {
    var equipment = this.equipmentsRepository.create(createEquipmentDto);
    //equipment.ref = HERE WRITE LOGIC OF REF DETERMINATION
    return await this.equipmentsRepository.save(equipment);
  }

  async findAll() {
    return await this.equipmentsRepository.find();
  }

  async findOne(id: string) {
    return await this.equipmentsRepository.findOneBy({ id: id });
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    return await this.equipmentsRepository.update(id, updateEquipmentDto);
  }

  async remove(id: string) {
    return await this.equipmentsRepository.delete(id);
  }
  async filter(keyword: string) {
    return await this.equipmentsRepository.find({
      where: [
        { label: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) },
      ],
    });
  }

  async getEquipmentOfProject(project: Project) {
    return await this.equipmentsRepository.find({
      where: [{ project: project }],
    });
  }
  async editEquipmentProject(equipmentId: string, projectId: string) {
    let project = await this.projectService.findOne(projectId);
    return await this.equipmentsRepository.update(equipmentId, {
      project: project,
    });
  }
  async affectEquipToProject(
    equipmentIds: string[],
    projectId: string,
    user: User,
    createHistoryDto: CreateHistoryDto,
  ) {
    //Affect equipment to project.
    let project = await this.projectService.findOne(projectId);

    equipmentIds.forEach(async (equipment) => {
      let fullEquip = await this.findOne(equipment);
      this.historyService.create(createHistoryDto, user, fullEquip, project);
    });
    return await this.equipmentsRepository.update(equipmentIds, {
      project: project,
    });
  }
  async getPropClient() {
    return await this.equipmentsRepository.find({
      where: { prop_client: true },
    });
  }
  async getByStatus(status: EquipmentStatusEnum) {
    return await this.equipmentsRepository.find({
      where: { status: status },
    });
  }
  async getByProject(id: string) {
    return this.equipmentsRepository
      .createQueryBuilder('e')
      .select()
      .where('e.project=:id', { id: id })
      .execute();
  }
  async getMeasurementsEquipement() {
    return await this.equipmentsRepository.find({
      where: { is_calibrated: false || true },
    });
  }
}
