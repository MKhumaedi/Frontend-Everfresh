import React, { useState, useCallback } from 'react';
import { ToastContext, ToastItem, ToastType } from '../../hooks/useToast.js';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils/cn.js';

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-[#27AE60]" />,
  error: <AlertCircle className="w-5 h-5 text-[#C0392B]" />,
  info: <Info className="w-5 h-5 text-[#0288D1]" />,
  warning: <AlertTriangle className="w-5 h-5 text-[#D68910]" />,
};

interface ToastCardProps {
  item: ToastItem;
  onClose: (id: string) => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ item, onClose }) => {
  return (
    <div
      role="status"
      className="flex items-start gap-3 p-4 bg-white border border-[#CBD8E2] rounded-[12px] shadow-lg max-w-sm w-full pointer-events-auto"
    >
      <span className="shrink-0 mt-0.5">{icons[item.type]}</span>
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-semibold text-[#0F1F2E]">{item.title}</h5>
        {item.message && <p className="text-xs text-[#5A6E7F] mt-0.5">{item.message}</p>}
      </div>
      <button
        onClick={() => onClose(item.id)}
        className="p-1 text-[#8FA2B2] hover:text-[#0F1F2E] rounded cursor-pointer"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => removeToast(id), toast.durationMs || 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} item={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
