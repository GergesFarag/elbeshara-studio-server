import { OmitType } from '@nestjs/mapped-types';
import { Admin } from '../schemas/admin.schema';

export class CreateAdminDto extends OmitType(Admin, [
  'isSuperAdmin',
] as const) {}
