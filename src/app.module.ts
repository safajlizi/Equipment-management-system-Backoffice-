import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EquipmentModule } from './equipment/equipment.module';
import { UsersModule } from './users/users.module';
import { HistoryModule } from './history/history.module';
import { ProjectModule } from './project/project.module';
import { CategoryModule } from './category/category.module';
import { PropertyModule } from './property/property.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sofiatech',
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      debug: false,
    }),
    ScheduleModule.forRoot(),
    EquipmentModule,
    AuthModule,
    UsersModule,
    HistoryModule,
    ProjectModule,
    CategoryModule,
    PropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
