import React from 'react';
import { cn } from '../../lib/utils/cn.js';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'telemetry' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

const badgeVariants: Record<string, string> = {
  primary: 'bg-[#EBF4FC] text-[#0B4F8A] border border-[#CBD8E2]',
  success: 'bg-[#E8F8F0] text-[#27AE60] border border-[#2ECC71]/30 font-semibold',
  info: 'bg-[#E1F5FE] text-[#0288D1] border border-[#4FC3F7]/40',
  warning: 'bg-[#FEF9E7] text-[#D68910] border border-[#F39C12]/30',
  danger: 'bg-[#FDEDEC] text-[#C0392B] border border-[#E74C3C]/30',
  telemetry: 'bg-[#4FC3F7]/15 text-[#0B4F8A] font-semibold border border-[#4FC3F7]/30',
  neutral: 'bg-[#F4F8FB] text-[#5A6E7F] border border-[#E3EAF0]',
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium tracking-wide rounded-sm',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current shrink-0" />}
      {children}
    </span>
  );
};
