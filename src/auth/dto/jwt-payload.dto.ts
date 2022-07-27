import { UserRoleEnum } from '../../users/entities/user.entity';

export interface JwtPayloadDto {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  role: UserRoleEnum;
  email: string;
}
