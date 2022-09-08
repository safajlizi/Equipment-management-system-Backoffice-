import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { Equipment } from './entities/equipment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ProjectModule } from 'src/project/project.module';
import { HistoryModule } from 'src/history/history.module';
import { EquipmentVisibility } from './entities/equipment-visibility.entity';
import { PropertyModule } from 'src/property/property.module';
import { CategoryModule } from 'src/category/category.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment]),
    TypeOrmModule.forFeature([EquipmentVisibility]),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.mailtrap.io',
          port: 2525,
          ignoreTLS: true,
          secure: false,
          auth: {
            user: '8e2a8cce3a355a',
            pass: '30035d45d3952b',
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ProjectModule,
    HistoryModule,
    PropertyModule,
    CategoryModule,
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
