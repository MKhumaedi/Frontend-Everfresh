import React from 'react';
import { Link } from 'react-router-dom';
import { usePublicServices } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ServiceData } from '../../types/public.js';
import { Factory, Warehouse, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';

function getServiceIcon(slug: string) {
  if (slug.includes('cold-storage')) return <Warehouse className="w-8 h-8 text-[#0B4F8A]" />;
  if (slug.includes('overhaul') || slug.includes('servis')) return <Wrench className="w-8 h-8 text-[#0B4F8A]" />;
  return <Factory className="w-8 h-8 text-[#0B4F8A]" />;
}

function renderServiceCard(srv: ServiceData) {
  return (
    <div
      key={srv.id || srv.slug}
      className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="w-16 h-16 rounded-xl bg-sky-50 flex items-center justify-center mb-6">
          {getServiceIcon(srv.slug)}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{srv.title}</h3>
        {srv.tagline && <p className="text-xs font-semibold text-[#0B4F8A] mb-4">{srv.tagline}</p>}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">{srv.description}</p>

        {srv.features && (
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            {srv.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/services/${srv.slug}`}
          className="text-xs font-bold text-[#0B4F8A] hover:underline flex items-center gap-1"
        >
          <span>Pelajari Lingkup Prosedur</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/quote"
          className="bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Konsultasi
        </Link>
      </div>
    </div>
  );
}

export const ServicesPage: React.FC = () => {
  const { data: services = [], isLoading } = usePublicServices();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEOHead
        title="Layanan Rekayasa & Fabrikasi Mesin Pendingin"
        description="Jasa perakitan mesin es custom, rancang bangun cold storage freezer, dan overhaul kompresor Bitzer bergaransi."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Keahlian Rekayasa Termal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Layanan Rancang Bangun & Pemeliharaan Cold Chain
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Didukung fasilitas bengkel uji beban bersertifikasi dan tim teknisi pendingin berlisensi
            yang siap melayani instalasi di seluruh wilayah Indonesia.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-slate-200 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(renderServiceCard)}
          </div>
        )}
      </div>
    </div>
  );
};
export default ServicesPage;
