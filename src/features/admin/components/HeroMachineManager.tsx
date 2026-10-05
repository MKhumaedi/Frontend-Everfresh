import React, { useState } from 'react';
import { HeroMachineData } from '../../../types/public.js';
import {
  useAdminHeroMachines,
  useSaveHeroMachine,
  useReorderHeroMachines,
} from '../api/heroMachinesApi.js';
import { useUploadMedia } from '../api/systemApi.js';
import { HeroMachineModal } from './HeroMachineModal.js';
import { useToast } from '../../../hooks/useToast.js';
import { defaultHeroMachines } from '../../public/home/hero.config.js';
import { Plus, ArrowUp, ArrowDown, Eye, EyeOff, Edit2 } from 'lucide-react';

export const HeroMachineManager: React.FC = () => {
  const { showToast } = useToast();
  const { data: apiMachines = [] } = useAdminHeroMachines();
  const machines = apiMachines.length > 0 ? apiMachines : defaultHeroMachines;

  const saveMachine = useSaveHeroMachine();
  const reorderMachines = useReorderHeroMachines();
  const uploadMedia = useUploadMedia();

  const [editing, setEditing] = useState<Partial<HeroMachineData> | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadMedia.mutateAsync(file);
      if (res?.url) setEditing((p) => ({ ...p, imageUrl: res.url }));
      showToast({ type: 'success', title: 'Foto mesin berhasil diunggah' });
    } catch {
      showToast({ type: 'error', title: 'Gagal mengunggah foto' });
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= machines.length) return;
    const updated = [...machines];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIdx, 0, moved);
    reorderMachines.mutate(updated.map((m, idx) => ({ id: m.id, sortOrder: idx + 1 })));
    showToast({ type: 'success', title: 'Urutan mesin diperbarui' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.name || !editing?.imageUrl) {
      return showToast({ type: 'error', title: 'Nama dan foto mesin wajib diisi' });
    }
    try {
      await saveMachine.mutateAsync({ id: editing.id, data: editing });
      showToast({ type: 'success', title: 'Data mesin berhasil disimpan' });
      setEditing(null);
    } catch {
      showToast({ type: 'error', title: 'Gagal menyimpan mesin' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Daftar Foto & Unit Mesin Hero</h3>
          <p className="text-xs text-slate-500">Unit mesin yang tampil berputar pada banner utama beranda.</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ key: 'custom', label: 'Unit Baru', name: 'Mesin Es Kustom', tagline: 'Kapasitas Kustom', imageUrl: '', isActive: true, sortOrder: machines.length + 1 })}
          className="px-3 py-1.5 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Gambar Mesin</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
        {machines.map((m, idx) => (
          <div key={m.id || m.key} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#F4F8FB] border border-slate-200 p-1 flex items-center justify-center overflow-hidden shrink-0">
                <img src={m.imageUrl} alt={m.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{m.name}</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-sky-50 text-[#0B4F8A] border border-sky-200">{m.label}</span>
                </div>
                <span className="text-[11px] text-slate-500 block">{m.tagline || '-'}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => saveMachine.mutate({ id: m.id, data: { isActive: !m.isActive } })}
                className={`p-1.5 rounded cursor-pointer ${m.isActive ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}
                title={m.isActive ? 'Nonaktifkan' : 'Aktifkan'}
              >
                {m.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer"
                title="Pindah Ke Atas"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === machines.length - 1}
                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer"
                title="Pindah Ke Bawah"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setEditing(m)}
                className="p-1.5 text-slate-500 hover:text-[#0B4F8A] hover:bg-sky-50 rounded cursor-pointer"
                title="Edit Mesin"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <HeroMachineModal
        editing={editing}
        onClose={() => setEditing(null)}
        onChange={(field, val) => setEditing((p) => ({ ...p, [field]: val }))}
        onFileUpload={handleFileUpload}
        onSubmit={handleSave}
      />
    </div>
  );
};
