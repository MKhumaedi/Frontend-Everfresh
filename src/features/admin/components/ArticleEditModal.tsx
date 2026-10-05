import React from 'react';
import { ArticleData } from '../../../types/public.js';
import { X } from 'lucide-react';

interface ArticleEditModalProps {
  editing: Partial<ArticleData> | null;
  onClose: () => void;
  onChange: (field: keyof ArticleData, val: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ArticleEditModal: React.FC<ArticleEditModalProps> = ({
  editing,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!editing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <form onSubmit={onSubmit} className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">{editing.id ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h3>
          <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Artikel *</label>
            <input
              value={editing.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori *</label>
              <select
                value={editing.category || ''}
                onChange={(e) => onChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              >
                <option value="Bisnis & Investasi">Bisnis & Investasi</option>
                <option value="Teknologi Mesin">Teknologi Mesin</option>
                <option value="Rantai Dingin">Rantai Dingin</option>
                <option value="Panduan Teknis">Panduan Teknis</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Waktu Baca (Menit)</label>
              <input
                type="number"
                value={editing.readTimeMin || 5}
                onChange={(e) => onChange('readTimeMin', Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Ringkasan / Excerpt *</label>
            <textarea
              rows={2}
              value={editing.excerpt || ''}
              onChange={(e) => onChange('excerpt', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Isi Konten Artikel *</label>
            <textarea
              rows={7}
              value={editing.content || ''}
              onChange={(e) => onChange('content', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-mono text-xs"
              placeholder="Tulis artikel dengan paragraf yang rapi..."
              required
            />
          </div>
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg cursor-pointer">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-[#0B4F8A] hover:bg-[#083a66] rounded-lg cursor-pointer">
            Simpan & Terbitkan
          </button>
        </div>
      </form>
    </div>
  );
};
