import React, { useState } from 'react';
import {
  useAdminUsers,
  useCreateUser,
  useUpdateUserRoleActive,
  useResetPassword,
} from './api/usersApi.js';
import { useAuth } from '../auth/AuthContext.js';
import { CreateUserModal } from './components/CreateUserModal.js';
import { ResetPasswordModal } from './components/ResetPasswordModal.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { useToast } from '../../hooks/useToast.js';
import { Plus, Key, Shield } from 'lucide-react';

export const UsersAdminPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();
  const { data: users = [], isLoading } = useAdminUsers();
  const createUser = useCreateUser();
  const updateRole = useUpdateUserRoleActive();
  const resetPass = useResetPassword();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'SUPERADMIN';
  }>({ name: '', email: '', password: '', role: 'ADMIN' });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser.mutateAsync(newUser);
      showToast({ type: 'success', title: 'Pengguna baru berhasil dibuat' });
      setIsCreateOpen(false);
      setNewUser({ name: '', email: '', password: '', role: 'ADMIN' });
    } catch (err: any) {
      showToast({ type: 'error', title: err.message || 'Gagal membuat pengguna' });
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetUserId || !newPassword) return;
    try {
      await resetPass.mutateAsync({ id: resetUserId, newPassword });
      showToast({ type: 'success', title: 'Kata sandi berhasil diatur ulang' });
      setResetUserId(null);
      setNewPassword('');
    } catch (err: any) {
      showToast({ type: 'error', title: err.message || 'Gagal mengatur ulang kata sandi' });
    }
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Pengguna & Hak Akses - CMS Admin" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Pengguna & Hak Akses</h1>
          <p className="text-xs text-slate-500">Khusus SUPERADMIN: kelola akun staf internal, peran ADMIN dan SUPERADMIN.</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengguna</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-xs animate-pulse">Memuat pengguna...</div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Nama Pengguna</th>
                <th className="p-4">Email</th>
                <th className="p-4">Peran</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                const isSelf = u.id === currentUser?.id;
                return (
                  <tr key={u.id} className="hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <span>{u.name}</span>
                      {isSelf && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-100 text-[#0B4F8A]">
                          Anda
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600 font-mono">{u.email}</td>
                    <td className="p-4">
                      <select
                        value={u.role}
                        disabled={isSelf}
                        onChange={(e) => updateRole.mutate({ id: u.id, role: e.target.value })}
                        className="text-xs font-semibold border border-slate-200 rounded px-2 py-1 bg-slate-50 disabled:opacity-50"
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUPERADMIN">SUPERADMIN</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button
                        disabled={isSelf}
                        onClick={() => updateRole.mutate({ id: u.id, isActive: !u.isActive })}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer disabled:opacity-40 ${
                          u.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {u.isActive ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setResetUserId(u.id)}
                        className="px-2 py-1 text-[11px] text-slate-600 hover:text-[#0B4F8A] hover:bg-sky-50 rounded cursor-pointer inline-flex items-center gap-1"
                      >
                        <Key className="w-3 h-3" />
                        <span>Reset Sandi</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <CreateUserModal
        isOpen={isCreateOpen}
        newUser={newUser}
        onClose={() => setIsCreateOpen(false)}
        onChange={(field, val) => setNewUser((p) => ({ ...p, [field]: val }))}
        onSubmit={handleCreate}
      />

      <ResetPasswordModal
        isOpen={!!resetUserId}
        newPassword={newPassword}
        onChange={setNewPassword}
        onClose={() => setResetUserId(null)}
        onSubmit={handleReset}
      />
    </div>
  );
};
export default UsersAdminPage;
