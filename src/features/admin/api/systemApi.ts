import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api/client.js';
import { HomeSectionData, HeroBannerData, SiteSettingData, OfficeData } from '../../../types/public.js';

export function useAdminHomeSections() {
  return useQuery({
    queryKey: ['admin', 'sections'],
    queryFn: async () => {
      const res = await apiClient<HomeSectionData[]>('/home/sections');
      return res.data || [];
    },
  });
}

export function useToggleSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sectionKey: string) => {
      const res = await apiClient<HomeSectionData>(`/home/sections/${sectionKey}/toggle`, { method: 'POST' });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'sections'] });
      qc.invalidateQueries({ queryKey: ['public', 'home'] });
    },
  });
}

export function useReorderSections() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (orders: Array<{ sectionKey: string; sortOrder: number }>) => {
      const res = await apiClient<HomeSectionData[]>('/home/sections/reorder', {
        method: 'POST',
        body: JSON.stringify({ orders }),
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'sections'] });
      qc.invalidateQueries({ queryKey: ['public', 'home'] });
    },
  });
}

export function useAdminHero() {
  return useQuery({
    queryKey: ['admin', 'hero'],
    queryFn: async () => {
      const res = await apiClient<HeroBannerData[]>('/home/hero');
      return res.data || [];
    },
  });
}

export function useSaveHero() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id?: string; data: Partial<HeroBannerData> }) => {
      const url = id ? `/home/hero/${id}` : '/home/hero';
      const method = id ? 'PATCH' : 'POST';
      const res = await apiClient<HeroBannerData>(url, { method, body: JSON.stringify(data) });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'hero'] });
      qc.invalidateQueries({ queryKey: ['public', 'home'] });
    },
  });
}

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  altText?: string;
  createdAt: string;
}

export function useAdminMedia(search?: string) {
  return useQuery({
    queryKey: ['admin', 'media', search],
    queryFn: async () => {
      const q = search ? `?search=${encodeURIComponent(search)}` : '';
      const res = await apiClient<{ items: MediaItem[]; total: number }>(`/media${q}`);
      return res.data?.items || [];
    },
  });
}

export function useUploadMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiClient<MediaItem>('/media/upload', {
        method: 'POST',
        body: formData,
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'media'] }),
  });
}

export function useDeleteMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient(`/media/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'media'] }),
  });
}

export function useAdminSettings() {
  return useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: async () => {
      const res = await apiClient<SiteSettingData>('/settings');
      return res.data;
    },
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<SiteSettingData>) => {
      const res = await apiClient<SiteSettingData>('/settings', {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'settings'] });
      qc.invalidateQueries({ queryKey: ['public', 'home'] });
    },
  });
}

export function useAdminOffices() {
  return useQuery({
    queryKey: ['admin', 'offices'],
    queryFn: async () => {
      const res = await apiClient<OfficeData[]>('/offices');
      return res.data || [];
    },
  });
}
