import React from 'react';
import { Link } from 'react-router-dom';
import { EverfreshLogo } from '../ui/EverfreshLogo.js';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

const productLinks = [
  { name: 'Mesin Es Tube', href: '/products?category=mesin-es-tube' },
  { name: 'Mesin Es Block Direct Cooling', href: '/products?category=mesin-es-block' },
  { name: 'Mesin Es Flake Perikanan', href: '/products?category=mesin-es-flake' },
  { name: 'Cold Room & Blast Freezer', href: '/products?category=cold-room' },
  { name: 'Mesin Es Slurry Liquid Flow', href: '/products?category=mesin-es-slurry' },
];

const companyLinks = [
  { name: 'Tentang Kami & Pabrik', href: '/about' },
  { name: 'Proyek & Studi Kasus', href: '/projects' },
  { name: 'Layanan Rekayasa & Servis', href: '/services' },
  { name: 'Berita & Artikel Industri', href: '/articles' },
  { name: 'Permintaan Penawaran Harga', href: '/quote' },
];

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          <div className="lg:col-span-2 space-y-4">
            <EverfreshLogo size="md" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Pelopor fabrikasi mesin es industri andalan di Indonesia. Berkomitmen menghadirkan
              teknologi pendingin hemat energi, food-grade SS304/SS316, dan servis teknisi 24/7.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standar Komponen Jerman & Jepang (Bitzer, Danfoss, Hanbell)</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Produk Utama</h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((p) => (
                <li key={p.name}>
                  <Link to={p.href} className="text-slate-400 hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((c) => (
                <li key={c.name}>
                  <Link to={c.href} className="text-slate-400 hover:text-white transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Hubungi Kami</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Sentra Bisnis Artha Gading D-08, Kelapa Gading, Jakarta Utara</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+62 21 8990 4120 / +62 811 8899 721</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>sales@everfresh-ice.co.id</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Senin - Sabtu: 08:00 - 17:00 WIB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PT Everfresh Industrial Indonesia. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400">Tentang</Link>
            <Link to="/quote" className="hover:text-slate-400">Penawaran Harga</Link>
            <Link to="/contact" className="hover:text-slate-400">Kontak Cabang</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
