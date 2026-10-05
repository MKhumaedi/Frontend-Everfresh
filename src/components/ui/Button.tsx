import React from 'react';
import { cn } from '../../lib/utils/cn.js';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: 'bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold shadow-none border border-transparent',
  secondary: 'bg-[#0B4F8A] hover:bg-[#083C68] text-white font-semibold shadow-none border border-transparent',
  outline: 'bg-white hover:bg-[#F4F8FB] text-[#0B4F8A] border border-[#CBD8E2] hover:border-[#4FC3F7]',
  ghost: 'bg-transparent hover:bg-[#EBF4FC] text-[#0B4F8A]',
  danger: 'bg-[#E74C3C] hover:bg-[#C0392B] text-white border border-transparent',
};

const sizeStyles: Record<string, string> = {
  sm: 'min-h-[36px] px-3 py-1.5 text-xs rounded-sm gap-1.5',
  md: 'min-h-[44px] px-4 py-2 text-sm rounded-[10px] gap-2',
  lg: 'min-h-[48px] px-6 py-3 text-base rounded-[12px] gap-2.5',
};

function renderContent(isLoading: boolean, leftIcon?: React.ReactNode, rightIcon?: React.ReactNode, children?: React.ReactNode) {
  if (isLoading) {
    return (
      <>
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Memproses...</span>
      </>
    );
  }
  return (
    <>
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-colors cursor-pointer select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3F7] focus-visible:ring-offset-1',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {renderContent(isLoading, leftIcon, rightIcon, children)}
      </button>
    );
  }
);

Button.displayName = 'Button';
