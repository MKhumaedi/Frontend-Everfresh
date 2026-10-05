import React, { useState } from 'react';
import { useAdminServices, useSaveService, useDeleteService } from './api/contentApi.js';
import { ServiceEditModal } from './components/ServiceEditModal.js';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ServiceData } from '../../types/public.js';
import { useToast } from '../../hooks/useToast.js';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const ServicesAdminPage: React.FC = () => {
  const { showToast } = useToast();
  const { data: services = [], isLoading } = useAdminServices();
  const saveService = useSaveService();
  const deleteService = useDeleteService();

  const [editing, setEditing] = useState<Partial<ServiceData> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.description) return showToast({ type: 'error', title: 'Data belum lengkap' });
    try {
      await saveService.mutateAsync({ id: editing.id, data: editing });
      showToast({ type: 'success', title: 'Layanan berhasil disimpan' });
      setEditing(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menyimpan layanan' });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteService.mutateAsync(deleteId);
      showToast({ type: 'success', title: 'Layanan berhasil dihapus' });
      setDeleteId(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menghapus layanan' });
    }
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Layanan Rekayasa - CMS Admin" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Layanan Rekayasa & Servis</h1>
          <p className="text-xs text-slate-500">Kelola lingkup pekerjaan fabrikasi, cold storage, dan pemeliharaan.</p>
        </div>
        <button
          onClick={() => setEditing({ title: '', tagline: '', description: '', status: 'PUBLISHED', isFeatured: true })}
          className="px-4 py-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-xs animate-pulse">Memuat layanan...</div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">Belum ada layanan.</div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Nama Layanan</th>
                <th className="p-4">Tagline</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60">
                  <td className="p-4 font-bold text-slate-900">{s.title}</td>
                  <td className="p-4 text-slate-600 truncate max-w-xs">{s.tagline || '-'}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => setEditing(s)} className="p-1.5 text-slate-500 hover:text-[#0B4F8A] rounded cursor-pointer">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDeleteId(s.id)} className="p-1.5 text-slate-500 hover:text-rose-600 rounded cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ServiceEditModal
        editing={editing}
        onClose={() => setEditing(null)}
        onChange={(field, val) => setEditing((p) => ({ ...p, [field]: val }))}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Hapus Layanan"
        message="Apakah Anda yakin ingin menghapus data layanan ini?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
export default ServicesAdminPage;
