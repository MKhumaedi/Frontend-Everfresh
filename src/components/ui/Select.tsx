import React, { useId } from 'react';
import { cn } from '../../lib/utils/cn.js';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, placeholder, id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wider text-[#0B4F8A]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full min-h-[44px] appearance-none px-3.5 pr-10 py-2.5 text-sm rounded-[10px] bg-white text-[#0F1F2E] border border-[#CBD8E2]',
              'transition-colors cursor-pointer',
              'focus:outline-none focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30',
              'disabled:bg-[#F4F8FB] disabled:cursor-not-allowed',
              error && 'border-[#E74C3C] focus:border-[#E74C3C] focus:ring-[#E74C3C]/20',
              className
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#5A6E7F] absolute right-3 pointer-events-none" />
        </div>
        {error && <p className="text-xs text-[#E74C3C] font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#5A6E7F]">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
