import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Factory, ShieldCheck, ArrowRight } from 'lucide-react';

const highlights = [
  'Fabrikasi komponen evaporator stainless steel SS304 & SS316 food-grade',
  'Integrasi kompresor orisinal Bitzer (Jerman) dan Danfoss bersertifikat garansi resmi',
  'Pengujian beban ketat (load test) 72 jam non-stop di workshop sebelum pengiriman',
  'Jaminan ketersediaan suku cadang dan teknisi berkualifikasi di seluruh Indonesia',
];

export const AboutSplitSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-100/60 px-3 py-1 rounded-full border border-sky-200">
              Keunggulan Rekayasa & Fabrikasi
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Standar Industri Jerman & Jepang Untuk Keandalan Pabrik Es Anda
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Didirikan dengan fokus khusus pada teknologi pendingin komersial dan rantai dingin maritim,
              EVERFRESH menggabungkan rekayasa mesin modern dengan pemahaman mendalam atas tantangan
              iklim tropis Indonesia.
            </p>

            <div className="space-y-3 pt-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-sm transition-all"
              >
                <span>Pelajari Profil Perusahaan & Fasilitas Workshop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop"
                  alt="Workshop Perakitan & Uji Beban EVERFRESH"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-lg border border-slate-100 max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Garansi Pabrik 12 Bulan</h4>
                    <p className="text-xs text-slate-500">Mencakup suku cadang & servis berkala</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-5 rounded-xl shadow-lg border border-slate-100 max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0B4F8A] flex items-center justify-center shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Workshop Sidoarjo & Cikande</h4>
                    <p className="text-xs text-slate-500">Kapasitas uji beban unit hingga 100 Ton</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
