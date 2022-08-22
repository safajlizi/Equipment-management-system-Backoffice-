import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRoleEnum } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async create(registerdto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(registerdto);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    return await this.usersRepository.save(user);
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async getUserByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });
    return user;
  }
  async updatePassword(id: string, oldpassword: string, newpassword) {
    let user = await this.usersRepository.findOne({ where: { id: id } });
    let cryptedOldpassword = await bcrypt.hash(oldpassword, user.salt);
    if (user.password == cryptedOldpassword) {
      user.password = await bcrypt.hash(newpassword, user.salt);
      let newUser = await this.usersRepository.save(user);
      return {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      };
    } else throw new UnauthorizedException('Mot de passe érroné.');
  }
  async updateUsername(id: string, username: string) {
    const sameUsername = await this.usersRepository.findOneBy({
      username: username,
    });
    if (sameUsername)
      throw new HttpException('User with this username already exists.', 409);
    else await this.usersRepository.update(id, { username: username });
    return await this.usersRepository.findOneBy({ id: id });
  }
  async getEquips(id: string) {
    return await this.usersRepository
      .createQueryBuilder()
      .relation('equipment')
      .of(id)
      .loadMany();
  }
  async addEquip(userId: string, equipId: string | string[]) {
    return await this.usersRepository
      .createQueryBuilder()
      .relation('equipment')
      .of(userId)
      .add(equipId);
  }
  async getManagedProjectsOfUser(id: string) {
    return await this.usersRepository
      .createQueryBuilder('u')
      .relation('managed')
      .of(id)
      .loadMany();
  }

  async filter(keyword: string) {
    return await this.usersRepository.find({
      where: [
        { email: Like(`%${keyword}%`) },
        { username: Like(`%${keyword}%`) },
        { firstname: Like(`%${keyword}%`) },
        { lastname: Like(`%${keyword}%`) },
      ],
    });
  }
  async getManagers() {
    return await this.usersRepository.find({
      where: { role: UserRoleEnum.manager },
    });
  }
}
