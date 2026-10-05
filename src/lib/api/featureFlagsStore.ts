export interface FeatureFlagItem {
  id: string;
  key: string;
  name: string;
  description?: string;
  isEnabled: boolean;
  updatedAt: string;
}

const defaultFlags: FeatureFlagItem[] = [
  { id: 'ff-1', key: 'maintenance_mode', name: 'Mode Pemeliharaan', description: 'Alihkan publik ke halaman pemeliharaan sistem', isEnabled: false, updatedAt: new Date().toISOString() },
  { id: 'ff-2', key: 'online_quotes', name: 'Formulir Penawaran Online', description: 'Izinkan pengunjung mengirim permohonan penawaran harga', isEnabled: true, updatedAt: new Date().toISOString() },
  { id: 'ff-3', key: 'whatsapp_floating', name: 'Tombol WhatsApp Terapung', description: 'Tampilkan tombol kontak langsung WhatsApp di sisi kanan bawah', isEnabled: true, updatedAt: new Date().toISOString() },
  { id: 'ff-4', key: 'news_section', name: 'Bagian Edukasi & Artikel', description: 'Tampilkan modul artikel refrigerasi di beranda', isEnabled: true, updatedAt: new Date().toISOString() },
];

const STORAGE_KEY = 'ef_feature_flags';

export const featureFlagsStore = {
  list(): FeatureFlagItem[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultFlags;
  },
  toggle(key: string, isEnabled: boolean): FeatureFlagItem {
    const current = this.list();
    const updated = current.map((f) => (f.key === key ? { ...f, isEnabled, updatedAt: new Date().toISOString() } : f));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find((f) => f.key === key)!;
  },
  getMap(): Record<string, boolean> {
    const map: Record<string, boolean> = {};
    this.list().forEach((f) => { map[f.key] = f.isEnabled; });
    return map;
  },
};
