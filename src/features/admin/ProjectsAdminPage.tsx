import React, { useState } from 'react';
import { useAdminProjects, useSaveProject, useDeleteProject } from './api/contentApi.js';
import { ProjectEditModal } from './components/ProjectEditModal.js';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ProjectData } from '../../types/public.js';
import { useToast } from '../../hooks/useToast.js';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

export const ProjectsAdminPage: React.FC = () => {
  const { showToast } = useToast();
  const { data: projects = [], isLoading } = useAdminProjects();
  const saveProject = useSaveProject();
  const deleteProject = useDeleteProject();

  const [searchTerm, setSearchTerm] = useState('');
  const [editing, setEditing] = useState<Partial<ProjectData> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.clientName) return showToast({ type: 'error', title: 'Data belum lengkap' });
    try {
      await saveProject.mutateAsync({ id: editing.id, data: editing });
      showToast({ type: 'success', title: 'Data proyek berhasil disimpan' });
      setEditing(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menyimpan proyek' });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProject.mutateAsync(deleteId);
      showToast({ type: 'success', title: 'Proyek berhasil dihapus' });
      setDeleteId(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menghapus proyek' });
    }
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Proyek & Portofolio - CMS Admin" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Proyek & Studi Kasus</h1>
          <p className="text-xs text-slate-500">Kelola portofolio instalasi mesin es dan cold storage terpasang.</p>
        </div>
        <button
          onClick={() => setEditing({ title: '', clientName: '', location: '', capacity: '10 Ton / 24 Jam', summary: '', description: '', status: 'PUBLISHED', isFeatured: true })}
          className="px-4 py-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Studi Kasus</span>
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari judul proyek atau klien..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-xs animate-pulse">Memuat proyek...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">Belum ada portofolio proyek.</div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Judul Instalasi</th>
                <th className="p-4">Klien & Lokasi</th>
                <th className="p-4">Kapasitas</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60">
                  <td className="p-4 font-bold text-slate-900">{p.title}</td>
                  <td className="p-4 text-slate-600">
                    <div>{p.clientName}</div>
                    <div className="text-[10px] text-slate-400">{p.location}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-[#0B4F8A]">{p.capacity}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => setEditing(p)} className="p-1.5 text-slate-500 hover:text-[#0B4F8A] rounded cursor-pointer">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-slate-500 hover:text-rose-600 rounded cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ProjectEditModal
        editing={editing}
        onClose={() => setEditing(null)}
        onChange={(field, val) => setEditing((p) => ({ ...p, [field]: val }))}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Hapus Proyek"
        message="Apakah Anda yakin ingin menghapus data studi kasus proyek ini?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
export default ProjectsAdminPage;
