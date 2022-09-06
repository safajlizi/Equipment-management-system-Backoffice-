import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    let property = this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(property);
  }

  async findAll() {
    return await this.propertyRepository
      .createQueryBuilder()
      .select()
      .getMany();
  }

  async findOne(id: string) {
    return this.propertyRepository.findOneBy({ id: id });
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  async remove(id: string) {
    return `This action removes a #${id} property`;
  }
}
