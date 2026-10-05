import React from 'react';
import { TestimonialData } from '../../../types/public.js';
import { X } from 'lucide-react';

interface TestimonialEditModalProps {
  editing: Partial<TestimonialData> | null;
  onClose: () => void;
  onChange: (field: keyof TestimonialData, val: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TestimonialEditModal: React.FC<TestimonialEditModalProps> = ({
  editing,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!editing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">{editing.id ? 'Edit Testimoni' : 'Tambah Testimoni'}</h3>
          <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Klien *</label>
            <input
              value={editing.clientName || ''}
              onChange={(e) => onChange('clientName', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Perusahaan *</label>
              <input
                value={editing.company || ''}
                onChange={(e) => onChange('company', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Jabatan *</label>
              <input
                value={editing.role || ''}
                onChange={(e) => onChange('role', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Isi Kutipan Ulasan *</label>
            <textarea
              rows={4}
              value={editing.content || ''}
              onChange={(e) => onChange('content', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-[#0B4F8A] hover:bg-[#083a66] rounded-lg cursor-pointer">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};
