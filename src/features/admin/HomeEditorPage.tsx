import React, { useState, useEffect } from 'react';
import {
  useAdminHomeSections,
  useToggleSection,
  useReorderSections,
  useAdminHero,
  useSaveHero,
} from './api/systemApi.js';
import { HeroLivePreview } from './components/HeroLivePreview.js';
import { SectionReorderList } from './components/SectionReorderList.js';
import { HeroMachineManager } from './components/HeroMachineManager.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { useToast } from '../../hooks/useToast.js';
import { Save } from 'lucide-react';
import { HomeSectionData, HeroBannerData } from '../../types/public.js';

export const HomeEditorPage: React.FC = () => {
  const { showToast } = useToast();
  const { data: sections = [] } = useAdminHomeSections();
  const toggleSection = useToggleSection();
  const reorderSections = useReorderSections();

  const { data: heroBanners = [] } = useAdminHero();
  const saveHero = useSaveHero();

  const [activeTab, setActiveTab] = useState<'hero' | 'machines' | 'sections'>('hero');
  const [heroForm, setHeroForm] = useState<Partial<HeroBannerData>>({});
  const [localSections, setLocalSections] = useState<HomeSectionData[]>([]);

  useEffect(() => {
    if (heroBanners.length > 0) setHeroForm(heroBanners[0]);
  }, [heroBanners]);

  useEffect(() => {
    setLocalSections([...sections].sort((a, b) => a.sortOrder - b.sortOrder));
  }, [sections]);

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= localSections.length) return;
    const updated = [...localSections];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIdx, 0, moved);
    const reordered = updated.map((s, idx) => ({ ...s, sortOrder: idx + 1 }));
    setLocalSections(reordered);
    reorderSections.mutate(reordered.map((s) => ({ sectionKey: s.sectionKey, sortOrder: s.sortOrder })));
    showToast({ type: 'success', title: 'Urutan section berhasil diubah' });
  };

  const handleSaveHero = async () => {
    try {
      await saveHero.mutateAsync({ id: heroForm.id, data: heroForm });
      showToast({ type: 'success', title: 'Hero banner berhasil disimpan' });
    } catch {
      showToast({ type: 'error', title: 'Gagal menyimpan banner' });
    }
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Editor Halaman Beranda - CMS Admin" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Editor Halaman Beranda</h1>
          <p className="text-xs text-slate-500">Sesuaikan tata letak komponen, teks banner, dan foto produk mesin.</p>
        </div>
        <div className="flex gap-1 bg-slate-200 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${activeTab === 'hero' ? 'bg-white text-[#0B4F8A] shadow-xs' : 'text-slate-600'}`}
          >
            Banner Teks
          </button>
          <button
            onClick={() => setActiveTab('machines')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${activeTab === 'machines' ? 'bg-white text-[#0B4F8A] shadow-xs' : 'text-slate-600'}`}
          >
            Gambar Mesin
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${activeTab === 'sections' ? 'bg-white text-[#0B4F8A] shadow-xs' : 'text-slate-600'}`}
          >
            Urutan Section ({localSections.length})
          </button>
        </div>
      </div>

      {activeTab === 'hero' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Formulir Konten Hero Banner</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Badge Atas</label>
              <input
                value={heroForm.badgeText || ''}
                onChange={(e) => setHeroForm((p) => ({ ...p, badgeText: e.target.value }))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Headline Utama *</label>
              <textarea
                rows={2}
                value={heroForm.headline || ''}
                onChange={(e) => setHeroForm((p) => ({ ...p, headline: e.target.value }))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subheadline</label>
              <textarea
                rows={3}
                value={heroForm.subheadline || ''}
                onChange={(e) => setHeroForm((p) => ({ ...p, subheadline: e.target.value }))}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teks Tombol Hijau</label>
                <input
                  value={heroForm.ctaPrimaryText || ''}
                  onChange={(e) => setHeroForm((p) => ({ ...p, ctaPrimaryText: e.target.value }))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Link Tombol Hijau</label>
                <input
                  value={heroForm.ctaPrimaryLink || ''}
                  onChange={(e) => setHeroForm((p) => ({ ...p, ctaPrimaryLink: e.target.value }))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <button
              onClick={handleSaveHero}
              disabled={saveHero.isPending}
              className="w-full bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan Banner</span>
            </button>
          </div>
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <HeroLivePreview banner={heroForm} />
          </div>
        </div>
      ) : activeTab === 'machines' ? (
        <HeroMachineManager />
      ) : (
        <SectionReorderList
          sections={localSections}
          onToggle={(key) => toggleSection.mutate(key)}
          onMove={handleMove}
        />
      )}
    </div>
  );
};
export default HomeEditorPage;
