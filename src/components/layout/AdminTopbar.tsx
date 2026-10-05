import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext.js';
import { Search, ExternalLink, Bell, ChevronDown, LogOut, User } from 'lucide-react';

function getBreadcrumbTitle(pathname: string) {
  if (pathname.includes('/inquiries')) return 'Permintaan Penawaran';
  if (pathname.includes('/pages/home')) return 'Editor Beranda';
  if (pathname.includes('/products')) return 'Katalog Produk';
  if (pathname.includes('/projects')) return 'Proyek & Portofolio';
  if (pathname.includes('/services')) return 'Layanan Rekayasa';
  if (pathname.includes('/articles')) return 'Berita & Artikel';
  if (pathname.includes('/testimonials')) return 'Testimoni Klien';
  if (pathname.includes('/media')) return 'Media Library';
  if (pathname.includes('/users')) return 'Pengguna & Hak Akses';
  if (pathname.includes('/settings')) return 'Pengaturan Website';
  if (pathname.includes('/feature-flags')) return 'Feature Flags';
  if (pathname.includes('/activity-logs')) return 'Log Aktivitas';
  if (pathname.includes('/profile')) return 'Profil Saya';
  return 'Dashboard';
}

export const AdminTopbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pageTitle = getBreadcrumbTitle(location.pathname);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Everfresh Admin</span>
          <span className="text-slate-300">&rsaquo;</span>
          <span className="text-slate-800 font-bold">{pageTitle}</span>
        </div>

        <div className="relative hidden md:flex items-center w-full max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari data di panel..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-[#0B4F8A]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B4F8A] hover:bg-sky-50 rounded-lg transition-colors border border-sky-100"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Lihat Website</span>
        </Link>

        <button
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Notifikasi"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
        </button>

        <div className="h-5 w-px bg-slate-200" />

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0B4F8A] text-white font-bold text-xs flex items-center justify-center">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-slate-400 leading-tight">
                {user?.role || 'ADMIN'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user?.name || 'Admin'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
              <Link
                to="/admin/profile"
                onClick={() => setDropdownOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Profil Saya</span>
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer border-t border-slate-100"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
