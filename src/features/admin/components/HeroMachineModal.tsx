import React from 'react';
import { HeroMachineData } from '../../../types/public.js';
import { X, Upload } from 'lucide-react';

interface HeroMachineModalProps {
  editing: Partial<HeroMachineData> | null;
  onClose: () => void;
  onChange: (field: keyof HeroMachineData, val: any) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const HeroMachineModal: React.FC<HeroMachineModalProps> = ({
  editing,
  onClose,
  onChange,
  onFileUpload,
  onSubmit,
}) => {
  if (!editing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            {editing.id ? 'Edit Unit Mesin Hero' : 'Tambah Unit Mesin'}
          </h3>
          <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Mesin *</label>
            <input
              value={editing.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Contoh: Mesin Es Tube 10 Ton"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Label Tab *</label>
              <input
                value={editing.label || ''}
                onChange={(e) => {
                  onChange('label', e.target.value);
                  onChange('key', e.target.value.toLowerCase());
                }}
                placeholder="Contoh: Tube"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tagline Kapasitas</label>
              <input
                value={editing.tagline || ''}
                onChange={(e) => onChange('tagline', e.target.value)}
                placeholder="Contoh: 1-30 Ton / 24 Jam"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Foto Mesin (Latar Putih/Transparan) *</label>
            <input
              value={editing.imageUrl || ''}
              onChange={(e) => onChange('imageUrl', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white mb-2"
              required
            />
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Unggah File Foto</span>
              <input type="file" accept="image/*" onChange={onFileUpload} className="hidden" />
            </label>
          </div>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-[#0B4F8A] hover:bg-[#083a66] rounded-lg cursor-pointer">
            Simpan Mesin
          </button>
        </div>
      </form>
    </div>
  );
};
