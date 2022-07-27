import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateAvatarUserDto extends PartialType(CreateUserDto) {
  sourceimg: string;
}
