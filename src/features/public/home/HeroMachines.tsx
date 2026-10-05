import React from 'react';
import { HeroMachineData } from '../../../types/public.js';
import { HeroTabs } from './HeroTabs.js';

interface HeroMachinesProps {
  machines: HeroMachineData[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function getSecondaryIndices(total: number, active: number) {
  const left = (active - 1 + total) % total;
  const right = (active + 1) % total;
  return { left, right };
}

function renderGroundShadow(widthClass: string) {
  return (
    <div
      className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 h-3.5 ${widthClass} bg-[#0F1F2E]/15 rounded-[50%] blur-sm pointer-events-none`}
    />
  );
}

export const HeroMachines: React.FC<HeroMachinesProps> = ({
  machines,
  activeIndex,
  onSelect,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!machines.length) return null;

  const current = machines[activeIndex];
  const { left, right } = getSecondaryIndices(machines.length, activeIndex);
  const leftMachine = machines[left];
  const rightMachine = machines[right];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative flex flex-col items-center justify-center w-full select-none"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 lg:w-[480px] h-72 sm:h-96 lg:h-[480px] rounded-full bg-[#E1F1FA] -z-10 pointer-events-none" />

      <div className="relative w-full h-64 sm:h-80 lg:h-[370px] flex items-center justify-center">
        {/* Left Secondary Machine (Desktop Only) */}
        <div className="hidden lg:block absolute left-4 bottom-8 w-44 h-48 opacity-60 hover:opacity-90 transition-all duration-300 z-0">
          <img
            src={leftMachine.imageUrl}
            alt={leftMachine.name}
            width={240}
            height={200}
            className="w-full h-full object-contain mix-blend-multiply cursor-pointer filter brightness-95"
            onClick={() => onSelect(left)}
          />
          {renderGroundShadow('w-32')}
        </div>

        {/* Right Secondary Machine (Tablet & Desktop) */}
        <div className="hidden sm:block absolute right-4 bottom-10 w-48 h-52 opacity-65 hover:opacity-90 transition-all duration-300 z-0">
          <img
            src={rightMachine.imageUrl}
            alt={rightMachine.name}
            width={260}
            height={220}
            className="w-full h-full object-contain mix-blend-multiply cursor-pointer filter brightness-95"
            onClick={() => onSelect(right)}
          />
          {renderGroundShadow('w-36')}
        </div>

        {/* Center Main Active Machine */}
        <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] h-full flex flex-col items-center justify-center transition-all duration-300">
          <div className="relative w-full h-[85%] flex items-center justify-center">
            <img
              key={current.id || current.key}
              src={current.imageUrl}
              alt={current.name}
              width={520}
              height={400}
              loading="eager"
              className="w-full h-full object-contain mix-blend-multiply animate-in fade-in duration-300 scale-100"
            />
            {renderGroundShadow('w-3/4')}
          </div>
          <div className="text-center mt-1">
            <span className="text-xs font-bold text-slate-800">{current.name}</span>
            {current.tagline && (
              <span className="text-[11px] text-slate-500 block">{current.tagline}</span>
            )}
          </div>
        </div>
      </div>

      <HeroTabs machines={machines} activeIndex={activeIndex} onSelect={onSelect} />
    </div>
  );
};
