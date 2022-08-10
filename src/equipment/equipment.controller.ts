import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('equipment')
@ApiTags('Equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(id);
  }
  @Get('/filter/:keyword')
  @ApiOkResponse({ description: 'Returned filtered equipment list.' })
  getFiltered(@Param('keyword') keyword: string) {
    return this.equipmentService.filter(keyword);
  }
  @Get('/measurement/all')
  getMeasurementsEquipement() {
    return this.equipmentService.getMeasurementsEquipement();
  }
  @Get('/project/:id')
  getByProject(@Param('id') id: string) {
    console.log(id);
    return this.equipmentService.getByProject(id);
  }
  @Post('/project/:id')
  affectEquipToProject(
    @Param('id') id: string,
    @Body('equipment') equipment: string[],
    @UserDecorator() user: User,
    createHistoryDto: CreateHistoryDto,
  ) {
    return this.equipmentService.affectEquipToProject(
      equipment,
      id,
      user,
      createHistoryDto,
    );
  }
  @Get('/prop_client/all')
  getPropClient() {
    return this.equipmentService.getPropClient();
  }
}
