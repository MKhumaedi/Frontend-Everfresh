import React, { useState } from 'react';
import { useInquiries } from './api/inquiriesApi.js';
import { InquiryDetailPane } from './components/InquiryDetailPane.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { Search, Filter, MessageSquare, ArrowLeft } from 'lucide-react';

const statusTabs = [
  { key: 'ALL', label: 'Semua' },
  { key: 'NEW', label: 'Baru' },
  { key: 'CONTACTED', label: 'Dihubungi' },
  { key: 'SURVEY_SCHEDULED', label: 'Survei' },
  { key: 'PROPOSAL_SENT', label: 'Proposal' },
  { key: 'DEAL_WON', label: 'Deal' },
];

export const InquiriesPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = useInquiries({
    status: selectedStatus,
    search: searchTerm,
  });

  const inquiries = data?.items || [];
  const activeInquiryId = selectedId || (inquiries.length > 0 ? inquiries[0].id : null);

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col space-y-4">
      <SEOHead title="Permintaan Penawaran - CMS Admin" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Permintaan Penawaran & Leads Masuk
          </h1>
          <p className="text-xs text-slate-500">Kelola proses tindak lanjut prospek pabrik es dan ruang pendingin.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, PT, no quote..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#0B4F8A]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto">
        {statusTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSelectedStatus(t.key)}
            className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
              selectedStatus === t.key
                ? 'bg-[#0B4F8A] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          <div className="p-3 border-b border-slate-100 text-xs font-bold text-slate-500 flex justify-between">
            <span>Daftar Leads ({inquiries.length})</span>
            <span>Urutkan: Terbaru</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-8 text-center text-slate-400 text-xs animate-pulse">Memuat data...</div>
            ) : inquiries.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">Tidak ada data penawaran.</div>
            ) : (
              inquiries.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full p-4 text-left transition-colors cursor-pointer block ${
                    activeInquiryId === item.id ? 'bg-[#EBF4FC]/70 border-l-3 border-[#0B4F8A]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-[#0B4F8A]">{item.quoteNumber}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{item.fullName}</h4>
                  <p className="text-xs text-slate-500 truncate">{item.companyName} • {item.city}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-700 font-medium truncate">{item.interestedProduct}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.status}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-7 h-full min-h-0">
          <InquiryDetailPane inquiryId={activeInquiryId} />
        </div>
      </div>
    </div>
  );
};
export default InquiriesPage;
