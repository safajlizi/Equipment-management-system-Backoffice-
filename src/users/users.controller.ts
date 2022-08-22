import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  @Get('managers/all')
  getManagers() {
    return this.usersService.getManagers();
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('password/:id')
  updatePassword(@Body() body, @Param('id') id: string) {
    return this.usersService.updatePassword(
      id,
      body.oldpassword,
      body.newpassword,
    );
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('username/:id')
  updateUsername(@Body() body, @Param('id') id: string) {
    return this.usersService.updateUsername(id, body.username);
  }

  @Get('equipments/:id')
  getEquips(@Param('id') id: string) {
    return this.usersService.getEquips(id);
  }

  @Get('projects/managed/:id')
  getManaged(@Param('id') id: string) {
    return this.usersService.getManagedProjectsOfUser(id);
  }
  /* @Get('projects/member/:id')
  getMemberProjects(@Param('id') id: string) {
    return this.usersService.getMemberProjectsOfUser(id);
  }*/
  @Get('filter/:keyword')
  filter(@Param('keyword') keyword: string) {
    return this.usersService.filter(keyword);
  }
}
