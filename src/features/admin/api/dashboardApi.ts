import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api/client.js';

export interface DashboardSummary {
  newQuotesCount: number;
  newQuotesDiffYesterday: number;
  publishedArticlesCount: number;
  draftArticlesCount: number;
  activeProductsCount: number;
  completedProjectsCount: number;
}

export interface DayQuoteCount {
  date: string;
  count: number;
}

export interface UserStatsSummary {
  totalUsers: number;
  activeUsers: number;
  superAdmins: number;
  admins: number;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  userStats?: UserStatsSummary | null;
  recentQuotes: Array<{
    id: string;
    fullName: string;
    companyName: string;
    interestedProduct: string;
    status: string;
    createdAt: string;
  }>;
  recentActivities: Array<{
    id: string;
    action: string;
    targetType: string;
    targetId?: string;
    createdAt: string;
    user?: { name: string; avatarUrl?: string; role?: string };
    details?: Record<string, unknown>;
  }>;
  draftArticles: Array<{
    id: string;
    title: string;
    category: string;
    updatedAt: string;
  }>;
  quoteChart30Days: DayQuoteCount[];
}

export function useDashboardData() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: async () => {
      const res = await apiClient<DashboardResponse>('/dashboard');
      return res.data;
    },
    refetchInterval: 30000,
  });
}
