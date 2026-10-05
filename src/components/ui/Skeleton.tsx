import React from 'react';
import { cn } from '../../lib/utils/cn.js';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'rounded';
}

const variantStyles: Record<string, string> = {
  rectangular: 'rounded-none',
  circular: 'rounded-full',
  rounded: 'rounded-[10px]',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rounded',
  ...props
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-[#E3EAF0] shrink-0',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};
