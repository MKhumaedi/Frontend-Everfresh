import React from 'react';
import logoAsset from '@/assets/Logo EverFresh.png';
interface EverfreshLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

function getDimensions(size: 'sm' | 'md' | 'lg') {
  if (size === 'sm') return { w: 120, h: 36, scale: 0.8 };
  if (size === 'lg') return { w: 195, h: 60, scale: 1.3 };
  return { w: 157, h: 48, scale: 1 };
}

export const EverfreshLogo: React.FC<EverfreshLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
}) => {
  const { w, h } = getDimensions(size);

  return (
    <img
      src={logoAsset}
      width={w}
      height={h}
      className={className}
      alt="EVERFRESH INDUSTRIAL ICE & COLD STORAGE"
      style={{ objectFit: 'contain' }}
    />
  );
};