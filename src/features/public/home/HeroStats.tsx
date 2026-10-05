import React from 'react';
import { ShieldCheck, Clock, Gauge } from 'lucide-react';

export const HeroStats: React.FC = () => {
  return (
    <div className="relative -mb-8 z-20 max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm py-3 px-6 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-[#0B4F8A]" />
          <span>1-30 Ton Kapasitas Harian</span>
        </div>
        <span className="hidden sm:inline text-slate-300">|</span>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0B4F8A]" />
          <span>Layanan Teknisi Siaga 24 Jam</span>
        </div>
        <span className="hidden sm:inline text-slate-300">|</span>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Kompresor Bergaransi Resmi</span>
        </div>
      </div>
    </div>
  );
};
