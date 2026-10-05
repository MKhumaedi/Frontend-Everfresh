export interface HeroMachineData {
  id: string;
  key: string;
  label: string;
  name: string;
  tagline?: string | null;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export interface HeroBannerData {
  id: string;
  headline: string;
  subheadline: string;
  badgeText?: string | null;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText?: string | null;
  ctaSecondaryLink?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface HomeSectionData {
  id: string;
  sectionKey: string;
  title: string;
  subtitle?: string | null;
  sortOrder: number;
  isEnabled: boolean;
  config?: Record<string, unknown> | null;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  iconName?: string | null;
  sortOrder?: number;
}

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  tagline?: string | null;
  description: string;
  capacityTons?: number | null;
  refrigerant?: string | null;
  powerKw?: number | null;
  compressorBrand?: string | null;
  dimensions?: string | null;
  specs?: Record<string, string | number> | null;
  faqs?: Array<{ question: string; answer: string }> | null;
  gallery?: string[];
  images?: string[];
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  category?: CategoryData;
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  location: string;
  capacity: string;
  summary: string;
  description: string;
  coverImage?: string | null;
  images?: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isFeatured: boolean;
  completionDate?: string | null;
  createdAt: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  description: string;
  iconName?: string | null;
  coverImage?: string | null;
  features?: string[] | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isFeatured: boolean;
  sortOrder: number;
}

export interface TestimonialData {
  id: string;
  clientName: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl?: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isFeatured: boolean;
}

export interface ArticleData {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  coverImage?: string | null;
  readTimeMin: number;
  publishedAt?: string | null;
  author?: {
    name: string;
    avatarUrl?: string | null;
    department?: string | null;
  };
}

export interface SiteSettingData {
  id: string;
  siteName: string;
  tagline: string;
  whatsappNumber: string;
  consultationPhone: string;
  salesEmail: string;
  supportEmail: string;
  operationalHours: string;
  addressSummary: string;
  socialLinks?: {
    youtube?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  } | null;
  seoKeywords?: string[];
}

export interface OfficeData {
  id: string;
  city: string;
  officeType: string;
  address: string;
  phone: string;
  email: string;
  googleMapsUrl?: string | null;
  isHeadquarters: boolean;
  sortOrder: number;
}

export interface PublicHomeData {
  hero: HeroBannerData | null;
  heroMachines?: HeroMachineData[];
  sections: HomeSectionData[];
  categories: CategoryData[];
  featuredProjects: ProjectData[];
  testimonials: TestimonialData[];
  latestArticles: ArticleData[];
  settings: SiteSettingData | null;
  offices: OfficeData[];
  featureFlags?: Record<string, boolean>;
  maintenanceMode?: boolean;
}
