import React, { useState, useEffect } from 'react';
import { useAdminSettings, useUpdateSettings, useAdminOffices } from './api/systemApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { useToast } from '../../hooks/useToast.js';
import { Save, Building, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { SiteSettingData } from '../../types/public.js';

export const SettingsAdminPage: React.FC = () => {
  const { showToast } = useToast();
  const { data: settings } = useAdminSettings();
  const { data: offices = [] } = useAdminOffices();
  const updateSettings = useUpdateSettings();

  const [form, setForm] = useState<Partial<SiteSettingData>>({});

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings.mutateAsync(form);
      showToast({ type: 'success', title: 'Pengaturan website berhasil disimpan' });
    } catch {
      showToast({ type: 'error', title: 'Gagal menyimpan pengaturan' });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <SEOHead title="Pengaturan Website - CMS Admin" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Pengaturan Website & Kontak</h1>
          <p className="text-xs text-slate-500">Konfigurasi nomor WhatsApp konsultasi, email sales, dan kantor cabang.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#0B4F8A]" />
            <span>Identitas Perusahaan & Kontak Utama</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Nama Perusahaan / Merk</label>
              <input
                value={form.siteName || ''}
                onChange={(e) => setForm((p) => ({ ...p, siteName: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Tagline Industri</label>
              <input
                value={form.tagline || ''}
                onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Nomor WhatsApp Konsultasi *</label>
              <input
                value={form.whatsappNumber || ''}
                onChange={(e) => setForm((p) => ({ ...p, whatsappNumber: e.target.value }))}
                placeholder="+628118899721"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Telepon Kantor Konsultasi</label>
              <input
                value={form.consultationPhone || ''}
                onChange={(e) => setForm((p) => ({ ...p, consultationPhone: e.target.value }))}
                placeholder="+62 21 8990 4120"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Email Sales & Penawaran</label>
              <input
                value={form.salesEmail || ''}
                onChange={(e) => setForm((p) => ({ ...p, salesEmail: e.target.value }))}
                placeholder="sales@everfresh-ice.co.id"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Jam Operasional Pelayanan</label>
              <input
                value={form.operationalHours || ''}
                onChange={(e) => setForm((p) => ({ ...p, operationalHours: e.target.value }))}
                placeholder="Senin - Sabtu: 08:00 - 17:00 WIB"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={updateSettings.isPending}
              className="px-5 py-2.5 bg-[#0B4F8A] hover:bg-[#083a66] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan Kontak</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0B4F8A]" />
            <span>Daftar Kantor Cabang & Fasilitas Workshop ({offices.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offices.map((o) => (
              <div key={o.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{o.city}</h4>
                  {o.isHeadquarters && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-[#0B4F8A]">HQ</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">{o.officeType}</p>
                <p className="text-slate-600 line-clamp-2">{o.address}</p>
                <p className="font-mono text-slate-700 font-semibold">{o.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
export default SettingsAdminPage;
