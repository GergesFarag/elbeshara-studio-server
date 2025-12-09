import { RolesEnum } from '../../../common/enums/roles.enum';

export type JWTPayload = {
  id: string;
  username: string;
  role: RolesEnum;
};
