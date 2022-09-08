import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNotEmpty } from 'class-validator';
import { CategoryService } from 'src/category/category.service';
import { CreateFaultyHistoryDto } from 'src/history/dto/create-faulty-history.dto';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';
import { CreateReturnHistoryDto } from 'src/history/dto/create-return-history.dto';
import { CreateTakeHistoryDto } from 'src/history/dto/create-take-history.dto';
import { CreateTakesHistoryDto } from 'src/history/dto/create-takes-history.dto';
import { CreateUpdateHistoryDto } from 'src/history/dto/create-update-history.dto';
import { HistoryService } from 'src/history/history.service';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { PropertyService } from 'src/property/property.service';
import { User } from 'src/users/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { VisibiltyUpdateDto } from './dto/visibility-update.dto';
import { EquipmentVisibility } from './entities/equipment-visibility.entity';
import {
  Equipment,
  EquipmentCalibrationEnum,
  EquipmentConformityEnum,
  EquipmentPropertyEnum,
  EquipmentStatusEnum,
} from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentsRepository: Repository<Equipment>,
    private readonly projectService: ProjectService,
    private readonly historyService: HistoryService,
    private readonly categoryService: CategoryService,
    private readonly propertyService: PropertyService,
    private readonly mailerService: MailerService,
    @InjectRepository(EquipmentVisibility)
    private visibilityRepository: Repository<EquipmentVisibility>,
  ) {}
  async create(createEquipmentDto: CreateEquipmentDto) {
    var equipment = this.equipmentsRepository.create(createEquipmentDto);
    let category = await this.categoryService.findOne(
      createEquipmentDto.category as unknown as string,
    );
    console.log(category);
    let count = (
      await this.equipmentsRepository.findAndCountBy({
        category: category,
      })
    )[1];
    equipment.ref = `${category.name}_M${count}`;
    return await this.equipmentsRepository.save(equipment);
  }

  async findAll() {
    return await this.equipmentsRepository
      .createQueryBuilder('equip')
      .leftJoinAndSelect('equip.manager', 'user')
      .leftJoinAndSelect('equip.project', 'project')
      .leftJoinAndSelect('equip.property', 'property')
      .leftJoinAndSelect('equip.category', 'category')
      .getMany();
  }

  async findOne(id: string) {
    return await this.equipmentsRepository
      .createQueryBuilder('equip')
      .select()
      .where('equip.id = :id', { id: id })
      .leftJoinAndSelect('equip.manager', 'user')
      .getOne();
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    let keys = Object.keys(updateEquipmentDto);
    keys.map((key) => {
      !updateEquipmentDto[key] && delete updateEquipmentDto[key];
    });
    console.log(updateEquipmentDto);
    return await this.equipmentsRepository.update(id, updateEquipmentDto);
  }

  async remove(id: string) {
    return await this.equipmentsRepository.update(id, { deleted: true });
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
  async updateReservation(updateReservationHistory: CreateUpdateHistoryDto) {
    let equipment = await this.findOne(
      updateReservationHistory.equipment as unknown as string,
    );
    console.log(updateReservationHistory.user);
    console.log(equipment.manager.id);
    if (
      (updateReservationHistory.user as unknown as string) !=
      equipment.manager.id
    ) {
      throw new UnauthorizedException("C'est pas votre équipment à modifier.");
    } else {
      updateReservationHistory.project = equipment.project;
      this.historyService.createUpdate(updateReservationHistory);
      this.equipmentsRepository.update(equipment.id, {
        date_res: updateReservationHistory.date_res,
        date_lib: updateReservationHistory.date_lib,
      });
    }
  }
  async declareEquipFaulty(createFault: CreateFaultyHistoryDto) {
    this.historyService.createFault(createFault);
    let equipment = await this.findOne(
      createFault.equipment as unknown as string,
    );
    return await this.equipmentsRepository.update(equipment.id, {
      defaults: createFault.description,
      conformity: EquipmentConformityEnum.notcompliant,
    });
  }

  async affectEquipToProject(createTake: CreateTakeHistoryDto) {
    //Affect equipment to project, this is done by a manager.
    let equipment = await this.findOne(
      createTake.equipment as unknown as string,
    );
    if (equipment.project != null) {
      throw new BadRequestException('Ce matériel appartient déja à un projet.');
    } else {
      await this.historyService.createTake(createTake);
      await this.equipmentsRepository
        .createQueryBuilder()
        .relation('manager')
        .of(equipment)
        .set(createTake.user);
      await this.equipmentsRepository
        .createQueryBuilder()
        .relation('project')
        .of(equipment)
        .set(createTake.project);
      return await this.equipmentsRepository
        .createQueryBuilder()
        .update()
        .where('id = :id', { id: equipment.id })
        .set({
          availability: EquipmentStatusEnum.InUseToOthers,
          date_lib: createTake.date_lib,
          date_res: createTake.date_res,
        })
        .execute();
    }
  }
  async returnEquipFromProject(createReturn: CreateReturnHistoryDto) {
    //Returns equipment to global storage and out of project jurisdiction, this is done by manager.
    let project = await this.projectService.findOne(
      createReturn.project as unknown as string,
    );
    if (project.id != (createReturn.project as unknown as string)) {
      throw new BadRequestException(
        "Ce matériel n'appartient pas à ce projet!",
      );
    } else {
      await this.historyService.createReturn(createReturn);
      let equipment = await this.findOne(
        createReturn.equipment as unknown as string,
      );
      await this.equipmentsRepository
        .createQueryBuilder()
        .relation('project')
        .of(equipment)
        .set(null);
      await this.equipmentsRepository
        .createQueryBuilder()
        .relation('manager')
        .of(equipment)
        .set(null);
      return await this.equipmentsRepository
        .createQueryBuilder()
        .update()
        .set({
          availability: EquipmentStatusEnum.availableToAll,
          date_lib: null,
          date_res: null,
        })
        .where('id = :id', { id: equipment.id })
        .execute();
    }
  }

  async affectEquipToUserProject(createTakeUser: CreateTakeHistoryDto) {
    let members = await this.projectService.getMembers(
      createTakeUser.project as unknown as string,
    );
    let memberIds = members.map((element) => element.id);
    if (memberIds.includes(createTakeUser.user)) {
      let equipment = await this.equipmentsRepository.findOneBy({
        id: createTakeUser.equipment as unknown as string,
      });
      await this.historyService.createTake(createTakeUser);
      await this.equipmentsRepository
        .createQueryBuilder()
        .relation('manager')
        .of(equipment)
        .set(createTakeUser.user);
      return this.equipmentsRepository
        .createQueryBuilder()
        .update()
        .set({
          availability: EquipmentStatusEnum.InUseToProject,
        })
        .where('id = :id', { id: equipment.id })
        .execute();
    } else
      throw new UnauthorizedException('You are not a member of this project.');
  }

  async removeEquipToUserProject(createReturnUser: CreateReturnHistoryDto) {
    let members = await this.projectService.getMembers(
      createReturnUser.project as unknown as string,
    );
    let project = await this.projectService.findOne(
      createReturnUser.project as unknown as string,
    );
    let memberIds = members.map((element) => element.id);
    if (memberIds.includes(createReturnUser.user)) {
      let equipment = await this.findOne(
        createReturnUser.equipment as unknown as string,
      );
      if (
        !equipment.manager ||
        equipment.manager.id != (createReturnUser.user as unknown as string)
      ) {
        throw new UnauthorizedException(
          'Vous ne possédez pas cet équipement pour le retourner.',
        );
      } else {
        await this.historyService.createReturn(createReturnUser);
        await this.equipmentsRepository
          .createQueryBuilder()
          .relation('manager')
          .of(equipment)
          .set(project.manager);
        return await this.equipmentsRepository
          .createQueryBuilder()
          .update()
          .set({ availability: EquipmentStatusEnum.InUseToOthers })
          .where('id = :id', { id: equipment.id })
          .execute();
      }
    } else
      throw new UnauthorizedException('You are not a member of this project.');
  }
  /*async getPropClient() {
    return await this.equipmentsRepository.find({
      where: { property: EquipmentPropertyEnum.client },
    });
  }*/
  async getByStatus(status: EquipmentStatusEnum) {
    return await this.equipmentsRepository.find({
      where: { availability: status },
    });
  }
  async getByProject(id: string) {
    return this.equipmentsRepository
      .createQueryBuilder('equip')
      .select()
      .where('equip.projectId=:id', { id: id })
      .leftJoinAndSelect('equip.manager', 'user')
      .getMany();
  }
  async getMeasurementsEquipement() {
    return await this.equipmentsRepository.find({
      where: [
        { calibration: EquipmentCalibrationEnum.ok },
        { calibration: EquipmentCalibrationEnum.nok },
      ],
    });
  }

  async getCategories() {
    return await this.equipmentsRepository
      .createQueryBuilder()
      .select('category')
      .distinct()
      .execute();
  }

  /*Visibility operations*/
  async getVisibility() {
    return await this.visibilityRepository.find({});
  }
  async updateVisibility(visibilityState: VisibiltyUpdateDto) {
    visibilityState.disabled.map(async (element) => {
      await this.visibilityRepository.update(
        { field: element },
        { visible: false },
      );
    });
    visibilityState.enabled.map(async (element) => {
      await this.visibilityRepository.update(
        { field: element },
        { visible: true },
      );
    });
  }
  async createVisibility(fieldname: string) {
    let visibility = this.visibilityRepository.create({ field: fieldname });
    return this.visibilityRepository.save(visibility);
  }

  //CRON
  @Cron('0 0 * * *')
  async checkCalibration() {
    let today = new Date();
    let equipments = await this.findAll();
    equipments.forEach((element) => {
      let manager = element.manager;
      if (element.validity_date == today) {
        this.mailerService.sendMail({
          to: manager.email,
          from: 'safajlizi199@gmail.com',
          subject: 'Calibration notification.',
          template: 'calibration',
          context: {
            ref: element.ref,
            username: manager.username,
          },
        });
      }
    });
  }
}
