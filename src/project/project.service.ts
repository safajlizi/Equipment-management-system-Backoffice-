import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReturnHistoryDto } from 'src/history/dto/create-return-history.dto';
import { HistoryService } from 'src/history/history.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository, Like } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(HistoryService)
    private readonly historyService: HistoryService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const manager = await this.usersService.getUserByEmailOrUsername(
      createProjectDto.manager,
      createProjectDto.manager,
    );
    if (manager) {
      let projectToBeMade = new Project();
      projectToBeMade.name = createProjectDto.name;
      projectToBeMade.manager = manager;
      var project = this.projectRepository.create(projectToBeMade);
      return await this.projectRepository.save(project);
    } else
      throw new NotFoundException(
        "Un utilisateur avec cet email n'a pas été trouvé.",
      );
  }

  async findAll() {
    return await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.manager', 'user')
      .getMany();
  }

  async findOne(id: string) {
    return await this.projectRepository
      .createQueryBuilder('project')
      .select()
      .where('project.id = :id', { id: id })
      .leftJoinAndSelect('project.manager', 'user')
      .getOne();
  }

  /*
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepository.update(id, updateProjectDto);
  }
  */

  async remove(id: string) {
    return await this.projectRepository.update(id, { deleted: true });
  }

  async addMember(id: string, memberId: string) {
    return await this.projectRepository
      .createQueryBuilder('p')
      .relation('members')
      .of(id)
      .add(memberId);
  }

  async removeMember(id: string, memberId: string) {
    return await this.projectRepository
      .createQueryBuilder('p')
      .relation('members')
      .of(id)
      .remove(memberId);
  }

  async addMembers(id: string, memberIds: string[]) {
    return await this.projectRepository
      .createQueryBuilder('p')
      .relation('members')
      .of(id)
      .add(memberIds);
  }

  async getManager(id: string) {
    return await this.projectRepository
      .createQueryBuilder('p')
      .relation('manager')
      .of(id)
      .loadOne();
  }

  async getMembers(id: string) {
    return await this.projectRepository
      .createQueryBuilder('project')
      .relation('members')
      .of(id)
      .loadMany();
  }

  async filter(keyword: string) {
    /*({
      where: [
        { name: Like(`%${keyword}%`) },
        { manager: Like(`%${keyword}%`) },
      ],
    });*/
    console.log(keyword);
    return await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.manager', 'user')
      .where('name like :keyword', { keyword: `%${keyword}%` })
      .orWhere('user.firstname like :keyword', { keyword: `%${keyword}%` })
      .orWhere('user.lastname like :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }

  async removeEquipment(createReturn: CreateReturnHistoryDto) {
    await this.historyService.createReturn(createReturn);
    return await this.projectRepository
      .createQueryBuilder('p')
      .relation('equipment')
      .of(createReturn.project.id)
      .remove(createReturn.equipment.id);
  }
  async getProjectsOfUser(memberId: string) {
    return await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.members', 'user', 'user.id = :userId', {
        userId: memberId,
      })
      .leftJoinAndSelect('project.manager', 'users')
      .getMany();
  }
}
