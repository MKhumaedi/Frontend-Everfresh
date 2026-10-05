import React from 'react';
import { X } from 'lucide-react';

interface CreateUserModalProps {
  isOpen: boolean;
  newUser: { name: string; email: string; password: string; role: 'ADMIN' | 'SUPERADMIN' };
  onClose: () => void;
  onChange: (field: string, val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  newUser,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Tambah Akun Pengguna</h3>
          <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
            <input
              value={newUser.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email *</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Peran Otorisasi *</label>
              <select
                value={newUser.role}
                onChange={(e) => onChange('role', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="SUPERADMIN">SUPERADMIN</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kata Sandi Awal *</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => onChange('password', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
                required
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            * Pengguna baru diwajibkan mengganti kata sandi pada saat pertama kali masuk ke sistem.
          </p>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-[#0B4F8A] hover:bg-[#083a66] rounded-lg cursor-pointer">
            Buat Akun
          </button>
        </div>
      </form>
    </div>
  );
};
