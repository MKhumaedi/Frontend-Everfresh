import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePublicArticle } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = usePublicArticle(slug);

  if (isLoading) return <div className="py-24 text-center text-slate-500 animate-pulse">Memuat artikel...</div>;
  if (error || !article) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-900">Artikel Tidak Ditemukan</h2>
        <Link to="/articles" className="mt-4 inline-block text-sm text-[#0B4F8A] font-semibold underline">
          &larr; Kembali ke Pusat Artikel
        </Link>
      </div>
    );
  }

  const dateFormatted = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Terbaru';

  return (
    <article className="py-12 bg-slate-50 min-h-screen">
      <SEOHead title={article.title} description={article.excerpt} ogImage={article.coverImage || undefined} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B4F8A] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Semua Artikel</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-md border border-sky-200">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pt-2 border-b border-slate-100 pb-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-4 h-4 text-[#0B4F8A]" />
                {article.author?.name || 'Tim Redaksi EVERFRESH'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {dateFormatted}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {article.readTimeMin || 5} Menit Membaca
              </span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden h-72 sm:h-96 bg-slate-100">
            <img
              src={article.coverImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000'}
              alt={article.title}
              width={1000}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed bg-sky-50/50 p-6 rounded-xl border border-sky-100">
            {article.excerpt}
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-4">
            <p className="whitespace-pre-line leading-loose">{article.content || article.excerpt}</p>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Butuh konsultasi lebih mendalam terkait topik artikel ini?
            </div>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <span>Konsultasi Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
export default ArticleDetailPage;
