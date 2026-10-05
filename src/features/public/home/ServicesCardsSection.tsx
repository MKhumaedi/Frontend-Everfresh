import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, Warehouse, Wrench, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Factory,
    title: 'Fabrikasi Mesin Es Kustom',
    desc: 'Perakitan mesin es tube, flake, dan balok direct cooling dari kapasitas 1 ton hingga 100 ton per hari, disesuaikan dengan debit air dan daya PLN pelanggan.',
    slug: 'fabrikasi-mesin-es-kustom',
  },
  {
    icon: Warehouse,
    title: 'Rancang Bangun Cold Storage',
    desc: 'Konstruksi gudang beku modular Chiller (+2°C s/d +8°C) dan Freezer (-20°C s/d -40°C) dengan panel polyurethane densitas tinggi dan sistem refrigerasi Bitzer ganda.',
    slug: 'instalasi-ruang-cold-storage',
  },
  {
    icon: Wrench,
    title: 'Pemeliharaan Rutin & Overhaul',
    desc: 'Kontrak servis berkala, pengisian freon, pembersihan kondensor, hingga perbaikan kompresor berat dengan jaminan teknisi bersertifikat dan suku cadang orisinal.',
    slug: 'servis-berkala-overhaul-kompresor',
  },
];

export const ServicesCardsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Layanan Rekayasa Turnkey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Solusi Menyeluruh Dari Perencanaan Hingga Pemeliharaan
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Kami mendampingi setiap tahap investasi fasilitas pendingin Anda, mulai dari studi kelayakan
            kapasitas tonase hingga dukungan teknis pasca-instalasi di lokasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.slug}
                className="group flex flex-col justify-between p-8 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0B4F8A]/40 hover:shadow-xl transition-all duration-200"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-sky-100/80 group-hover:bg-[#0B4F8A] group-hover:text-white text-[#0B4F8A] flex items-center justify-center transition-colors mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0B4F8A] transition-colors mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-200/80">
                  <Link
                    to={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0B4F8A] group-hover:text-[#083a66]"
                  >
                    <span>Detail Layanan & Lingkup Kerja</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
