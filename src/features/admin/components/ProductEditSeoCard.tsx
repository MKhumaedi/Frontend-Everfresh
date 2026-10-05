import React from 'react';

interface ProductEditSeoCardProps {
  metaTitle: string;
  metaDesc: string;
  onChangeTitle: (val: string) => void;
  onChangeDesc: (val: string) => void;
}

export const ProductEditSeoCard: React.FC<ProductEditSeoCardProps> = ({
  metaTitle,
  metaDesc,
  onChangeTitle,
  onChangeDesc,
}) => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">SEO & Metadata</h4>
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Meta Title ({metaTitle.length}/60)</span>
        </div>
        <input
          value={metaTitle}
          onChange={(e) => onChangeTitle(e.target.value.slice(0, 60))}
          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden"
          placeholder="Judul produk untuk Google"
        />
      </div>
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Meta Description ({metaDesc.length}/160)</span>
        </div>
        <textarea
          rows={2}
          value={metaDesc}
          onChange={(e) => onChangeDesc(e.target.value.slice(0, 160))}
          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden"
          placeholder="Deskripsi singkat produk untuk search engine"
        />
      </div>
    </div>
  );
};
