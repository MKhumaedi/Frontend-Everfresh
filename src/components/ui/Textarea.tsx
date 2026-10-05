import React, { useId } from 'react';
import { cn } from '../../lib/utils/cn.js';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-semibold uppercase tracking-wider text-[#0B4F8A]">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm rounded-[10px] bg-white text-[#0F1F2E] border border-[#CBD8E2]',
            'placeholder:text-[#8FA2B2] transition-colors resize-y min-h-[90px]',
            'focus:outline-none focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30',
            'disabled:bg-[#F4F8FB] disabled:cursor-not-allowed',
            error && 'border-[#E74C3C] focus:border-[#E74C3C] focus:ring-[#E74C3C]/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#E74C3C] font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#5A6E7F]">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
