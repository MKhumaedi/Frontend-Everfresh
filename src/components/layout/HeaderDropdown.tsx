import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
}

interface HeaderDropdownProps {
  label: string;
  items: DropdownItem[];
  baseHref?: string;
}

export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  label,
  items,
  baseHref,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-sm font-medium text-[#2C3E50] hover:text-[#0B4F8A] py-2 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0B4F8A]' : 'text-slate-400'
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="group flex flex-col px-4 py-2 hover:bg-[#F4F8FB] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800 group-hover:text-[#0B4F8A]">
                  {item.name}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && (
                <span className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
          {baseHref && (
            <div className="border-t border-slate-100 mt-1 pt-1.5 px-4">
              <Link
                to={baseHref}
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-[#0B4F8A] hover:underline"
              >
                Lihat Semua {label} &rarr;
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
