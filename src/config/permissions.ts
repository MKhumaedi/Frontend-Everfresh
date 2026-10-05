export type AppRole = 'ADMIN' | 'SUPERADMIN';

export const Permissions = {
  // Content management
  MANAGE_CONTENT: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  ARCHIVE_CONTENT: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  HARD_DELETE_CONTENT: ['SUPERADMIN'] as AppRole[],

  // Leads & Quotes
  MANAGE_QUOTES: ['ADMIN', 'SUPERADMIN'] as AppRole[],

  // Superadmin exclusive
  MANAGE_USERS: ['SUPERADMIN'] as AppRole[],
  MANAGE_SETTINGS: ['SUPERADMIN'] as AppRole[],
  MANAGE_OFFICES: ['SUPERADMIN'] as AppRole[],
  MANAGE_FEATURE_FLAGS: ['SUPERADMIN'] as AppRole[],
  VIEW_ACTIVITY_LOGS: ['SUPERADMIN'] as AppRole[],
} as const;

export function hasPermission(role?: string | null, allowedRoles: AppRole[] = []): boolean {
  if (!role) return false;
  return allowedRoles.includes(role as AppRole);
}

export function canHardDelete(role?: string | null): boolean {
  return role === 'SUPERADMIN';
}

export function canManageUsers(role?: string | null): boolean {
  return role === 'SUPERADMIN';
}

export function canAccessSettings(role?: string | null): boolean {
  return role === 'SUPERADMIN';
}
