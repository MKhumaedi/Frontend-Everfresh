import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api/client.js';
import { HeroMachineData } from '../../../types/public.js';

export function useAdminHeroMachines() {
  return useQuery({
    queryKey: ['admin', 'hero-machines'],
    queryFn: async () => {
      const res = await apiClient<HeroMachineData[]>('/home/machines');
      return res.data || [];
    },
  });
}

export function useSaveHeroMachine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id?: string; data: Partial<HeroMachineData> }) => {
      const url = id ? `/home/machines/${id}` : '/home/machines';
      const method = id ? 'PATCH' : 'POST';
      const res = await apiClient<HeroMachineData>(url, { method, body: JSON.stringify(data) });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'hero-machines'] });
      qc.invalidateQueries({ queryKey: ['public', 'home'] });
    },
  });
}

export function useDeleteHeroMachine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient(`/home/machines/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'hero-machines'] });
      qc.invalidateQueries({ queryKey: ['public', 'home'] });
    },
  });
}

export function useReorderHeroMachines() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (orders: Array<{ id: string; sortOrder: number }>) => {
      const res = await apiClient<HeroMachineData[]>('/home/machines/reorder', {
        method: 'POST',
        body: JSON.stringify({ orders }),
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'hero-machines'] });
      qc.invalidateQueries({ queryKey: ['public', 'home'] });
    },
  });
}
