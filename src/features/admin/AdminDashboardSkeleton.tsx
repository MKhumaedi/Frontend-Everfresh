import React from 'react';
import { Button } from '../../components/ui/Button.js';
import { Card } from '../../components/ui/Card.js';
import { Badge } from '../../components/ui/Badge.js';
import { Download, Plus, ThermometerSnowflake } from 'lucide-react';
import { AdminMetricsRow } from './components/AdminMetricsRow.js';
import { AdminInquiriesTable } from './components/AdminInquiriesTable.js';
import { AdminActivitySide } from './components/AdminActivitySide.js';

function renderHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[#0F1F2E] tracking-tight">Selamat pagi, Rina</h1>
        <p className="text-xs text-[#5A6E7F] mt-1">
          Kamis, 20 Maret 2025 &bull; Tim Marketing &amp; Operasional Cold Chain
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <Button variant="outline" size="md" leftIcon={<Download className="w-4 h-4" />}>
          Ekspor Rekap
        </Button>
        <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
          Entri Permintaan Baru
        </Button>
      </div>
    </div>
  );
}

function renderChartCard() {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#0F1F2E]">Permintaan Penawaran 30 Hari Terakhir</h2>
            <Badge variant="primary" size="sm">Cold Chain Leads</Badge>
          </div>
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-2xl font-extrabold text-[#0B4F8A]">142 Masuk</span>
            <span className="text-xs font-semibold text-[#27AE60]">&uarr; +18.4% vs periode sebelumnya</span>
          </div>
        </div>
        <div className="inline-flex p-1 bg-[#F4F8FB] border border-[#E3EAF0] rounded-[8px] text-xs">
          <button className="px-3 py-1 font-medium text-[#5A6E7F] hover:text-[#0F1F2E]">7 Hari Terakhir</button>
          <button className="px-3 py-1 font-bold text-[#0B4F8A] bg-white rounded-[6px] shadow-xs">30 Hari Terakhir</button>
          <button className="px-3 py-1 font-medium text-[#5A6E7F] hover:text-[#0F1F2E]">Bulan Ini</button>
        </div>
      </div>
      <div className="h-44 w-full flex flex-col justify-end gap-2 border-b border-[#E3EAF0] pb-2 relative">
        <div className="absolute right-12 top-6 bg-[#0B4F8A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          9 Leads
        </div>
        <svg className="w-full h-32 overflow-visible" viewBox="0 0 700 120" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="#006688"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="20,100 130,85 240,65 350,75 460,35 570,55 640,25 680,18"
          />
          <circle cx="20" cy="100" r="4" fill="#006688" />
          <circle cx="130" cy="85" r="4" fill="#006688" />
          <circle cx="240" cy="65" r="4" fill="#006688" />
          <circle cx="350" cy="75" r="4" fill="#006688" />
          <circle cx="460" cy="35" r="4" fill="#006688" />
          <circle cx="570" cy="55" r="4" fill="#006688" />
          <circle cx="640" cy="25" r="4" fill="#006688" />
          <circle cx="680" cy="18" r="4" fill="#006688" />
        </svg>
      </div>
      <div className="flex justify-between text-[11px] text-[#8FA2B2] pt-3 font-mono">
        <span>20 Feb</span>
        <span>24 Feb</span>
        <span>01 Mar</span>
        <span>06 Mar</span>
        <span>11 Mar</span>
        <span>16 Mar</span>
        <span className="font-bold text-[#0B4F8A]">20 Mar (Hari Ini)</span>
      </div>
    </Card>
  );
}

function renderBestSellerBanner() {
  return (
    <div className="p-4 bg-[#F4F8FB] border border-[#CBD8E2] rounded-[10px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-[8px] bg-white border border-[#CBD8E2] flex items-center justify-center text-[#0B4F8A]">
          <ThermometerSnowflake className="w-5 h-5 text-[#4FC3F7]" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#0F1F2E]">Spesifikasi Unit Terlaris Q1</h4>
          <p className="text-[11px] text-[#5A6E7F]">Freon R404A Eco-friendly &amp; Kompresor Bitzer Semi-Hermetic</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 text-[11px] font-bold text-[#0B4F8A] bg-[#4FC3F7]/20 rounded border border-[#4FC3F7]/40">
          -25&deg;C Blast Freeze
        </span>
        <span className="px-2.5 py-1 text-[11px] font-bold text-[#006688] bg-[#E1F5FE] rounded border border-[#4FC3F7]/40">
          TUV Certified
        </span>
      </div>
    </div>
  );
}

export const AdminDashboardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {renderHeader()}
      <AdminMetricsRow />
      {renderChartCard()}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <AdminInquiriesTable />
          {renderBestSellerBanner()}
        </div>
        <div>
          <AdminActivitySide />
        </div>
      </div>
    </div>
  );
};
