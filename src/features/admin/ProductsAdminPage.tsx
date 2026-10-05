import React, { useState } from 'react';
import { useAdminProducts, useAdminCategories, useUpdateProduct, useDeleteProduct } from './api/productsApi.js';
import { ProductEditDrawer } from './components/ProductEditDrawer.js';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { ProductData } from '../../types/public.js';
import { useToast } from '../../hooks/useToast.js';
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';

export const ProductsAdminPage: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: categories = [] } = useAdminCategories();
  const { data: productData, isLoading } = useAdminProducts({ search: searchTerm, categoryId: selectedCatId });
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const products = productData?.items || [];

  const handleToggleActive = async (prod: ProductData) => {
    try {
      await updateProduct.mutateAsync({ id: prod.id, data: { isActive: !prod.isActive } });
      showToast({ type: 'success', title: `Status produk berhasil diubah` });
    } catch {
      showToast({ type: 'error', title: 'Gagal mengubah status' });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct.mutateAsync(deleteId);
      showToast({ type: 'success', title: 'Produk berhasil dihapus' });
      setDeleteId(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menghapus produk' });
    }
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Katalog Produk - CMS Admin" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Katalog Mesin & Cold Storage</h1>
          <p className="text-xs text-slate-500">Kelola spesifikasi teknis, harga, gambar, dan status publikasi.</p>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setIsDrawerOpen(true); }}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mesin Baru</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari tipe mesin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#0B4F8A]"
          />
        </div>
        <select
          value={selectedCatId}
          onChange={(e) => setSelectedCatId(e.target.value)}
          className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden text-slate-700"
        >
          <option value="">Semua Kategori</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-xs animate-pulse">Memuat data produk...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">Belum ada data mesin es.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Nama Mesin</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Kapasitas</th>
                  <th className="p-4">Kompresor</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[10px] text-slate-400">{p.slug}</div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{p.category?.name || '-'}</td>
                    <td className="p-4 font-mono font-bold text-slate-800">{p.capacityTons ? `${p.capacityTons} Ton` : '-'}</td>
                    <td className="p-4 text-slate-600">{p.compressorBrand || 'Bitzer'}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(p)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                          p.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {p.isActive ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => { setEditingProduct(p); setIsDrawerOpen(true); }}
                        className="p-1.5 text-slate-500 hover:text-[#0B4F8A] hover:bg-sky-50 rounded cursor-pointer"
                        title="Edit Produk"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isDrawerOpen && (
        <ProductEditDrawer
          product={editingProduct}
          categories={categories}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Hapus Produk Mesin"
        message="Apakah Anda yakin ingin menghapus data mesin ini dari katalog publik?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
export default ProductsAdminPage;
