import { Role } from '../../enums/Role';

export type JwtUser = {
  userId: number;
  role: Role;
};
