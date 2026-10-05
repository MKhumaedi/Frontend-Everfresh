import React from 'react';
import { Card } from '../../../components/ui/Card.js';
import { Badge } from '../../../components/ui/Badge.js';
import { FileText, BookOpen, Snowflake, CheckCircle } from 'lucide-react';

const stats = [
  {
    title: 'PERMINTAAN BARU',
    value: '12',
    change: '+3 dibanding kemarin',
    isPositive: true,
    icon: FileText,
  },
  {
    title: 'ARTIKEL TERBIT',
    value: '48',
    change: '2 draf menunggu review',
    isNeutral: true,
    icon: BookOpen,
  },
  {
    title: 'PRODUK AKTIF',
    value: '14',
    change: 'Katalog mesin & cold storage',
    isNeutral: true,
    icon: Snowflake,
  },
  {
    title: 'PROYEK SELESAI',
    value: '23',
    change: '+1 studi kasus minggu ini',
    isPositive: true,
    icon: CheckCircle,
  },
];

export const AdminMetricsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.title} className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-[#5A6E7F] uppercase">
                {s.title}
              </span>
              <Icon className="w-5 h-5 text-[#006688]" />
            </div>
            <div className="my-3">
              <span className="text-3xl font-extrabold text-[#0F1F2E] tracking-tight">{s.value}</span>
            </div>
            <div>
              {s.isPositive ? (
                <Badge variant="success" size="sm">
                  &uarr; {s.change}
                </Badge>
              ) : (
                <Badge variant="neutral" size="sm" dot>
                  {s.change}
                </Badge>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
