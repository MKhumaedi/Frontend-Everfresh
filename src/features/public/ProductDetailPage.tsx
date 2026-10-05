import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePublicProduct } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import {
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gauge,
  Maximize2,
} from 'lucide-react';

function renderFaqs(faqs?: Array<{ question: string; answer: string }> | null) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Pertanyaan Umum (FAQ) Produk</h3>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <details key={i} className="group bg-white p-5 rounded-xl border border-slate-200">
            <summary className="flex items-center justify-between font-bold text-slate-800 cursor-pointer text-sm">
              <span>{f.question}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

export const ProductDetailPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = usePublicProduct(slug);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (isLoading) return <div className="py-24 text-center text-slate-500 animate-pulse">Memuat data spesifikasi mesin...</div>;
  if (error || !product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-900">Produk Tidak Ditemukan</h2>
        <Link to="/products" className="mt-4 inline-block text-sm text-[#0B4F8A] font-semibold underline">
          &larr; Kembali ke Katalog Mesin
        </Link>
      </div>
    );
  }

  const activeImage = selectedImg || product.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800';

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SEOHead title={product.name} description={product.description} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-800">Beranda</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-slate-800">Produk</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
          <div className="lg:col-span-6 space-y-4">
            <div className="h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={activeImage} alt={product.name} width={800} height={600} className="w-full h-full object-cover" />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(img)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer ${
                      activeImage === img ? 'border-[#0B4F8A]' : 'border-slate-200'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-wider bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                {product.category?.name || 'Mesin Es Industri'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block">Kapasitas Harian</span>
                <span className="font-bold text-slate-800 text-sm">{product.capacityTons ? `${product.capacityTons} Ton / Hari` : 'Kustom'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Kompresor Utama</span>
                <span className="font-bold text-slate-800 text-sm">{product.compressorBrand || 'Bitzer (Germany)'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Daya Motor Listrik</span>
                <span className="font-bold text-slate-800 text-sm">{product.powerKw ? `${product.powerKw} kW` : 'Hemat Daya'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Jenis Freon</span>
                <span className="font-bold text-slate-800 text-sm">{product.refrigerant || 'R404A Eco'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Dimensi Rangka</span>
                <span className="font-bold text-slate-800 text-sm">{product.dimensions || 'Modular SS304'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Standar Bahan</span>
                <span className="font-bold text-emerald-600 text-sm">Food Grade SS304</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/quote?product=${encodeURIComponent(product.name)}`}
                className="flex-1 text-center bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold py-3.5 px-6 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Minta Surat Penawaran Harga Resmi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {renderFaqs(product.faqs)}
      </div>
    </div>
  );
};
export default ProductDetailPage;
