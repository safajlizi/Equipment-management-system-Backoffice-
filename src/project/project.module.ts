import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UsersModule } from 'src/users/users.module';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UsersModule, HistoryModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
