import React from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';

interface QuoteSuccessCardProps {
  quoteNumber: string;
  cleanPhone: string;
  onReset: () => void;
}

export const QuoteSuccessCard: React.FC<QuoteSuccessCardProps> = ({
  quoteNumber,
  cleanPhone,
  onReset,
}) => {
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Halo EVERFRESH, saya telah mengirim formulir penawaran dengan nomor ${quoteNumber}`
  )}`;

  return (
    <div className="text-center py-10 space-y-4">
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900">Penawaran Berhasil Dikirim!</h3>
      <p className="text-sm text-slate-600 max-w-md mx-auto">
        Nomor Permintaan: <span className="font-mono font-bold text-[#0B4F8A]">{quoteNumber}</span>.
        Insinyur kami akan menghubungi Anda dalam 1x24 jam kerja.
      </p>
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Konfirmasi Langsung via WhatsApp</span>
        </a>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
        >
          Kirim Formulir Lain
        </button>
      </div>
    </div>
  );
};
