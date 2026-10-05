import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { EverfreshLogo } from '../ui/EverfreshLogo.js';
import { HeaderDropdown, DropdownItem } from './HeaderDropdown.js';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils/cn.js';

const productItems: DropdownItem[] = [
  { name: 'Mesin Es Tube', href: '/products?category=mesin-es-tube', description: 'Es tabung kristal higienis untuk F&B' },
  { name: 'Mesin Es Cube', href: '/products?category=mesin-es-cube', description: 'Es kotak padat food-grade resto' },
  { name: 'Mesin Es Block Direct Cooling', href: '/products?category=mesin-es-block', description: 'Tanpa brine water, hemat energi' },
];

const serviceItems: DropdownItem[] = [
  { name: 'Fabrikasi Mesin Es Kustom', href: '/services/fabrikasi-mesin-es-kustom', description: 'Rancang bangun mesin kapasitas 1-100 ton' },
  { name: 'Instalasi Cold Storage', href: '/services/instalasi-ruang-cold-storage', description: 'Ruang chiller & blast freezer turnkey' },
  { name: 'Pemeliharaan & Overhaul', href: '/services/servis-berkala-overhaul-kompresor', description: 'Dukungan teknisi pendingin siaga 24/7' },
];

export const PublicHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#E3EAF0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="EVERFRESH Homepage">
          <EverfreshLogo size="md" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          <NavLink to="/" className={({ isActive }) => cn('text-sm font-medium py-2 transition-colors', isActive ? 'text-[#0B4F8A] font-semibold' : 'text-[#2C3E50] hover:text-[#0B4F8A]')}>
            Beranda
          </NavLink>
          <HeaderDropdown label="Produk" items={productItems} baseHref="/products" />
          <HeaderDropdown label="Layanan" items={serviceItems} baseHref="/services" />
          <NavLink to="/projects" className={({ isActive }) => cn('text-sm font-medium py-2 transition-colors', isActive ? 'text-[#0B4F8A] font-semibold' : 'text-[#2C3E50] hover:text-[#0B4F8A]')}>
            Proyek
          </NavLink>
          <NavLink to="/articles" className={({ isActive }) => cn('text-sm font-medium py-2 transition-colors', isActive ? 'text-[#0B4F8A] font-semibold' : 'text-[#2C3E50] hover:text-[#0B4F8A]')}>
            Berita
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => cn('text-sm font-medium py-2 transition-colors', isActive ? 'text-[#0B4F8A] font-semibold' : 'text-[#2C3E50] hover:text-[#0B4F8A]')}>
            Tentang Kami
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => cn('text-sm font-medium py-2 transition-colors', isActive ? 'text-[#0B4F8A] font-semibold' : 'text-[#2C3E50] hover:text-[#0B4F8A]')}>
            Kontak
          </NavLink>
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-[#00065f] hover:bg-[#059669] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all duration-150 cursor-pointer active:scale-98"
          >
            <span>Minta Penawaran</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="lg:hidden p-2 text-slate-700 hover:text-[#0B4F8A] rounded-lg border border-slate-200 cursor-pointer"
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 flex flex-col gap-3 shadow-lg max-h-[85vh] overflow-y-auto">
          <NavLink to="/" onClick={closeMobile} className="text-sm font-semibold py-2 text-slate-800">Beranda</NavLink>
          <div className="py-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Produk Unggulan</span>
            <div className="mt-1 flex flex-col pl-2 gap-1.5">
              {productItems.map((p) => (
                <Link key={p.name} to={p.href} onClick={closeMobile} className="text-sm text-slate-700 py-1 hover:text-[#0B4F8A]">
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="py-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Layanan Rekayasa</span>
            <div className="mt-1 flex flex-col pl-2 gap-1.5">
              {serviceItems.map((s) => (
                <Link key={s.name} to={s.href} onClick={closeMobile} className="text-sm text-slate-700 py-1 hover:text-[#0B4F8A]">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/projects" onClick={closeMobile} className="text-sm font-semibold py-2 text-slate-800">Proyek & Portofolio</NavLink>
          <NavLink to="/articles" onClick={closeMobile} className="text-sm font-semibold py-2 text-slate-800">Berita & Edukasi</NavLink>
          <NavLink to="/about" onClick={closeMobile} className="text-sm font-semibold py-2 text-slate-800">Tentang Kami</NavLink>
          <NavLink to="/contact" onClick={closeMobile} className="text-sm font-semibold py-2 text-slate-800">Kontak Kantor</NavLink>
          <Link
            to="/quote"
            onClick={closeMobile}
            className="mt-2 w-full text-center  bg-[#00065f] hover:bg-[#055096] text-white text-sm font-semibold py-3 rounded-lg shadow-sm"
          >
            Minta Penawaran Harga
          </Link>
        </div>
      )}
    </header>
  );
};
