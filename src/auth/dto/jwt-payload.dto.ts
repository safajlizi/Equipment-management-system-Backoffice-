import { UserRoleEnum } from '../../users/entities/user.entity';

export interface JwtPayloadDto {
  id: string;
  username: string;
  role: UserRoleEnum;
  email: string;
}
