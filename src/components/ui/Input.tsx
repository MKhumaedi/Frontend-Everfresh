import React, { useId } from 'react';
import { cn } from '../../lib/utils/cn.js';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-[#0B4F8A]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && <div className="absolute left-3 text-[#5A6E7F] flex items-center pointer-events-none">{leftIcon}</div>}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-[10px] bg-white text-[#0F1F2E] border border-[#CBD8E2]',
              'placeholder:text-[#8FA2B2] transition-colors',
              'focus:outline-none focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30',
              'disabled:bg-[#F4F8FB] disabled:text-[#8FA2B2] disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-[#E74C3C] focus:border-[#E74C3C] focus:ring-[#E74C3C]/20',
              className
            )}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 text-[#5A6E7F] flex items-center">{rightIcon}</div>}
        </div>
        {error && <p className="text-xs text-[#E74C3C] font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#5A6E7F]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
