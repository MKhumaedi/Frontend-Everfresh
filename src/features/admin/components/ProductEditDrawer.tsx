import React, { useState } from 'react';
import { ProductData, CategoryData } from '../../../types/public.js';
import { useCreateProduct, useUpdateProduct } from '../api/productsApi.js';
import { useToast } from '../../../hooks/useToast.js';
import { ProductEditSpecsGrid } from './ProductEditSpecsGrid.js';
import { ProductEditSeoCard } from './ProductEditSeoCard.js';
import { X, Save } from 'lucide-react';

interface ProductEditDrawerProps {
  product: ProductData | null;
  categories: CategoryData[];
  onClose: () => void;
}

export const ProductEditDrawer: React.FC<ProductEditDrawerProps> = ({
  product,
  categories,
  onClose,
}) => {
  const { showToast } = useToast();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [formData, setFormData] = useState<Partial<ProductData>>(() => ({
    name: product?.name || '',
    categoryId: product?.categoryId || categories[0]?.id || '',
    tagline: product?.tagline || '',
    description: product?.description || '',
    capacityTons: product?.capacityTons || 10,
    powerKw: product?.powerKw || 35,
    refrigerant: product?.refrigerant || 'R404A',
    compressorBrand: product?.compressorBrand || 'Bitzer Semi-Hermetic',
    dimensions: product?.dimensions || '2.8m x 1.6m x 2.2m',
    isFeatured: product?.isFeatured ?? false,
    isActive: product?.isActive ?? true,
    faqs: product?.faqs || [{ question: 'Berapa lama panen es?', answer: '20-25 menit per siklus.' }],
    images: product?.images || ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'],
  }));

  const [metaTitle, setMetaTitle] = useState(product?.name || '');
  const [metaDesc, setMetaDesc] = useState(product?.tagline || '');
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof ProductData, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!formData.name) return showToast({ type: 'error', title: 'Nama produk wajib diisi' });
    try {
      if (product?.id) {
        await updateProduct.mutateAsync({ id: product.id, data: formData });
        showToast({ type: 'success', title: 'Produk berhasil diperbarui' });
      } else {
        await createProduct.mutateAsync(formData);
        showToast({ type: 'success', title: 'Produk baru berhasil dibuat' });
      }
      setIsDirty(false);
      onClose();
    } catch (e: any) {
      showToast({ type: 'error', title: e.message || 'Gagal menyimpan produk' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {product ? `Edit: ${product.name}` : 'Tambah Mesin Baru'}
            </h3>
            <p className="text-[11px] text-slate-500">Spesifikasi teknis dan integrasi SEO.</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-800 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDirty && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-xs font-semibold text-amber-800 flex justify-between">
            <span>Perubahan belum disimpan</span>
            <button onClick={handleSave} className="underline font-bold">Simpan</button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <ProductEditSpecsGrid formData={formData} categories={categories} onChange={handleChange} />
          <ProductEditSeoCard
            metaTitle={metaTitle}
            metaDesc={metaDesc}
            onChangeTitle={(v) => { setMetaTitle(v); setIsDirty(true); }}
            onChangeDesc={(v) => { setMetaDesc(v); setIsDirty(true); }}
          />
        </div>

        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={formData.isActive} onChange={(e) => handleChange('isActive', e.target.checked)} />
              <span className="font-semibold text-slate-700">Aktif</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={formData.isFeatured} onChange={(e) => handleChange('isFeatured', e.target.checked)} />
              <span className="font-semibold text-slate-700">Unggulan</span>
            </label>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Produk</span>
          </button>
        </div>
      </div>
    </div>
  );
};
