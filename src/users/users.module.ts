import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {MailerModule} from '@nestjs-modules/mailer';
import { join } from 'path';

import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MailerModule.forRootAsync({
    
    useFactory: () => ({
      transport:{
        host: 'smtp.mailtrap.io',
        port: 2525,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: '433635c7ef69c5',
          pass: '9ca041a6ed76cb'
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    template: {
      dir:  process.cwd() + '/templates/',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
          },
      },
    }),
  }),],

  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
 
})
export class UsersModule {}
