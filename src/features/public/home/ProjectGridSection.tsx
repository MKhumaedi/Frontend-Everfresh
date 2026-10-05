import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectData } from '../../../types/public.js';
import { MapPin, ArrowRight } from 'lucide-react';

interface ProjectGridSectionProps {
  projects?: ProjectData[];
}

export const ProjectGridSection: React.FC<ProjectGridSectionProps> = ({ projects = [] }) => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-100/60 px-3 py-1 rounded-full border border-sky-200">
              Portofolio Lapangan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Instalasi & Studi Kasus Pabrik Es di Seluruh Indonesia
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B4F8A] hover:text-[#083a66] shrink-0"
          >
            <span>Lihat Semua Proyek Instalasi ({projects.length > 0 ? `${projects.length}+` : 'Portofolio'})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id || proj.slug}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={proj.coverImage || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'}
                    alt={proj.title}
                    width={600}
                    height={400}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B4F8A] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {proj.capacity}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#0B4F8A]" />
                    <span className="line-clamp-1">{proj.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B4F8A] transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-400 mt-1">Klien: {proj.clientName}</div>
                  <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Status Operasional Aktif</span>
                <Link
                  to="/projects"
                  className="text-xs font-bold text-[#0B4F8A] hover:underline flex items-center gap-1"
                >
                  Detail Kasus &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
