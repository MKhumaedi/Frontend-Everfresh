import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { usePublicHome, usePublicProducts } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ProductData } from '../../types/public.js';
import { Search, Zap, Gauge, ArrowRight } from 'lucide-react';

function renderProductCard(prod: ProductData) {
  return (
    <div
      key={prod.id || prod.slug}
      className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="relative h-52 bg-slate-100 overflow-hidden">
          <img
            src={prod.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'}
            alt={prod.name}
            width={500}
            height={350}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {prod.capacityTons && (
            <div className="absolute top-3 left-3 bg-[#0B4F8A] text-white text-xs font-bold px-2.5 py-1 rounded-md">
              {prod.capacityTons} Ton / Hari
            </div>
          )}
        </div>

        <div className="p-6">
          <span className="text-xs font-semibold text-[#0B4F8A] uppercase tracking-wider">
            {prod.category?.name || 'Mesin Pendingin'}
          </span>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B4F8A] transition-colors mt-1">
            <Link to={`/products/${prod.slug}`}>{prod.name}</Link>
          </h3>
          <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {prod.tagline || prod.description}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-sky-600" />
              <span className="truncate">{prod.compressorBrand || 'Bitzer Semi-Hermetic'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{prod.powerKw ? `${prod.powerKw} kW` : 'Hemat Daya'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between gap-3">
        <Link
          to={`/products/${prod.slug}`}
          className="text-xs font-bold text-slate-700 hover:text-[#0B4F8A] flex items-center gap-1"
        >
          Spesifikasi &rarr;
        </Link>
        <Link
          to={`/quote?product=${encodeURIComponent(prod.name)}`}
          className="inline-flex items-center gap-1  bg-[#00065f] hover:bg-[#055096] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
        >
          <span>Minta Penawaran</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const activeCategorySlug = searchParams.get('category') || '';

  const { data: homeData } = usePublicHome();
  const selectedCat = homeData?.categories.find((c) => c.slug === activeCategorySlug);
  const { data: products = [], isLoading } = usePublicProducts(selectedCat?.id);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEOHead
        title="Katalog Mesin Es & Cold Storage Industri"
        description="Pilihan lengkap mesin es batu tube, flake, cube, balok direct cooling dan cold storage kapasitas 1 s/d 100 Ton."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Katalog Mesin Es Industri & Cold Storage
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Peralatan pendingin berstandar food-grade SS304 dengan efisiensi energi tinggi dan keandalan operasional 24 jam.
          </p>

          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari tipe mesin atau kapasitas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#0B4F8A]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSearchParams({})}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              !activeCategorySlug ? 'bg-[#0B4F8A] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Semua Mesin
          </button>
          {homeData?.categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSearchParams({ category: c.slug })}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCategorySlug === c.slug ? 'bg-[#0B4F8A] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-sm">Tidak ada mesin es yang cocok dengan kriteria pencarian.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(renderProductCard)}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductsPage;
