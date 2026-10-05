import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface CtaBannerProps {
  whatsappNumber?: string;
  phone?: string;
}

export const CtaBannerSection: React.FC<CtaBannerProps> = ({
  whatsappNumber = '+628118899721',
  phone = '+622189904120',
}) => {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Halo EVERFRESH, saya ingin konsultasi kebutuhan tonase mesin es / cold storage.'
  )}`;

  return (
    <section className="bg-gradient-to-r from-[#0B4F8A] to-[#0A2540] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Konsultasi Teknis & Penawaran Tanpa Biaya</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Siap Meningkatkan Kapasitas Produksi Es & Rantai Dingin Bisnis Anda?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Diskusikan kapasitas target tonase, kebutuhan suhu pendinginan, serta ketersediaan daya listrik
              bersama insinyur refrigerasi kami hari ini.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2  bg-[#00065f] hover:bg-[#055096] text-white font-semibold px-6 py-3.5 rounded-lg shadow-md transition-all text-sm"
            >
              <span>Minta Penawaran Spesifikasi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 py-3.5 rounded-lg transition-all text-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Insinyur</span>
            </a>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-4 py-3.5 rounded-lg transition-all text-sm"
            >
              <Phone className="w-4 h-4 text-sky-300" />
              <span>Telepon Kantor</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
