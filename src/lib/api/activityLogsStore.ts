export interface ActivityLogEntry {
  id: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
  user?: { id: string; name: string; email: string; role: string };
}

const defaultLogs: ActivityLogEntry[] = [
  { id: 'log-1', action: 'LOGIN', targetType: 'AUTH', ipAddress: '127.0.0.1', createdAt: new Date(Date.now() - 3600000).toISOString(), user: { id: 'u-1', name: 'Super Administrator', email: 'superadmin@everfresh.id', role: 'SUPERADMIN' } },
  { id: 'log-2', action: 'UPDATE_SECTION', targetType: 'HOME_SECTION', details: { sectionKey: 'hero', isEnabled: true }, createdAt: new Date(Date.now() - 7200000).toISOString(), user: { id: 'u-1', name: 'Super Administrator', email: 'superadmin@everfresh.id', role: 'SUPERADMIN' } },
  { id: 'log-3', action: 'CREATE_USER', targetType: 'USER', details: { email: 'staff.teknik@everfresh.id', role: 'ADMIN' }, createdAt: new Date(Date.now() - 86400000).toISOString(), user: { id: 'u-1', name: 'Super Administrator', email: 'superadmin@everfresh.id', role: 'SUPERADMIN' } },
];

export const activityLogsStore = {
  list(action?: string): { items: ActivityLogEntry[]; total: number } {
    const raw = localStorage.getItem('ef_activity_logs');
    const logs: ActivityLogEntry[] = raw ? JSON.parse(raw) : defaultLogs;
    const filtered = action ? logs.filter((l) => l.action.includes(action.toUpperCase())) : logs;
    return { items: filtered, total: filtered.length };
  },
  add(entry: Omit<ActivityLogEntry, 'id' | 'createdAt'>): void {
    const raw = localStorage.getItem('ef_activity_logs');
    const logs: ActivityLogEntry[] = raw ? JSON.parse(raw) : defaultLogs;
    const newEntry: ActivityLogEntry = { ...entry, id: `log-${Date.now()}`, createdAt: new Date().toISOString() };
    localStorage.setItem('ef_activity_logs', JSON.stringify([newEntry, ...logs]));
  },
};
