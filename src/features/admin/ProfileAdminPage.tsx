import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext.js';
import { apiClient } from '../../lib/api/client.js';
import { useToast } from '../../hooks/useToast.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { KeyRound, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ProfileAdminPage: React.FC = () => {
  const { user, updateCurrentUser } = useAuth();
  const { showToast } = useToast();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      return showToast({ type: 'error', title: 'Kata sandi baru minimal 8 karakter' });
    }
    if (newPassword !== confirmPassword) {
      return showToast({ type: 'error', title: 'Konfirmasi kata sandi tidak cocok' });
    }

    setIsPending(true);
    try {
      await apiClient('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      updateCurrentUser({ mustChangePassword: false });
      showToast({ type: 'success', title: 'Kata sandi berhasil diperbarui' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast({ type: 'error', title: err.message || 'Gagal mengubah kata sandi' });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <SEOHead title="Profil Saya & Keamanan Akun - CMS Admin" />
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Profil Saya & Keamanan</h1>
        <p className="text-xs text-slate-500">Kelola informasi akun staf dan perbarui kata sandi Anda.</p>
      </div>

      {user?.mustChangePassword && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <span className="font-bold block">Peringatan: Perubahan Kata Sandi Diperlukan</span>
            Akun Anda baru saja dibuat atau diatur ulang. Mohon segera buat kata sandi baru untuk mengamankan akun Anda.
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Informasi Pengguna</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Nama Staf</span>
            <span className="font-bold text-slate-800">{user?.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Email Perusahaan</span>
            <span className="font-bold text-slate-800">{user?.email}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Peran / Otorisasi</span>
            <span className="inline-flex items-center gap-1 font-bold text-[#0B4F8A]">
              <Shield className="w-3.5 h-3.5" />
              <span>{user?.role}</span>
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Departemen</span>
            <span className="font-medium text-slate-700">{user?.department || 'Operasional'}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#0B4F8A]" />
          <span>Ganti Kata Sandi</span>
        </h3>

        {!user?.mustChangePassword && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi Saat Ini</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi Baru (Min. 8 Karakter)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Kata Sandi Baru</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isPending ? 'Menyimpan...' : 'Perbarui Kata Sandi Saya'}</span>
        </button>
      </form>
    </div>
  );
};
export default ProfileAdminPage;
