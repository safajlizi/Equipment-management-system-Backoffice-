import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Options,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { ApiTags } from '@nestjs/swagger';
import { Project } from 'src/project/entities/project.entity';
import { FilterActionTypeDto } from './dto/filter-action_type.dto';
import { FilterDateDto } from './dto/filter-date.dto';

@Controller('history')
@ApiTags('History')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  /*@Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }*/

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(id);
  }

  @Get('user/:id')
  getUserHistory(@Param('id') userId: string) {
    return this.historyService.getUserHistory(userId);
  }

  @Get('project/:id')
  getProjectHistory(@Param('id') projectId: string) {
    return this.historyService.getProjectHistory(projectId);
  }
  @Get('equipment/:id')
  getEquipmentHistory(@Param('id') equipmentId: string) {
    return this.historyService.getEquipmentHistory(equipmentId);
  }

  @Post('/filter/action_type')
  getFilteredHistoryActionType(@Body() filterData: FilterActionTypeDto) {
    return this.historyService.filterByActionType(filterData);
  }

  @Post('/filter/date')
  getFilteredHistoryCreationDate(@Body() filterData: FilterDateDto) {
    return this.historyService.filterByCreationDate(filterData);
  }
}
