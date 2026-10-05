export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type InquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'SURVEY_SCHEDULED'
  | 'PROPOSAL_SENT'
  | 'DEAL_WON'
  | 'DEAL_LOST';

export interface Inquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  interestedProduct: string;
  targetCapacity?: string;
  notes?: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline?: string;
  capacityTons?: number;
  refrigerant?: string;
  powerKw?: number;
  isFeatured: boolean;
}
