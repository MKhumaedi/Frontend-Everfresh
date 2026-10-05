import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card.js';
import { Badge } from '../../../components/ui/Badge.js';
import { History, FileText, ChevronRight, PlusCircle, Image as ImageIcon, LayoutTemplate } from 'lucide-react';

const activities = [
  { initial: 'DS', name: 'Dimas S.', action: 'memperbarui spesifikasi teknis "Mesin Es Tube Seri IceTronic Pro"', time: '2 jam lalu' },
  { initial: 'RK', name: 'Rina K.', action: 'menerbitkan artikel "Panduan Lengkap Memulai Bisnis Es Kristal"', time: '4 jam lalu' },
  { initial: 'DS', name: 'Dimas S.', action: 'mengunggah 3 foto proyek "Instalasi Cold Storage 50 Ton Sidoarjo"', time: 'Kemarin' },
  { initial: 'RK', name: 'Rina K.', action: 'mengubah banner hero beranda', time: '2 hari lalu' },
];

const drafts = [
  { type: 'DRAF ARTIKEL', time: '5 jam lalu', title: 'Studi Kasus: Efisiensi Energi Pabrik Es Bitung' },
  { type: 'DRAF PRODUK', time: 'Kemarin', title: 'Mesin Es Cube Komersial Seri C-500' },
  { type: 'DRAF TESTIMONI', time: '3 hari lalu', title: 'Testimoni: PT Bahari Prima Seafood Bali' },
];

const quickActions = [
  { label: 'Tambah Artikel Berita', icon: PlusCircle },
  { label: 'Tambah Proyek Portofolio', icon: FileText },
  { label: 'Unggah Media Gambar', icon: ImageIcon },
  { label: 'Kelola Banner Beranda', icon: LayoutTemplate },
];

function renderActivities() {
  return (
    <div className="flex flex-col gap-3">
      {activities.map((a, i) => (
        <div key={i} className="flex items-start gap-2.5 text-xs">
          <div className="w-6 h-6 rounded-full bg-[#EBF4FC] text-[#0B4F8A] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
            {a.initial}
          </div>
          <div className="flex-1">
            <span className="font-semibold text-[#0B4F8A]">{a.name} </span>
            <span className="text-[#5A6E7F]">{a.action}</span>
            <p className="text-[10px] text-[#8FA2B2] mt-0.5">{a.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderDrafts() {
  return (
    <div className="flex flex-col gap-3">
      {drafts.map((d, i) => (
        <div key={i} className="p-3 bg-[#F4F8FB] rounded-[8px] border border-[#E3EAF0] flex flex-col gap-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-[#0B4F8A]">{d.type}</span>
            <span className="text-[#8FA2B2]">{d.time}</span>
          </div>
          <h5 className="text-xs font-semibold text-[#0F1F2E]">{d.title}</h5>
        </div>
      ))}
    </div>
  );
}

function renderQuickActions() {
  return (
    <div className="flex flex-col gap-2">
      {quickActions.map((action, i) => {
        const Icon = action.icon;
        return (
          <button
            key={i}
            className="w-full flex items-center justify-between p-3 rounded-[8px] border border-[#E3EAF0] bg-white hover:bg-[#F4F8FB] hover:border-[#4FC3F7] transition-colors text-xs font-semibold text-[#0F1F2E] cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#0B4F8A]">
              <Icon className="w-4 h-4 text-[#4FC3F7]" />
              <span>{action.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8FA2B2]" />
          </button>
        );
      })}
    </div>
  );
}

export const AdminActivitySide: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm">Aktivitas Konten</CardTitle>
          <History className="w-4 h-4 text-[#8FA2B2]" />
        </CardHeader>
        <CardContent className="pt-2">{renderActivities()}</CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm">Draf Belum Terbit</CardTitle>
            <Badge variant="primary" size="sm">3</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-2">{renderDrafts()}</CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">{renderQuickActions()}</CardContent>
      </Card>
    </div>
  );
};
