import React from 'react';
import { Link } from 'react-router-dom';
import { usePublicHome } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ShieldCheck, Factory, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

const values = [
  { icon: ShieldCheck, title: 'Keandalan Tropis 24/7', desc: 'Rancang bangun mesin disesuaikan dengan suhu dan kelembaban pesisir Indonesia.' },
  { icon: Award, title: 'Standar Pangan Higienis', desc: 'Penggunaan stainless steel SS304/SS316 dan pipa tembaga bebas oli amonia beracun.' },
  { icon: Factory, title: 'Uji Beban 72 Jam', desc: 'Semua unit dites kapasitas dan kestabilan siklus panen es sebelum instalasi ke lokasi.' },
  { icon: Users, title: 'Teknisi Tersertifikasi', desc: 'Insinyur pendingin berpengalaman siap tanggap darurat dan perawatan berkala.' },
];

export const AboutPage: React.FC = () => {
  const { data: homeData } = usePublicHome();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEOHead
        title="Tentang Kami - PT Everfresh Industrial Indonesia"
        description="Pelopor rancang bangun mesin es industri & cold storage hemat energi di Indonesia sejak 2012."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-[#0B4F8A] uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Profil Perusahaan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Memperkuat Ketahanan Rantai Dingin Maritim & Industri Indonesia
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Didirikan pada tahun 2012, EVERFRESH hadir memberikan solusi teknologi pendingin komersial
            dan pabrik es berkapasitas besar dengan teknologi terkini yang hemat daya listrik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xs">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Komitmen Kualitas & Fabrikasi Mandiri</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Kami memadukan komponen mesin kelas dunia dari Jerman dan Jepang (seperti kompresor Bitzer,
              Danfoss, dan Hanbell) dengan fabrikasi tangki, drum evaporator, dan sistem kontrol cerdas PLC di
              workshop kami di Sidoarjo dan Cikande.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Setiap unit mesin melalui pengujian beban penuh (load-test) selama minimal 72 jam non-stop
              untuk memastikan laju produksi tonase es riil sesuai janji spesifikasi sebelum dikirimkan ke lokasi klien.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md bg-slate-100 h-80 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
              alt="Fasilitas Workshop EVERFRESH"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#0B4F8A] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-[#0B4F8A] text-white p-8 sm:p-12 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Rencanakan Kebutuhan Pabrik Es Anda</h3>
            <p className="text-sky-200 text-sm mt-1">Konsultasikan denah lokasi & kapasitas daya listrik bersama tim kami.</p>
          </div>
          <Link
            to="/quote"
            className=" bg-[#00065f] hover:bg-[#005ae0] text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-md transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Minta Penawaran Harga</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
