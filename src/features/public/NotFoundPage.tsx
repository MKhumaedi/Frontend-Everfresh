import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ArrowLeft, Home, Snowflake } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <SEOHead title="404 Halaman Tidak Ditemukan" />
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0B4F8A] flex items-center justify-center mx-auto">
          <Snowflake className="w-8 h-8" />
        </div>
        <div className="text-4xl font-extrabold text-slate-900 font-mono tracking-tight">404</div>
        <h1 className="text-lg font-bold text-slate-800">Halaman Tidak Ditemukan</h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          Mohon maaf, halaman yang Anda cari tidak tersedia atau tautan telah dipindahkan ke alamat lain.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalog Mesin</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
