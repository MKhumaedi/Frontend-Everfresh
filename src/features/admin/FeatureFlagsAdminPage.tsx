import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api/client.js';
import { useToast } from '../../hooks/useToast.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ToggleLeft, ToggleRight, Sliders, Shield } from 'lucide-react';

interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description?: string;
  isEnabled: boolean;
  updatedAt: string;
}

export const FeatureFlagsAdminPage: React.FC = () => {
  const { showToast } = useToast();
  const qc = useQueryClient();

  const { data: flags = [], isLoading } = useQuery({
    queryKey: ['admin', 'feature-flags'],
    queryFn: async () => {
      const res = await apiClient<FeatureFlag[]>('/feature-flags');
      return res.data || [];
    },
  });

  const toggleFlag = useMutation({
    mutationFn: async ({ key, isEnabled }: { key: string; isEnabled: boolean }) => {
      const res = await apiClient<FeatureFlag>(`/feature-flags/${key}`, {
        method: 'PATCH',
        body: JSON.stringify({ isEnabled }),
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'feature-flags'] });
      showToast({ type: 'success', title: 'Status fitur berhasil diperbarui' });
    },
  });

  return (
    <div className="space-y-6">
      <SEOHead title="Feature Flags & Konfigurasi Fitur - CMS Admin" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Feature Flags & Konfigurasi Fitur</h1>
          <p className="text-xs text-slate-500">Khusus SUPERADMIN: kendalikan modul publik secara langsung.</p>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-sky-50 text-[#0B4F8A] border border-sky-200 flex items-center gap-1">
          <Shield className="w-3.5 h-3.5" />
          <span>SUPERADMIN ONLY</span>
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-slate-400">Memuat konfigurasi fitur...</div>
        ) : flags.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">Belum ada feature flags terdaftar.</div>
        ) : (
          flags.map((flag) => (
            <div key={flag.key} className="p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Sliders className="w-4 h-4 text-[#0B4F8A]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{flag.name}</h4>
                    <span className="font-mono text-[10px] text-slate-400">({flag.key})</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{flag.description || 'Tidak ada deskripsi.'}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFlag.mutate({ key: flag.key, isEnabled: !flag.isEnabled })}
                disabled={toggleFlag.isPending}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  flag.isEnabled ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {flag.isEnabled ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                <span>{flag.isEnabled ? 'Aktif' : 'Nonaktif'}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default FeatureFlagsAdminPage;
