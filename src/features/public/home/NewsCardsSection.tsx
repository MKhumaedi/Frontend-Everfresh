import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleData } from '../../../types/public.js';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface NewsCardsSectionProps {
  articles?: ArticleData[];
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return 'Terbaru';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const NewsCardsSection: React.FC<NewsCardsSectionProps> = ({ articles = [] }) => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-100/60 px-3 py-1 rounded-full border border-sky-200">
              Edukasi & Berita Industri
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Panduan Bisnis & Perkembangan Teknologi Pendingin
            </h2>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B4F8A] hover:text-[#083a66] shrink-0"
          >
            <span>Buka Semua Artikel & Riset</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((art) => (
            <article
              key={art.id || art.slug}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={art.coverImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'}
                    alt={art.title}
                    width={500}
                    height={300}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#0B4F8A] text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {art.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(art.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTimeMin || 5} mnt baca
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B4F8A] transition-colors leading-snug">
                    <Link to={`/articles/${art.slug}`}>{art.title}</Link>
                  </h3>

                  <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Tim Riset EVERFRESH</span>
                <Link
                  to={`/articles/${art.slug}`}
                  className="text-xs font-bold text-[#0B4F8A] group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
                >
                  Baca Lengkap &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
