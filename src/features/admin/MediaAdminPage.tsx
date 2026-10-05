import React, { useState, useRef } from 'react';
import { useAdminMedia, useUploadMedia, useDeleteMedia, MediaItem } from './api/systemApi.js';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { useToast } from '../../hooks/useToast.js';
import { Upload, Search, Copy, Trash2, X } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];

export const MediaAdminPage: React.FC = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: mediaList = [], isLoading } = useAdminMedia(searchTerm);
  const uploadMedia = useUploadMedia();
  const deleteMedia = useDeleteMedia();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      showToast({ type: 'error', title: 'Ukuran file melebihi batas 5MB' });
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      showToast({ type: 'error', title: 'Format tidak didukung. Gunakan JPG, PNG, WEBP, atau SVG' });
      return;
    }
    try {
      await uploadMedia.mutateAsync(file);
      showToast({ type: 'success', title: 'Berkas berhasil diunggah' });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      showToast({ type: 'error', title: 'Gagal mengunggah berkas' });
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    showToast({ type: 'success', title: 'Tautan URL disalin ke clipboard' });
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMedia.mutateAsync(deleteId);
      showToast({ type: 'success', title: 'Berkas media dihapus' });
      if (selectedMedia?.id === deleteId) setSelectedMedia(null);
      setDeleteId(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menghapus media' });
    }
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Media Library - CMS Admin" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Media Library</h1>
          <p className="text-xs text-slate-500">Maksimal 5MB per berkas (Format: JPG, PNG, WEBP, SVG).</p>
        </div>
        <div>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={handleFileChange} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadMedia.isPending}
            className="px-4 py-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{uploadMedia.isPending ? 'Mengunggah...' : 'Unggah Berkas Baru'}</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari nama berkas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading ? (
          <div className="col-span-full p-8 text-center text-slate-400 text-xs animate-pulse">Memuat media...</div>
        ) : mediaList.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200">
            Belum ada berkas media. Klik "Unggah Berkas Baru" di atas.
          </div>
        ) : (
          mediaList.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMedia(m)}
              className={`group bg-white rounded-xl overflow-hidden border cursor-pointer transition-all ${
                selectedMedia?.id === m.id ? 'border-[#0B4F8A] ring-2 ring-sky-200' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="h-28 bg-slate-100 overflow-hidden">
                <img src={m.url} alt={m.altText || m.originalName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-2 text-[10px] text-slate-600 truncate font-medium">
                {m.originalName}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedMedia && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-slate-200 shadow-2xl p-6 z-50 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Rincian Berkas</h3>
              <button onClick={() => setSelectedMedia(null)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-40 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              <img src={selectedMedia.url} alt={selectedMedia.originalName} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Nama Berkas</span>
                <span className="font-semibold text-slate-800 break-all">{selectedMedia.originalName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Ukuran File</span>
                <span className="font-mono text-slate-800">{(selectedMedia.sizeBytes / 1024).toFixed(1)} KB</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Format MIME</span>
                <span className="font-mono text-slate-800">{selectedMedia.mimeType}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => copyUrl(selectedMedia.url)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin URL Gambar</span>
            </button>
            <button
              onClick={() => setDeleteId(selectedMedia.id)}
              className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Berkas</span>
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Hapus Berkas Media"
        message="Apakah Anda yakin ingin menghapus gambar ini secara permanen?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
export default MediaAdminPage;
