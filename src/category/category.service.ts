import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    let category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .select()
      .getMany();
  }

  async findOne(id: string) {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .select()
      .where('category.id = :id', { id: id })
      .getOne();
  }
  async findOneByName(name: string) {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .select()
      .where('category.name = :name', { name: name })
      .getOne();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .update()
      .set(updateCategoryDto)
      .where('category.id = :id', { id: id })
      .execute();
  }

  async remove(id: string) {
    return `This action removes a #${id} category`;
  }
  async getEquips(id: string) {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id: id })
      .leftJoinAndSelect('category.equipment', 'equipment')
      .getMany();
  }
}
