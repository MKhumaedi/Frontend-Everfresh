import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryData } from '../../../types/public.js';
import {
  Cylinder,
  Box,
  Layers,
  Snowflake,
  Waves,
  Archive,
  Warehouse,
  ArrowRight,
} from 'lucide-react';

interface CategoryGridProps {
  categories?: CategoryData[];
}

function getCategoryIcon(slug: string) {
  switch (slug) {
    case 'mesin-es-tube': return <Cylinder className="w-6 h-6 text-[#0B4F8A]" />;
    case 'mesin-es-cube': return <Box className="w-6 h-6 text-[#0B4F8A]" />;
    case 'mesin-es-block': return <Layers className="w-6 h-6 text-[#0B4F8A]" />;
    case 'mesin-es-flake': return <Snowflake className="w-6 h-6 text-[#0B4F8A]" />;
    case 'mesin-es-slurry': return <Waves className="w-6 h-6 text-[#0B4F8A]" />;
    case 'kaleng-es': return <Archive className="w-6 h-6 text-[#0B4F8A]" />;
    case 'cold-room': return <Warehouse className="w-6 h-6 text-[#0B4F8A]" />;
    default: return <Snowflake className="w-6 h-6 text-[#0B4F8A]" />;
  }
}

export const CategoryGridSection: React.FC<CategoryGridProps> = ({ categories = [] }) => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Lini Fabrikasi Mesin
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Katalog Kategori Mesin Es & Ruang Pendingin
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Dirancang secara presisi untuk kebutuhan pabrik es komersial, perikanan laut,
            pengolahan makanan, restoran, dan pergudangan rantai dingin di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id || cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group flex flex-col justify-between p-6 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-[#0B4F8A]/40 hover:shadow-lg transition-all duration-200"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-sky-100/70 group-hover:bg-[#f4f7f8] group-hover:text-white flex items-center justify-center transition-colors mb-4">
                  {getCategoryIcon(cat.slug)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B4F8A] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {cat.description || 'Mesin es industri berkualitas tinggi food grade.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#0B4F8A]">
                <span>Lihat Spesifikasi Unit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
