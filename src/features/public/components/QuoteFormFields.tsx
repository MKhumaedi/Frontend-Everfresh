import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { QuoteFormData } from '../api/publicApi.js';

interface QuoteFormFieldsProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export const QuoteFormFields: React.FC<QuoteFormFieldsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Lengkap *</label>
          <input
            {...register('fullName')}
            placeholder="Contoh: Budi Santoso"
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white"
          />
          {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Perusahaan / Usaha *</label>
          <input
            {...register('companyName')}
            placeholder="Contoh: PT Samudra Makmur"
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white"
          />
          {errors.companyName && <p className="text-xs text-rose-500 mt-1">{errors.companyName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp / No. Telp *</label>
          <input
            {...register('phone')}
            placeholder="Contoh: 08123456789"
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white"
          />
          {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat Email *</label>
          <input
            {...register('email')}
            placeholder="Contoh: budi@company.com"
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white"
          />
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kota / Lokasi Pabrik *</label>
          <input
            {...register('city')}
            placeholder="Contoh: Sidoarjo / Bitung"
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white"
          />
          {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Produk Yang Diminati *</label>
          <select
            {...register('interestedProduct')}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white"
          >
            <option value="Mesin Es Tube">Mesin Es Tube</option>
            <option value="Mesin Es Block Direct Cooling">Mesin Es Block Direct Cooling</option>
            <option value="Mesin Es Flake">Mesin Es Flake</option>
            <option value="Mesin Es Cube">Mesin Es Cube</option>
            <option value="Mesin Es Slurry">Mesin Es Slurry</option>
            <option value="Cold Storage Walk-in">Cold Storage Walk-in</option>
            <option value="Servis / Overhaul">Servis / Overhaul</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Kapasitas Harian</label>
        <input
          {...register('targetCapacity')}
          placeholder="Contoh: 10 Ton / 24 Jam atau Ruang Chiller 50 Ton"
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catatan Kebutuhan Teknis</label>
        <textarea
          {...register('notes')}
          rows={2}
          placeholder="Spesifikasi daya listrik, kondisi debit air, dll."
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white"
        />
      </div>
    </div>
  );
};
