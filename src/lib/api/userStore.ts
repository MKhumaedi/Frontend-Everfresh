import { AdminUserData } from '../../features/admin/api/usersApi.js';

const defaultUsers: AdminUserData[] = [
  { id: 'u-super', name: 'Super Administrator', email: 'superadmin@everfresh.id', role: 'SUPERADMIN', isActive: true, mustChangePassword: false, department: 'Direksi & Rekayasa Teknik', createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
  { id: 'u-admin', name: 'Staff Administrasi', email: 'admin@everfresh.id', role: 'ADMIN', isActive: true, mustChangePassword: false, department: 'Operasional & Leads', createdAt: new Date(Date.now() - 15 * 86400000).toISOString() },
];

const STORAGE_KEY = 'ef_users';

export const userStore = {
  list(): AdminUserData[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultUsers;
  },
  create(data: any): AdminUserData {
    const current = this.list();
    const newUser: AdminUserData = {
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role || 'ADMIN',
      isActive: true,
      mustChangePassword: true,
      department: data.department || 'Operasional',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newUser, ...current]));
    return newUser;
  },
  update(id: string, data: any, actorId?: string): AdminUserData {
    const current = this.list();
    const target = current.find((u) => u.id === id);
    if (!target) throw new Error('Pengguna tidak ditemukan');
    if (id === actorId) {
      if (data.role && data.role !== target.role) throw new Error('Anda tidak dapat mengubah peran akun Anda sendiri');
      if (data.isActive === false) throw new Error('Anda tidak dapat menonaktifkan akun Anda sendiri');
    }
    if (target.role === 'SUPERADMIN' && (data.role === 'ADMIN' || data.isActive === false)) {
      const activeSuperCount = current.filter((u) => u.role === 'SUPERADMIN' && u.isActive).length;
      if (activeSuperCount <= 1) throw new Error('SUPERADMIN aktif terakhir tidak dapat diturunkan perannya atau dinonaktifkan');
    }
    const updated = { ...target, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current.map((u) => (u.id === id ? updated : u))));
    return updated;
  },
};
