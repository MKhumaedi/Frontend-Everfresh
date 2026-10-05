import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api/client.js';
import { AppRole } from '../../../config/permissions.js';

export interface AdminUserData {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  isActive: boolean;
  mustChangePassword?: boolean;
  department?: string;
  createdAt: string;
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const res = await apiClient<AdminUserData[]>('/users');
      return res.data || [];
    },
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<AdminUserData> & { password?: string }) => {
      const res = await apiClient<AdminUserData>('/users', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'users'] }),
  });
}

export function useUpdateUserRoleActive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, role, isActive }: { id: string; role?: string; isActive?: boolean }) => {
      const res = await apiClient<AdminUserData>(`/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ role, isActive }),
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'users'] }),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ id, newPassword }: { id: string; newPassword: string }) => {
      await apiClient(`/users/${id}/reset-password`, {
        method: 'POST',
        body: JSON.stringify({ newPassword }),
      });
    },
  });
}
