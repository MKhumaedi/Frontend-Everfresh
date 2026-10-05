import React from 'react';
import { ProjectData } from '../../../types/public.js';
import { X } from 'lucide-react';

interface ProjectEditModalProps {
  editing: Partial<ProjectData> | null;
  onClose: () => void;
  onChange: (field: keyof ProjectData, val: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  editing,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!editing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <form onSubmit={onSubmit} className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">{editing.id ? 'Edit Proyek' : 'Tambah Proyek Baru'}</h3>
          <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Proyek *</label>
            <input
              value={editing.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Klien *</label>
              <input
                value={editing.clientName || ''}
                onChange={(e) => onChange('clientName', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Lokasi Instalasi *</label>
              <input
                value={editing.location || ''}
                onChange={(e) => onChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Kapasitas Unit</label>
            <input
              value={editing.capacity || ''}
              onChange={(e) => onChange('capacity', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Ringkasan Studi Kasus</label>
            <textarea
              rows={3}
              value={editing.summary || ''}
              onChange={(e) => { onChange('summary', e.target.value); onChange('description', e.target.value); }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
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
