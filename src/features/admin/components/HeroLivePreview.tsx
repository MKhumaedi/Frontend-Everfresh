import React, { useState } from 'react';
import { HeroBannerData } from '../../../types/public.js';
import { Monitor, Tablet, Smartphone, Shield, ArrowRight } from 'lucide-react';

interface HeroLivePreviewProps {
  banner: Partial<HeroBannerData>;
}

export const HeroLivePreview: React.FC<HeroLivePreviewProps> = ({ banner }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const containerWidth =
    device === 'mobile' ? 'max-w-[360px]' : device === 'tablet' ? 'max-w-[640px]' : 'w-full';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Live Preview Responsif
        </h4>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`p-1 rounded cursor-pointer ${device === 'desktop' ? 'bg-white shadow-xs text-[#0B4F8A]' : 'text-slate-500'}`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            className={`p-1 rounded cursor-pointer ${device === 'tablet' ? 'bg-white shadow-xs text-[#0B4F8A]' : 'text-slate-500'}`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`p-1 rounded cursor-pointer ${device === 'mobile' ? 'bg-white shadow-xs text-[#0B4F8A]' : 'text-slate-500'}`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-800 rounded-xl flex justify-center overflow-x-auto min-h-[340px]">
        <div className={`${containerWidth} transition-all duration-200 bg-[#0F2840] text-white p-6 rounded-lg space-y-4 border border-slate-700`}>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-950 text-sky-300 text-[10px] font-semibold uppercase">
            <Shield className="w-3 h-3 text-sky-400" />
            <span className="truncate">{banner.badgeText || 'STANDAR INDUSTRI TROPIS'}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold leading-snug line-clamp-3">
            {banner.headline || 'Mesin Es Industri & Cold Storage'}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
            {banner.subheadline || 'Rancang bangun mesin es hemat energi didukung kompresor Bitzer.'}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <div className=" bg-[#00065f] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1">
              <span>{banner.ctaPrimaryText || 'Minta Penawaran'}</span>
              <ArrowRight className="w-3 h-3" />
            </div>
            <div className="bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded">
              <span>{banner.ctaSecondaryText || 'Katalog Mesin'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
