import React from 'react';

interface ResetPasswordModalProps {
  isOpen: boolean;
  newPassword: string;
  onChange: (val: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  newPassword,
  onChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Reset Kata Sandi Pengguna</h3>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi Baru *</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Minimal 8 karakter"
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
            required
          />
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-[#0B4F8A] hover:bg-[#083a66] rounded-lg cursor-pointer">
            Simpan Sandi
          </button>
        </div>
      </form>
    </div>
  );
};
