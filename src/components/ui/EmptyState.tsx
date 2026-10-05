import React from 'react';
import { cn } from '../../lib/utils/cn.js';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center bg-white rounded-[12px] border border-dashed border-[#CBD8E2]',
        className
      )}
    >
      <div className="w-12 h-12 mb-3 rounded-full bg-[#EBF4FC] flex items-center justify-center text-[#0B4F8A]">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h4 className="text-base font-semibold text-[#0F1F2E]">{title}</h4>
      {description && <p className="text-sm text-[#5A6E7F] mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
