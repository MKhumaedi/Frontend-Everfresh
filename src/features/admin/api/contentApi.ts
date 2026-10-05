import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api/client.js';
import { ProjectData, ServiceData, ArticleData, TestimonialData } from '../../../types/public.js';

export function useAdminProjects() {
  return useQuery({
    queryKey: ['admin', 'projects'],
    queryFn: async () => {
      const res = await apiClient<{ items: ProjectData[] }>('/projects');
      return res.data?.items || [];
    },
  });
}

export function useSaveProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id?: string; data: Partial<ProjectData> }) => {
      const url = id ? `/projects/${id}` : '/projects';
      const method = id ? 'PATCH' : 'POST';
      const res = await apiClient<ProjectData>(url, { method, body: JSON.stringify(data) });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'projects'] });
      qc.invalidateQueries({ queryKey: ['public'] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient(`/projects/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'projects'] });
      qc.invalidateQueries({ queryKey: ['public'] });
    },
  });
}

export function useAdminServices() {
  return useQuery({
    queryKey: ['admin', 'services'],
    queryFn: async () => {
      const res = await apiClient<ServiceData[]>('/services');
      return res.data || [];
    },
  });
}

export function useSaveService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id?: string; data: Partial<ServiceData> }) => {
      const url = id ? `/services/${id}` : '/services';
      const method = id ? 'PATCH' : 'POST';
      const res = await apiClient<ServiceData>(url, { method, body: JSON.stringify(data) });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'services'] });
      qc.invalidateQueries({ queryKey: ['public'] });
    },
  });
}

export function useDeleteService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient(`/services/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'services'] });
      qc.invalidateQueries({ queryKey: ['public'] });
    },
  });
}

export function useAdminArticles() {
  return useQuery({
    queryKey: ['admin', 'articles'],
    queryFn: async () => {
      const res = await apiClient<{ items: ArticleData[] }>('/articles');
      return res.data?.items || [];
    },
  });
}

export function useSaveArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id?: string; data: Partial<ArticleData> }) => {
      const url = id ? `/articles/${id}` : '/articles';
      const method = id ? 'PATCH' : 'POST';
      const res = await apiClient<ArticleData>(url, { method, body: JSON.stringify(data) });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'articles'] });
      qc.invalidateQueries({ queryKey: ['public'] });
    },
  });
}

export function useDeleteArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient(`/articles/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'articles'] });
      qc.invalidateQueries({ queryKey: ['public'] });
    },
  });
}

export function useAdminTestimonials() {
  return useQuery({
    queryKey: ['admin', 'testimonials'],
    queryFn: async () => {
      const res = await apiClient<TestimonialData[]>('/testimonials');
      return res.data || [];
    },
  });
}

export function useSaveTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id?: string; data: Partial<TestimonialData> }) => {
      const url = id ? `/testimonials/${id}` : '/testimonials';
      const method = id ? 'PATCH' : 'POST';
      const res = await apiClient<TestimonialData>(url, { method, body: JSON.stringify(data) });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'testimonials'] });
      qc.invalidateQueries({ queryKey: ['public'] });
    },
  });
}

export function useDeleteTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient(`/testimonials/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'testimonials'] });
      qc.invalidateQueries({ queryKey: ['public'] });
    },
  });
}
