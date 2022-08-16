import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNotEmpty } from 'class-validator';
import { CreateFaultyHistoryDto } from 'src/history/dto/create-faulty-history.dto';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';
import { CreateReturnHistoryDto } from 'src/history/dto/create-return-history.dto';
import { CreateTakeHistoryDto } from 'src/history/dto/create-take-history.dto';
import { CreateTakesHistoryDto } from 'src/history/dto/create-takes-history.dto';
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
  async declareEquipFaulty(createFault: CreateFaultyHistoryDto) {
    this.historyService.createFault(createFault);
    this.equipmentsRepository.update(createFault.equipment, {
      defaults: createFault.description,
      status: EquipmentStatusEnum.faulty,
    });
  }

  async affectEquipToProject(createTake: CreateTakeHistoryDto) {
    //Affect equipment to project.
    let equipment = await this.findOne(createTake.equipment.id);
    if (equipment.project != null) {
      throw new BadRequestException('Ce matériel appartient déja à un projet.');
    } else {
      await this.historyService.createTake(createTake);
      return await this.equipmentsRepository
        .createQueryBuilder()
        .relation('project')
        .of(createTake.equipment)
        .update({
          project: createTake.project,
          status: EquipmentStatusEnum.inUse,
        })
        .execute();
    }
  }
  async returnEquipFromProject(createReturn: CreateReturnHistoryDto) {
    let equipment = await this.findOne(createReturn.equipment.id);
    if (equipment.project != createReturn.project) {
      throw new BadRequestException(
        "Ce matériel n'apprtenait pas à ce projet!",
      );
    } else {
      await this.historyService.createReturn(createReturn);
      return await this.equipmentsRepository
        .createQueryBuilder()
        .relation('project')
        .of(createReturn.equipment)
        .remove(createReturn.project);
    }
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
      .createQueryBuilder()
      .select()
      .where('projectId=:id', { id: id })
      .execute();
  }
  async getMeasurementsEquipement() {
    return await this.equipmentsRepository.find({
      where: { is_calibrated: false || true },
    });
  }
}
