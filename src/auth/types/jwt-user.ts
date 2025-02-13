import { Role } from '../../enums/Role.js';

export type JwtUser = {
  userId: number;
  role: Role;
};
