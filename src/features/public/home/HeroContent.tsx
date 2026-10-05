import React from 'react';
import { Link } from 'react-router-dom';
import { HeroBannerData } from '../../../types/public.js';
import { ArrowRight } from 'lucide-react';

interface HeroContentProps {
  banner?: HeroBannerData | null;
}

export const HeroContent: React.FC<HeroContentProps> = ({ banner }) => {
  const headline = banner?.headline || 'Mesin Es Industri yang Andal, Produksi Tanpa Henti.';
  const subheadline =
    banner?.subheadline ||
    'Rancang bangun mesin es Tube, Block, Flake, dan Cold Room hemat energi dengan kompresor Bitzer & garansi resmi teknisi 24 jam.';
  const label = banner?.badgeText || 'MESIN ES & COLD ROOM';

  return (
    <div className="flex flex-col items-start text-left space-y-5 lg:pr-6">
      <span className="text-[11px] font-bold text-[#0B4F8A] uppercase tracking-widest bg-[#E1F1FA] px-3 py-1 rounded-md">
        {label}
      </span>

      <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F1F2E] tracking-tight leading-[1.15]">
        {headline}
      </h1>

      <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
        {subheadline}
      </p>

      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <Link
          to={banner?.ctaPrimaryLink || '/quote'}
          className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <span>{banner?.ctaPrimaryText || 'Minta Penawaran'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={banner?.ctaSecondaryLink || '/products'}
          className="text-center inline-flex items-center justify-center gap-1.5 text-slate-700 hover:text-[#0B4F8A] text-sm font-semibold px-4 py-3 transition-colors cursor-pointer"
        >
          <span>Lihat Produk &rarr;</span>
        </Link>
      </div>
    </div>
  );
};
