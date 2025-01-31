import { SetMetadata } from '@nestjs/common';
import { UserRoles } from './roles';

export const Roles = (...args: UserRoles[]) => SetMetadata('roles', args);
