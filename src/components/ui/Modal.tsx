import React, { useEffect } from 'react';
import { cn } from '../../lib/utils/cn.js';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1F2E]/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full bg-white border border-[#CBD8E2] rounded-[16px] shadow-xl overflow-hidden flex flex-col',
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E3EAF0]">
          <div>
            {title && <h2 className="text-lg font-bold text-[#0F1F2E]">{title}</h2>}
            {description && <p className="text-xs text-[#5A6E7F] mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5A6E7F] hover:text-[#0F1F2E] hover:bg-[#F4F8FB] rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
        {footer && <div className="p-4 px-6 bg-[#F4F8FB] border-t border-[#E3EAF0] flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};
