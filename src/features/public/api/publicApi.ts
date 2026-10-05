import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api/client.js';
import {
  PublicHomeData,
  ProductData,
  ProjectData,
  ArticleData,
  ServiceData,
} from '../../../types/public.js';

export function usePublicHome() {
  return useQuery({
    queryKey: ['public', 'home'],
    queryFn: async () => {
      const res = await apiClient<PublicHomeData>('/public/home');
      return res.data;
    },
  });
}

export function usePublicProducts(categoryId?: string) {
  return useQuery({
    queryKey: ['public', 'products', categoryId],
    queryFn: async () => {
      const q = categoryId ? `?categoryId=${categoryId}` : '';
      const res = await apiClient<ProductData[]>(`/public/products${q}`);
      return res.data || [];
    },
  });
}

export function usePublicProduct(slug: string) {
  return useQuery({
    queryKey: ['public', 'product', slug],
    queryFn: async () => {
      const res = await apiClient<ProductData>(`/public/products/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });
}

export function usePublicProjects() {
  return useQuery({
    queryKey: ['public', 'projects'],
    queryFn: async () => {
      const res = await apiClient<ProjectData[]>('/public/projects');
      return res.data || [];
    },
  });
}

export function usePublicServices() {
  return useQuery({
    queryKey: ['public', 'services'],
    queryFn: async () => {
      const res = await apiClient<ServiceData[]>('/services');
      return res.data || [];
    },
  });
}

export function usePublicArticles(category?: string) {
  return useQuery({
    queryKey: ['public', 'articles', category],
    queryFn: async () => {
      const q = category ? `?category=${encodeURIComponent(category)}` : '';
      const res = await apiClient<ArticleData[]>(`/public/articles${q}`);
      return res.data || [];
    },
  });
}

export function usePublicArticle(slug: string) {
  return useQuery({
    queryKey: ['public', 'article', slug],
    queryFn: async () => {
      const res = await apiClient<ArticleData>(`/public/articles/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  interestedProduct: string;
  targetCapacity?: string;
  notes?: string;
}

export function useSubmitQuote() {
  return useMutation({
    mutationFn: async (data: QuoteFormData) => {
      const res = await apiClient<{ quoteNumber: string }>('/quotes/public', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.data;
    },
  });
}
