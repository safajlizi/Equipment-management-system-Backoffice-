import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HistoryService } from 'src/history/history.service';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';
import { CreateReturnHistoryDto } from 'src/history/dto/create-return-history.dto';

@Controller('project')
@ApiTags('Project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly historyService: HistoryService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Project with given attributes is created.',
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of all projects is returned.' })
  findAll() {
    return this.projectService.findAll();
  }

  @Get('/manager/:id')
  @ApiOkResponse({
    description: 'User who is manager for project with given id is returned.',
  })
  @ApiNotFoundResponse({ description: 'No project with given id is found.' })
  getManager(@Param('id') id: string) {
    return this.projectService.getManager(id);
  }

  @Get('/members/:id')
  @ApiOkResponse({
    description: 'List of member of project with given id has been returned.',
  })
  @ApiNotFoundResponse({
    description: 'No project with such Id has been found.',
  })
  getMembers(@Param('id') id: string) {
    return this.projectService.getMembers(id);
  }

  @Patch('/members/:id')
  @ApiOkResponse({
    description:
      'Member or members whose ids were given have been added to project with id given in params.',
  })
  @ApiNotFoundResponse({
    description:
      'Project with given id not found or user(s) with given id(s) not found.',
  })
  addMember(@Param('id') id: string, @Body() body) {
    if (body.memberId) return this.projectService.addMember(id, body.memberId);
    else return this.projectService.addMember(id, body.memberIds);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Delete('/members/:id')
  @ApiOkResponse({ description: 'Removed member from project member list.' })
  @ApiNotFoundResponse({
    description: 'Project or user to be removed not found',
  })
  removeMember(
    @Param('id') projectId: string,
    @Body('memberId') memberId: string,
  ) {
    return this.projectService.removeMember(projectId, memberId);
  }

  @Get('/filter/:keyword')
  filter(@Param('keyword') keyword: string) {
    return this.projectService.filter(keyword);
  }

  @Patch('/equipment/:id')
  @ApiOkResponse({
    description: 'Equipment returned to project storage succesfully.',
  })
  removeEquipment(createReturn: CreateReturnHistoryDto) {
    return this.projectService.removeEquipment(createReturn);
  }
}
