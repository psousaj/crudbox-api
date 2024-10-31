import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@common/constants';

export const ROLES_KEY = 'roles';
export const RequiredRoles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
// 
export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
// 

