import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api/client.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { Activity, Shield, Search } from 'lucide-react';

interface ActivityLogItem {
  id: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
  user?: { id: string; name: string; email: string; role: string };
}

export const ActivityLogsAdminPage: React.FC = () => {
  const [filterAction, setFilterAction] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'activity-logs', filterAction],
    queryFn: async () => {
      const q = filterAction ? `?action=${encodeURIComponent(filterAction)}` : '';
      const res = await apiClient<{ items: ActivityLogItem[]; total: number }>(`/activity-logs${q}`);
      return res.data || { items: [], total: 0 };
    },
  });

  const logs = data?.items || [];

  return (
    <div className="space-y-6">
      <SEOHead title="Log Aktivitas Sistem - CMS Admin" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Audit Trail & Log Aktivitas</h1>
          <p className="text-xs text-slate-500">Rekam jejak setiap aksi administratif, perubahan data, dan otentikasi.</p>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-sky-50 text-[#0B4F8A] border border-sky-200 flex items-center gap-1">
          <Shield className="w-3.5 h-3.5" />
          <span>SUPERADMIN ONLY</span>
        </span>
      </div>

      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter aksi (misal: CREATE_USER, LOGIN, UPDATE...)"
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="w-full text-xs outline-hidden"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-slate-400">Memuat log aktivitas...</div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">Belum ada riwayat aktivitas.</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <Activity className="w-3.5 h-3.5 text-[#0B4F8A]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.user?.name || 'Sistem Otomatis'}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                      {log.action}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{log.targetType}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    {log.user?.email || 'N/A'} {log.ipAddress ? `• IP: ${log.ipAddress}` : ''}
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {new Date(log.createdAt).toLocaleString('id-ID')}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default ActivityLogsAdminPage;
