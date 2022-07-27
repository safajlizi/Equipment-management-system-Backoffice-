import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRoleEnum } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async create(registerdto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(registerdto);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    user.role = UserRoleEnum.user;
    return await this.usersRepository.save(user);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async getUserByUserNameOrEmail(
    username: string,
    email: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    return user;
  }
}
