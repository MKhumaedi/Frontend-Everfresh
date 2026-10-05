import React from 'react';
import { HeroBannerData, HeroMachineData } from '../../../types/public.js';
import { HeroContent } from './HeroContent.js';
import { HeroMachines } from './HeroMachines.js';
import { HeroStats } from './HeroStats.js';
import { useHeroRotation } from './useHeroRotation.js';
import { defaultHeroMachines } from './hero.config.js';

interface HeroSectionProps {
  banner?: HeroBannerData | null;
  machines?: HeroMachineData[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ banner, machines }) => {
  const activeMachines =
    machines && machines.length > 0
      ? machines.filter((m) => m.isActive)
      : defaultHeroMachines;

  const {
    activeIndex,
    setActiveIndex,
    handleMouseEnter,
    handleMouseLeave,
  } = useHeroRotation(activeMachines.length, 6000);

  return (
    <section className="relative bg-[#F4F8FB] pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div className="lg:col-span-5 z-10">
            <HeroContent banner={banner} />
          </div>

          <div className="lg:col-span-7 z-10">
            <HeroMachines
              machines={activeMachines}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>

      <HeroStats />
    </section>
  );
};
export default HeroSection;
