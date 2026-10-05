import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  whatsappNumber?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  whatsappNumber = '+628118899721',
}) => {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(
    'Halo EVERFRESH, saya ingin berkonsultasi mengenai spesifikasi mesin es & cold storage industri.'
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${text}`;

  return (
    <aside aria-label="Konsultasi WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi Cepat WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-white" />
        <span className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center whitespace-nowrap bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-md pointer-events-none">
          Konsultasi WhatsApp Sekarang
        </span>
      </a>
    </aside>
  );
};
