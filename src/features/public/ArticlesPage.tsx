import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePublicArticles } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ArticleData } from '../../types/public.js';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';

function formatDate(dateStr?: string | null) {
  if (!dateStr) return 'Terbaru';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function renderArticleCard(art: ArticleData) {
  return (
    <article
      key={art.id || art.slug}
      className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 bg-slate-100 overflow-hidden">
          <img
            src={art.coverImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'}
            alt={art.title}
            width={500}
            height={300}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-white/95 text-[#0B4F8A] text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
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

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B4F8A] transition-colors leading-snug">
            <Link to={`/articles/${art.slug}`}>{art.title}</Link>
          </h3>

          <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
            {art.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">Pusat Informasi</span>
        <Link
          to={`/articles/${art.slug}`}
          className="text-xs font-bold text-[#0B4F8A] hover:underline flex items-center gap-1"
        >
          <span>Baca Selengkapnya</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

export const ArticlesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: articles = [], isLoading } = usePublicArticles();

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEOHead
        title="Berita & Edukasi Industri Mesin Es"
        description="Artikel panduan analisis bisnis pabrik es kristal, efisiensi energi pendingin, dan teknologi cold storage di Indonesia."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Pusat Pengetahuan & Riset
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Berita & Edukasi Rantai Dingin Industri
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Wawasan bisnis, analisis teknis refrigerasi, dan panduan operasional pabrik es
            yang disusun langsung oleh praktisi engineering EVERFRESH.
          </p>

          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari artikel atau topik..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#0B4F8A]"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-sm">Tidak ada artikel yang cocok dengan pencarian.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(renderArticleCard)}
          </div>
        )}
      </div>
    </div>
  );
};
export default ArticlesPage;
