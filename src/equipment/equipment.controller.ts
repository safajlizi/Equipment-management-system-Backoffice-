import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateTakeHistoryDto } from 'src/history/dto/create-take-history.dto';
import { CreateReturnHistoryDto } from 'src/history/dto/create-return-history.dto';
import { CreateFaultyHistoryDto } from 'src/history/dto/create-faulty-history.dto';
import { Equipment } from './entities/equipment.entity';
import { VisibiltyUpdateDto } from './dto/visibility-update.dto';
import { CreateUpdateHistoryDto } from 'src/history/dto/create-update-history.dto';

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
  @ApiOkResponse({
    description: 'Returned filtered equipment list.',
    type: Array<Equipment>,
  })
  getFiltered(@Param('keyword') keyword: string) {
    return this.equipmentService.filter(keyword);
  }

  @Get('/measurement/all')
  @ApiOkResponse({ description: 'Returned measurment equipment list. ' })
  getMeasurementsEquipement() {
    return this.equipmentService.getMeasurementsEquipement();
  }

  @Get('/project/:id')
  @ApiOkResponse({
    description: 'Returned list of equipment of given project.',
  })
  getByProject(@Param('id') id: string) {
    return this.equipmentService.getByProject(id);
  }

  @Post('/project/take')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ description: 'Equipment affected to project.' })
  @ApiBadRequestResponse({
    description: 'Equipment already in use by other project.',
  })
  affectEquipToProject(@Body() createTake: CreateTakeHistoryDto) {
    return this.equipmentService.affectEquipToProject(createTake);
  }

  @Patch('/project/return')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ description: 'Equipment returned.' })
  @ApiBadRequestResponse({
    description: "Equipment not in project, can't be returned",
  })
  returnEquipFromProject(@Body() createReturn: CreateReturnHistoryDto) {
    return this.equipmentService.returnEquipFromProject(createReturn);
  }

  @Patch('/reservation/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateReservation(@Body() updateDto: CreateUpdateHistoryDto) {
    return this.equipmentService.updateReservation(updateDto);
  }
  @Post('/faulty')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ description: 'Equipment fault is declared.' })
  declareFaulty(@Body() createFaulty: CreateFaultyHistoryDto) {
    return this.equipmentService.declareEquipFaulty(createFaulty);
  }

  /*@Get('/prop_client/all')
  @ApiOkResponse({
    description: 'Equipment that is client property is returned.',
  })
  getPropClient() {
    return this.equipmentService.getPropClient();
  }*/

  @ApiOkResponse({
    description: 'Equipment affected to user within a project succesfully.',
  })
  @ApiUnauthorizedResponse({
    description: "User requesting isn't member of project.",
  })
  @Post('/project/user/take')
  @UsePipes(new ValidationPipe({ transform: true }))
  affectEquipToProjectUser(@Body() createTakeUser: CreateTakeHistoryDto) {
    return this.equipmentService.affectEquipToUserProject(createTakeUser);
  }

  @ApiOkResponse({
    description: 'Equipment returned from user to a project succesfully.',
  })
  @ApiUnauthorizedResponse({
    description: "User requesting isn't member of project.",
  })
  @Patch('/project/user/return')
  @UsePipes(new ValidationPipe({ transform: true }))
  returnEquipFromProjectUser(@Body() createReturnUser: CreateReturnHistoryDto) {
    return this.equipmentService.removeEquipToUserProject(createReturnUser);
  }

  @Get('/categories')
  getCategories() {
    return this.equipmentService.getCategories();
  }
  @Post('/visibility')
  updateVisibility(@Body() visibility: VisibiltyUpdateDto) {
    return this.equipmentService.updateVisibility(visibility);
  }
  @Get('/visibility/all')
  getVisibility() {
    return this.equipmentService.getVisibility();
  }
  @Post('/visibility/new')
  newVisibility(@Body('field') fieldname: string) {
    return this.equipmentService.createVisibility(fieldname);
  }
}
