import React from 'react';
import { ProductData, CategoryData } from '../../../types/public.js';

interface ProductEditSpecsGridProps {
  formData: Partial<ProductData>;
  categories: CategoryData[];
  onChange: (field: keyof ProductData, val: any) => void;
}

export const ProductEditSpecsGrid: React.FC<ProductEditSpecsGridProps> = ({
  formData,
  categories,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Mesin *</label>
        <input
          value={formData.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Contoh: Mesin Es Tube 10 Ton / 24 Jam"
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori Mesin *</label>
        <select
          value={formData.categoryId || ''}
          onChange={(e) => onChange('categoryId', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kapasitas (Ton/Hari)</label>
        <input
          type="number"
          value={formData.capacityTons || 0}
          onChange={(e) => onChange('capacityTons', Number(e.target.value))}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Merk Kompresor</label>
        <input
          value={formData.compressorBrand || ''}
          onChange={(e) => onChange('compressorBrand', e.target.value)}
          placeholder="Bitzer Semi-Hermetic"
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Konsumsi Daya (kW)</label>
        <input
          type="number"
          value={formData.powerKw || 0}
          onChange={(e) => onChange('powerKw', Number(e.target.value))}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
        />
      </div>
      <div className="col-span-2">
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline</label>
        <input
          value={formData.tagline || ''}
          onChange={(e) => onChange('tagline', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
        />
      </div>
      <div className="col-span-2">
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Lengkap</label>
        <textarea
          rows={3}
          value={formData.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
        />
      </div>
    </div>
  );
};
