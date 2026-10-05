import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePublicServices } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { CheckCircle2, Shield, Wrench, ArrowRight } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data: services = [], isLoading } = usePublicServices();
  const service = services.find((s) => s.slug === slug);

  if (isLoading) return <div className="py-24 text-center text-slate-500 animate-pulse">Memuat rincian layanan...</div>;
  if (!service) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-900">Layanan Tidak Ditemukan</h2>
        <Link to="/services" className="mt-4 inline-block text-sm text-[#0B4F8A] font-semibold underline">
          &larr; Kembali ke Daftar Layanan
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEOHead title={service.title} description={service.description} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-800">Beranda</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-slate-800">Layanan</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{service.title}</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-md border border-sky-200">
              Layanan Rekayasa Terintegrasi
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              {service.title}
            </h1>
            {service.tagline && (
              <p className="text-base font-semibold text-[#0B4F8A] mt-2">{service.tagline}</p>
            )}
          </div>

          <div className="rounded-xl overflow-hidden h-72 sm:h-96 bg-slate-100">
            <img
              src={service.coverImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000'}
              alt={service.title}
              width={1000}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed text-base">
            <h3 className="text-xl font-bold text-slate-900">Deskripsi & Standar Prosedur</h3>
            <p>{service.description}</p>
          </div>

          {service.features && (
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Lingkup Pekerjaan & Jaminan Layanan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Konsultasikan jadwal survei lokasi dan studi kelayakan kapasitas daya pabrik Anda.
            </div>
            <Link
              to={`/quote?service=${encodeURIComponent(service.title)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-all"
            >
              <span>Diskusikan Rencana Proyek</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceDetailPage;
