import React from 'react';
import { cn } from '../../lib/utils/cn.js';

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-[10px] border border-[#E3EAF0]">
      <table className={cn('w-full text-left border-collapse text-sm', className)} {...props} />
    </div>
  );
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return <thead className={cn('bg-[#F4F8FB] border-b border-[#E3EAF0]', className)} {...props} />;
};

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return <tbody className={cn('divide-y divide-[#E3EAF0] bg-white', className)} {...props} />;
};

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => {
  return (
    <tr
      className={cn('transition-colors hover:bg-[#F4F8FB]/60 focus:bg-[#F4F8FB]', className)}
      {...props}
    />
  );
};

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return (
    <th
      className={cn(
        'px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#5A6E7F] select-none',
        className
      )}
      {...props}
    />
  );
};

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return <td className={cn('px-4 py-3 text-sm text-[#0F1F2E] align-middle', className)} {...props} />;
};
