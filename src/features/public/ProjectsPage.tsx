import React from 'react';
import { usePublicProjects } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ProjectData } from '../../types/public.js';
import { MapPin, Calendar, Building, CheckCircle2 } from 'lucide-react';

function renderProjectCard(proj: ProjectData) {
  const dateFormatted = proj.completionDate
    ? new Date(proj.completionDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    : 'Operasional';

  return (
    <div
      key={proj.id || proj.slug}
      className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="relative h-60 bg-slate-100 overflow-hidden">
          <img
            src={proj.coverImage || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'}
            alt={proj.title}
            width={600}
            height={400}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-[#0B4F8A] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-xs">
            {proj.capacity}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#0B4F8A] shrink-0" />
            <span className="line-clamp-1">{proj.location}</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            {proj.title}
          </h3>

          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              {proj.clientName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {dateFormatted}
            </span>
          </div>

          <p className="text-sm text-slate-600 mt-4 leading-relaxed line-clamp-3">
            {proj.description || proj.summary}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Unit Telah Lolos Uji Beban & Beroperasi
        </span>
      </div>
    </div>
  );
}

export const ProjectsPage: React.FC = () => {
  const { data: projects = [], isLoading } = usePublicProjects();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEOHead
        title="Proyek & Portofolio Pabrik Es Terpasang"
        description="Daftar instalasi mesin es tube, flake, block direct cooling, dan cold storage di seluruh pelabuhan dan sentra perikanan Indonesia."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Bukti Kualitas Di Lapangan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Portofolio Proyek & Studi Kasus Rekayasa
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Mulai dari fasilitas pendaratan ikan di Bitung hingga pergudangan ekspor di Sidoarjo dan Muara Baru,
            kami hadir mendukung ketahanan rantai dingin pelanggan.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(renderProjectCard)}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectsPage;
