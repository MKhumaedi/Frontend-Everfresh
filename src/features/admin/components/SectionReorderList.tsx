import React from 'react';
import { HomeSectionData } from '../../../types/public.js';
import { Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';

interface SectionReorderListProps {
  sections: HomeSectionData[];
  onToggle: (key: string) => void;
  onMove: (idx: number, direction: 'up' | 'down') => void;
}

export const SectionReorderList: React.FC<SectionReorderListProps> = ({
  sections,
  onToggle,
  onMove,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
      <div className="p-4 bg-slate-50 text-xs font-bold text-slate-500 flex justify-between">
        <span>Daftar Komponen Section Landing Page</span>
        <span>Kontrol Urutan & Tampilan</span>
      </div>
      {sections.map((sec, idx) => (
        <div key={sec.sectionKey} className="p-4 flex items-center justify-between hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center font-bold">
              {sec.sortOrder}
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{sec.title || sec.sectionKey}</h4>
              <span className="text-[10px] text-slate-400 font-mono">ID: {sec.sectionKey}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggle(sec.sectionKey)}
              className={`p-1.5 rounded cursor-pointer ${sec.isEnabled ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}
              title={sec.isEnabled ? 'Sembunyikan Section' : 'Tampilkan Section'}
            >
              {sec.isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onMove(idx, 'up')}
              disabled={idx === 0}
              className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer"
              title="Pindah Ke Atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => onMove(idx, 'down')}
              disabled={idx === sections.length - 1}
              className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer"
              title="Pindah Ke Bawah"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
