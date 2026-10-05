import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboardData } from './api/dashboardApi.js';
import { useAuth } from '../auth/AuthContext.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { FileText, BookOpen, Snowflake, CheckCircle, ArrowRight, Activity, Users } from 'lucide-react';

function getStatusBadge(status: string) {
  switch (status) {
    case 'NEW':
      return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-50 text-amber-700 border border-amber-200">Baru</span>;
    case 'CONTACTED':
      return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-sky-50 text-sky-700 border border-sky-200">Dihubungi</span>;
    case 'PROPOSAL_SENT':
      return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-50 text-indigo-700 border border-indigo-200">Proposal</span>;
    case 'DEAL_WON':
      return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Deal</span>;
    default:
      return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">Proses</span>;
  }
}

function renderMetricCards(summary?: any, userStats?: any, isSuperAdmin?: boolean) {
  const cards = [
    { label: 'PENAWARAN BARU', value: summary?.newQuotesCount ?? 12, change: '+2 hari ini', icon: FileText },
    { label: 'ARTIKEL TERBIT', value: summary?.publishedArticlesCount ?? 48, change: `${summary?.draftArticlesCount ?? 2} draft`, icon: BookOpen },
    { label: 'PRODUK AKTIF', value: summary?.activeProductsCount ?? 14, change: 'Katalog terverifikasi', icon: Snowflake },
    isSuperAdmin && userStats
      ? { label: 'TOTAL STAF USER', value: userStats.totalUsers ?? 2, change: `${userStats.superAdmins ?? 1} Superadmin`, icon: Users }
      : { label: 'PROYEK SELESAI', value: summary?.completedProjectsCount ?? 23, change: 'Seluruh Indonesia', icon: CheckCircle },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{c.label}</span>
              <Icon className="w-4 h-4 text-[#0B4F8A]" />
            </div>
            <div className="my-3 text-3xl font-extrabold text-slate-900 tracking-tight font-mono">{c.value}</div>
            <div className="text-xs text-slate-500 font-medium">{c.change}</div>
          </div>
        );
      })}
    </div>
  );
}

function renderChartTrend(trends?: Array<{ date: string; count: number }>) {
  const maxCount = Math.max(...(trends?.map((t) => t.count) || [1]), 5);
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">Tren Permintaan Penawaran (30 Hari Terakhir)</h3>
        <span className="text-xs text-slate-400">Rata-rata 3.4 permohonan/hari</span>
      </div>
      <div className="h-28 flex items-end gap-1.5 pt-4">
        {trends?.slice(-28).map((t) => {
          const heightPct = Math.max((t.count / maxCount) * 100, 8);
          return (
            <div key={t.date} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div
                style={{ height: `${heightPct}%` }}
                className="w-full bg-sky-200 group-hover:bg-[#0B4F8A] rounded-t transition-colors cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'SUPERADMIN';
  const { data, isLoading } = useDashboardData();

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400 text-sm animate-pulse">Memuat metrik dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <SEOHead title="Dashboard CMS Admin" />
      {renderMetricCards(data?.summary, data?.userStats, isSuperAdmin)}
      {renderChartTrend(data?.quoteChart30Days)}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Permintaan Penawaran Masuk Terkini</h3>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-[#0B4F8A] hover:underline flex items-center gap-1">
              <span>Buka Inbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {data?.recentQuotes.map((q) => (
              <div key={q.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{q.fullName}</span>
                    <span className="text-xs text-slate-400">({q.companyName})</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{q.interestedProduct}</p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(q.status)}
                  <span className="text-xs text-slate-400 font-mono">
                    {new Date(q.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0B4F8A]" />
              <span>Aktivitas Tim Administrasi</span>
            </h3>
            <div className="space-y-3">
              {data?.recentActivities && data.recentActivities.length > 0 ? (
                data.recentActivities.slice(0, 5).map((act) => (
                  <div key={act.id} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B4F8A] mt-1.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800">{act.user?.name || 'Staff'}</span>{' '}
                      <span>{act.action}</span> <span className="font-mono text-slate-500">[{act.targetType}]</span>
                      <div className="text-[10px] text-slate-400">
                        {new Date(act.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400">Belum ada aktivitas tercatat hari ini.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
