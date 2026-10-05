import React from 'react';
import { HeroMachineData } from '../../../types/public.js';

interface HeroTabsProps {
  machines: HeroMachineData[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export const HeroTabs: React.FC<HeroTabsProps> = ({
  machines,
  activeIndex,
  onSelect,
}) => {
  return (
    <div className="flex items-center justify-center gap-1.5 pt-3 overflow-x-auto no-scrollbar w-full">
      {machines.map((machine, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={machine.id || machine.key}
            type="button"
            onClick={() => onSelect(idx)}
            className={`px-3.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? 'bg-[#0B4F8A] text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {machine.label || machine.name}
          </button>
        );
      })}
    </div>
  );
};
