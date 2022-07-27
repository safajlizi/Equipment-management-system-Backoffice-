import { UserRoleEnum } from '../../users/entities/user.entity';

export interface JwtPayloadDto {
  id: number;
  username: string;
  role: UserRoleEnum;
  email: string;
}
