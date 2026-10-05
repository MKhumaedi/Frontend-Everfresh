import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead.js';

interface Forbidden403PageProps {
  requiredRole?: string;
  currentRole?: string;
}

export const Forbidden403Page: React.FC<Forbidden403PageProps> = ({
  requiredRole = 'SUPERADMIN',
  currentRole = 'ADMIN',
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <SEOHead title="403 - Akses Ditolak" />
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">403 - Akses Ditolak</h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          Halaman ini khusus untuk peran <span className="font-bold text-rose-700">{requiredRole}</span>. Peran Anda saat ini (<span className="font-bold">{currentRole}</span>) tidak memiliki otorisasi untuk mengakses konfigurasi ini.
        </p>
        <div className="pt-2">
          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Forbidden403Page;
