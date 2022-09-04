import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {MailerModule} from '@nestjs-modules/mailer'
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MailerModule.forRootAsync({
    
    useFactory: () => ({
      transport:{
        host: 'localhost',
        port: 3000,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    template: {
      dir: __dirname + '/templates',
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
