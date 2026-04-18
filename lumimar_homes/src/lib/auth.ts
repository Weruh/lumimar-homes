import type { AppRole } from './database.types';

export const OWNER_ROLES: AppRole[] = ['owner', 'admin'];
export const INTERNAL_ROLES: AppRole[] = ['staff', 'admin'];

export function getDefaultRouteForRole(role: AppRole | null) {
  if (role === 'staff' || role === 'admin') {
    return '/internal/dashboard';
  }

  return '/owner/dashboard';
}

export function isRoleAllowed(role: AppRole | null, allowedRoles: readonly AppRole[]) {
  return role !== null && allowedRoles.includes(role);
}
