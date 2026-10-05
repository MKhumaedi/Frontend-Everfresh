import {
  initialCategories,
  initialHeroBanner,
  initialSections,
  initialSettings,
  initialOffices,
} from './initialData.js';
import {
  initialProducts,
  initialProjects,
  initialServices,
  initialArticles,
  initialTestimonials,
} from './initialContentData.js';
import { defaultHeroMachines } from '../../features/public/home/hero.config.js';
import {
  PublicHomeData,
  ProductData,
  HomeSectionData,
  HeroBannerData,
  SiteSettingData,
  HeroMachineData,
} from '../../types/public.js';

const STORAGE_KEYS = {
  HOME_HERO: 'ef_hero',
  HERO_MACHINES: 'ef_hero_machines',
  SECTIONS: 'ef_sections',
  PRODUCTS: 'ef_products',
  PROJECTS: 'ef_projects',
  SERVICES: 'ef_services',
  ARTICLES: 'ef_articles',
  TESTIMONIALS: 'ef_testimonials',
  SETTINGS: 'ef_settings',
  QUOTES: 'ef_quotes',
};

function getStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
}

export const mockStore = {
  getHomeData(): PublicHomeData {
    return {
      hero: getStorage(STORAGE_KEYS.HOME_HERO, initialHeroBanner),
      heroMachines: getStorage(STORAGE_KEYS.HERO_MACHINES, defaultHeroMachines),
      sections: getStorage(STORAGE_KEYS.SECTIONS, initialSections),
      categories: initialCategories,
      featuredProjects: getStorage(STORAGE_KEYS.PROJECTS, initialProjects),
      testimonials: getStorage(STORAGE_KEYS.TESTIMONIALS, initialTestimonials),
      latestArticles: getStorage(STORAGE_KEYS.ARTICLES, initialArticles),
      settings: getStorage(STORAGE_KEYS.SETTINGS, initialSettings),
      offices: initialOffices,
    };
  },

  getHeroMachines(): HeroMachineData[] {
    return getStorage<HeroMachineData[]>(STORAGE_KEYS.HERO_MACHINES, defaultHeroMachines);
  },

  saveHeroMachine(data: Partial<HeroMachineData>): HeroMachineData {
    const list = getStorage<HeroMachineData[]>(STORAGE_KEYS.HERO_MACHINES, defaultHeroMachines);
    let item: HeroMachineData;
    if (data.id) {
      item = { ...list.find((m) => m.id === data.id), ...data } as HeroMachineData;
      setStorage(STORAGE_KEYS.HERO_MACHINES, list.map((m) => (m.id === data.id ? item : m)));
    } else {
      item = {
        ...data,
        id: `hm-${Date.now()}`,
        key: data.key || 'custom',
        label: data.label || 'Unit',
        name: data.name || 'Mesin Es',
        imageUrl: data.imageUrl || '',
        sortOrder: list.length + 1,
        isActive: data.isActive ?? true,
      } as HeroMachineData;
      setStorage(STORAGE_KEYS.HERO_MACHINES, [...list, item]);
    }
    return item;
  },

  deleteHeroMachine(id: string): void {
    const list = getStorage<HeroMachineData[]>(STORAGE_KEYS.HERO_MACHINES, defaultHeroMachines);
    setStorage(STORAGE_KEYS.HERO_MACHINES, list.filter((m) => m.id !== id));
  },

  reorderHeroMachines(orders: Array<{ id: string; sortOrder: number }>): HeroMachineData[] {
    const list = getStorage<HeroMachineData[]>(STORAGE_KEYS.HERO_MACHINES, defaultHeroMachines);
    const updated = list.map((m) => {
      const match = orders.find((o) => o.id === m.id);
      return match ? { ...m, sortOrder: match.sortOrder } : m;
    });
    setStorage(STORAGE_KEYS.HERO_MACHINES, updated);
    return updated;
  },

  getProducts(categoryId?: string, search?: string): ProductData[] {
    const items = getStorage<ProductData[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
    return items.filter((p) => {
      const matchCat = !categoryId || p.categoryId === categoryId;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  },

  getProductBySlug(slug: string): ProductData | null {
    const items = getStorage<ProductData[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
    return items.find((p) => p.slug === slug || p.id === slug) || null;
  },

  saveProduct(data: Partial<ProductData>): ProductData {
    const items = getStorage<ProductData[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
    let updated: ProductData;
    if (data.id) {
      updated = { ...items.find((p) => p.id === data.id), ...data } as ProductData;
      setStorage(STORAGE_KEYS.PRODUCTS, items.map((p) => (p.id === data.id ? updated : p)));
    } else {
      updated = {
        ...data,
        id: `prod-${Date.now()}`,
        slug: (data.name || 'unit').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        isFeatured: data.isFeatured ?? false,
        isActive: data.isActive ?? true,
        sortOrder: items.length + 1,
      } as ProductData;
      setStorage(STORAGE_KEYS.PRODUCTS, [updated, ...items]);
    }
    return updated;
  },

  deleteProduct(id: string): void {
    const items = getStorage<ProductData[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
    setStorage(STORAGE_KEYS.PRODUCTS, items.filter((p) => p.id !== id));
  },

  saveHero(data: Partial<HeroBannerData>): HeroBannerData {
    const current = getStorage(STORAGE_KEYS.HOME_HERO, initialHeroBanner);
    const updated = { ...current, ...data };
    setStorage(STORAGE_KEYS.HOME_HERO, updated);
    return updated;
  },

  toggleSection(sectionKey: string): HomeSectionData[] {
    const sections = getStorage<HomeSectionData[]>(STORAGE_KEYS.SECTIONS, initialSections);
    const updated = sections.map((s) => (s.sectionKey === sectionKey ? { ...s, isEnabled: !s.isEnabled } : s));
    setStorage(STORAGE_KEYS.SECTIONS, updated);
    return updated;
  },

  reorderSections(orders: Array<{ sectionKey: string; sortOrder: number }>): HomeSectionData[] {
    const sections = getStorage<HomeSectionData[]>(STORAGE_KEYS.SECTIONS, initialSections);
    const updated = sections.map((s) => {
      const match = orders.find((o) => o.sectionKey === s.sectionKey);
      return match ? { ...s, sortOrder: match.sortOrder } : s;
    });
    setStorage(STORAGE_KEYS.SECTIONS, updated);
    return updated;
  },

  saveSettings(data: Partial<SiteSettingData>): SiteSettingData {
    const current = getStorage(STORAGE_KEYS.SETTINGS, initialSettings);
    const updated = { ...current, ...data };
    setStorage(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  submitQuote(data: any): { quoteNumber: string } {
    const quotes = getStorage<any[]>(STORAGE_KEYS.QUOTES, []);
    const num = `EF-2025-${String(quotes.length + 101).padStart(4, '0')}`;
    const newQuote = { ...data, id: `q-${Date.now()}`, quoteNumber: num, status: 'NEW', createdAt: new Date().toISOString(), quoteNotes: [] };
    setStorage(STORAGE_KEYS.QUOTES, [newQuote, ...quotes]);
    return { quoteNumber: num };
  },

  getQuotes(): any[] {
    return getStorage<any[]>(STORAGE_KEYS.QUOTES, [
      { id: 'q-1', quoteNumber: 'EF-2025-0101', fullName: 'Budi Santoso', companyName: 'PT Samudra Makmur', city: 'Sidoarjo', interestedProduct: 'Mesin Es Tube 10 Ton', phone: '08123456789', email: 'budi@samudramakmur.com', status: 'NEW', createdAt: new Date().toISOString(), quoteNotes: [] },
      { id: 'q-2', quoteNumber: 'EF-2025-0102', fullName: 'Hendra Gunawan', companyName: 'CV Bahari Bitung', city: 'Bitung', interestedProduct: 'Mesin Es Flake Marine 5 Ton', phone: '08119876543', email: 'hendra@bahari.com', status: 'CONTACTED', createdAt: new Date().toISOString(), quoteNotes: [] },
    ]);
  },
};
