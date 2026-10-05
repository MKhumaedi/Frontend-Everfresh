import React from 'react';
import { Award, Zap, Activity, Clock } from 'lucide-react';

const stats = [
  {
    icon: Award,
    value: '100+',
    label: 'Instalasi Pabrik & Cold Room',
    desc: 'Tersebar di pelabuhan dan sentra industri nasional',
  },
  {
    icon: Activity,
    value: '500+ Ton',
    label: 'Kapasitas Kumulatif Harian',
    desc: 'Pasokan es kristal & balok harian terpasang',
  },
  {
    icon: Zap,
    value: '28%',
    label: 'Efisiensi Daya Listrik',
    desc: 'Teknologi kompresor Bitzer & Hanbell VFD',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Dukungan Servis & Suku Cadang',
    desc: 'Tim teknisi siaga di Jakarta, Surabaya & Makassar',
  },
];

export const StatsStripSection: React.FC = () => {
  return (
    <section className="bg-[#0A1E32] text-white py-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950 border border-sky-800/60 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-sm font-bold text-sky-200 mt-0.5">{s.label}</div>
                  <div className="text-xs text-slate-400 mt-1 leading-snug">{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
