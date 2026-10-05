import React, { useState } from 'react';
import { useAdminArticles, useSaveArticle, useDeleteArticle } from './api/contentApi.js';
import { ArticleEditModal } from './components/ArticleEditModal.js';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ArticleData } from '../../types/public.js';
import { useToast } from '../../hooks/useToast.js';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const ArticlesAdminPage: React.FC = () => {
  const { showToast } = useToast();
  const { data: articles = [], isLoading } = useAdminArticles();
  const saveArticle = useSaveArticle();
  const deleteArticle = useDeleteArticle();

  const [editing, setEditing] = useState<Partial<ArticleData> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.category || !editing?.content) {
      return showToast({ type: 'error', title: 'Data artikel belum lengkap' });
    }
    try {
      await saveArticle.mutateAsync({ id: editing.id, data: editing });
      showToast({ type: 'success', title: 'Artikel berhasil disimpan' });
      setEditing(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menyimpan artikel' });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteArticle.mutateAsync(deleteId);
      showToast({ type: 'success', title: 'Artikel berhasil dihapus' });
      setDeleteId(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menghapus artikel' });
    }
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Berita & Artikel - CMS Admin" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Berita & Pusat Edukasi</h1>
          <p className="text-xs text-slate-500">Kelola wawasan industri pendingin dan artikel riset pabrik es.</p>
        </div>
        <button
          onClick={() => setEditing({ title: '', category: 'Bisnis & Investasi', excerpt: '', content: '', readTimeMin: 5, coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800' })}
          className="px-4 py-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-xs animate-pulse">Memuat artikel...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">Belum ada artikel yang diterbitkan.</div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Judul Artikel</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Estimasi Baca</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/60">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 line-clamp-1">{a.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{a.excerpt}</div>
                  </td>
                  <td className="p-4 font-semibold text-[#0B4F8A]">{a.category}</td>
                  <td className="p-4 text-slate-600">{a.readTimeMin || 5} Menit</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => setEditing(a)} className="p-1.5 text-slate-500 hover:text-[#0B4F8A] rounded cursor-pointer">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDeleteId(a.id)} className="p-1.5 text-slate-500 hover:text-rose-600 rounded cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ArticleEditModal
        editing={editing}
        onClose={() => setEditing(null)}
        onChange={(field, val) => setEditing((p) => ({ ...p, [field]: val }))}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Hapus Artikel"
        message="Apakah Anda yakin ingin menghapus artikel publikasi ini?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
export default ArticlesAdminPage;
