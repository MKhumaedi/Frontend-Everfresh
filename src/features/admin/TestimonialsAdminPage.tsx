import React, { useState } from 'react';
import { useAdminTestimonials, useSaveTestimonial, useDeleteTestimonial } from './api/contentApi.js';
import { TestimonialEditModal } from './components/TestimonialEditModal.js';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { TestimonialData } from '../../types/public.js';
import { useToast } from '../../hooks/useToast.js';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';

export const TestimonialsAdminPage: React.FC = () => {
  const { showToast } = useToast();
  const { data: testimonials = [], isLoading } = useAdminTestimonials();
  const saveTestimonial = useSaveTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [editing, setEditing] = useState<Partial<TestimonialData> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.clientName || !editing?.company || !editing?.content) {
      return showToast({ type: 'error', title: 'Data belum lengkap' });
    }
    try {
      await saveTestimonial.mutateAsync({ id: editing.id, data: editing });
      showToast({ type: 'success', title: 'Testimoni berhasil disimpan' });
      setEditing(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menyimpan testimoni' });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteTestimonial.mutateAsync(deleteId);
      showToast({ type: 'success', title: 'Testimoni berhasil dihapus' });
      setDeleteId(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menghapus testimoni' });
    }
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Testimoni Klien - CMS Admin" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Testimoni Klien</h1>
          <p className="text-xs text-slate-500">Ulasan kepuasan dari pemilik pabrik es dan eksportir seafood.</p>
        </div>
        <button
          onClick={() => setEditing({ clientName: '', company: '', role: 'Direktur Operasional', content: '', rating: 5, status: 'PUBLISHED', isFeatured: true })}
          className="px-4 py-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-xs animate-pulse">Memuat testimoni...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">Belum ada testimoni.</div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Klien & Perusahaan</th>
                <th className="p-4">Ulasan Singkat</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{t.clientName}</div>
                    <div className="text-[10px] text-slate-400">{t.role} • {t.company}</div>
                  </td>
                  <td className="p-4 text-slate-600 line-clamp-1 max-w-md">"{t.content}"</td>
                  <td className="p-4">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => setEditing(t)} className="p-1.5 text-slate-500 hover:text-[#0B4F8A] rounded cursor-pointer">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDeleteId(t.id)} className="p-1.5 text-slate-500 hover:text-rose-600 rounded cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <TestimonialEditModal
        editing={editing}
        onClose={() => setEditing(null)}
        onChange={(field, val) => setEditing((p) => ({ ...p, [field]: val }))}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Hapus Testimoni"
        message="Apakah Anda yakin ingin menghapus data testimoni klien ini?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
export default TestimonialsAdminPage;
