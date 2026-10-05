import React from 'react';
import { Wrench } from 'lucide-react';
import { EverfreshLogo } from '../../components/ui/EverfreshLogo.js';

export const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex justify-center">
          <EverfreshLogo size="md" />
        </div>
        <div className="w-14 h-14 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-center mx-auto text-[#0B4F8A]">
          <Wrench className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Situs Sedang Dalam Pemeliharaan</h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          Kami sedang melakukan pembaruan berkala pada sistem katalog teknis dan telemetri pendingin. Layanan akan segera kembali beroperasi normal.
        </p>
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Hotline Teknisi Darurat 24 Jam: <a href="tel:+622189904120" className="text-[#0B4F8A] font-bold">+62 21 8990 4120</a>
        </div>
      </div>
    </div>
  );
};
export default MaintenancePage;
