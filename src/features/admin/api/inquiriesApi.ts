import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api/client.js';

export interface InquiryItem {
  id: string;
  quoteNumber: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  interestedProduct: string;
  targetCapacity?: string;
  notes?: string;
  status: 'NEW' | 'CONTACTED' | 'SURVEY_SCHEDULED' | 'PROPOSAL_SENT' | 'DEAL_WON' | 'DEAL_LOST';
  createdAt: string;
  _count?: { quoteNotes: number; statusLogs: number };
}

export interface InquiryDetail extends InquiryItem {
  statusLogs: Array<{
    id: string;
    fromStatus?: string;
    toStatus: string;
    changedBy?: string;
    notes?: string;
    createdAt: string;
  }>;
  quoteNotes: Array<{
    id: string;
    authorName?: string;
    note: string;
    createdAt: string;
  }>;
}

export function useInquiries(filters: { status?: string; search?: string; page?: number } = {}) {
  return useQuery({
    queryKey: ['admin', 'inquiries', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== 'ALL') params.set('status', filters.status);
      if (filters.search) params.set('search', filters.search);
      if (filters.page) params.set('page', String(filters.page));
      const q = params.toString() ? `?${params.toString()}` : '';
      const res = await apiClient<{ items: InquiryItem[]; total: number }>(`/quotes${q}`);
      return res.data;
    },
  });
}

export function useInquiryDetail(id?: string | null) {
  return useQuery({
    queryKey: ['admin', 'inquiry', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await apiClient<InquiryDetail>(`/quotes/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes?: string }) => {
      const res = await apiClient<InquiryItem>(`/quotes/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, notes }),
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiry', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
  });
}

export function useAddInquiryNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      const res = await apiClient<{ id: string }>(`/quotes/${id}/notes`, {
        method: 'POST',
        body: JSON.stringify({ note }),
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiry', variables.id] });
    },
  });
}
