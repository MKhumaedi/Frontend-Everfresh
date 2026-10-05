import {
  CategoryData,
  ProductData,
  ProjectData,
  ServiceData,
  TestimonialData,
  ArticleData,
  SiteSettingData,
  OfficeData,
  HomeSectionData,
  HeroBannerData,
} from '../../types/public.js';

export const initialCategories: CategoryData[] = [
  { id: 'cat-1', name: 'Mesin Es Tube', slug: 'mesin-es-tube', description: 'Es tabung higienis lubang tengah untuk industri F&B dan perhotelan.' },
  { id: 'cat-2', name: 'Mesin Es Cube', slug: 'mesin-es-cube', description: 'Es kotak kristal padat lambat cair untuk cafe, restoran, dan bar modern.' },
  { id: 'cat-3', name: 'Mesin Es Block Direct Cooling', slug: 'mesin-es-block', description: 'Es balok cetak langsung tanpa air garam (brine water), ramah lingkungan.' },
  { id: 'cat-4', name: 'Mesin Es Flake', slug: 'mesin-es-flake', description: 'Es serpihan tipis kering suhu -7°C ideal untuk pendinginan ikan di kapal.' },
  // { id: 'cat-5', name: 'Mesin Es Slurry', slug: 'mesin-es-slurry', description: 'Es bubur cair pendinginan kontak instan tanpa merusak sisik ikan ekspor.' },
  // { id: 'cat-6', name: 'Kaleng Es (Ice Can)', slug: 'kaleng-es', description: 'Cetakan es balok baja galvanis celup panas dan stainless steel SS304.' },
  // { id: 'cat-7', name: 'Cold Room & Blast Freezer', slug: 'cold-room', description: 'Gudang beku modular polyurethane -20°C hingga blast freezer -40°C.' },
];

export const initialHeroBanner: HeroBannerData = {
  id: 'hero-1',
  headline: 'Mesin Es Industri & Cold Storage Standar Internasional',
  subheadline: 'Rancang bangun mesin es Tube, Flake, dan Block direct cooling hemat energi didukung kompresor Bitzer & Hanbell serta teknisi siaga 24/7 di seluruh Indonesia.',
  badgeText: 'TEKNOLOGI PENDINGIN INDUSTRI TERPERCAYA SEJAK 2012',
  ctaPrimaryText: 'Minta Penawaran Harga',
  ctaPrimaryLink: '/quote',
  ctaSecondaryText: 'Katalog Mesin Es',
  ctaSecondaryLink: '/products',
  imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
  isActive: true,
  sortOrder: 1,
};

export const initialSections: HomeSectionData[] = [
  { id: 'sec-1', sectionKey: 'hero', title: 'Hero Banner Utama', sortOrder: 1, isEnabled: true },
  { id: 'sec-2', sectionKey: 'product_catalog', title: 'Katalog Kategori Mesin', sortOrder: 2, isEnabled: true },
  { id: 'sec-3', sectionKey: 'telemetry_stats', title: 'Metrik & Statistik Kinerja', sortOrder: 3, isEnabled: true },
  { id: 'sec-4', sectionKey: 'energy_efficiency', title: 'Keunggulan Rekayasa Tropis', sortOrder: 4, isEnabled: true },
  { id: 'sec-5', sectionKey: 'services', title: 'Layanan Rekayasa Turnkey', sortOrder: 5, isEnabled: true },
  { id: 'sec-6', sectionKey: 'featured_projects', title: 'Portofolio Instalasi Lapangan', sortOrder: 6, isEnabled: true },
  { id: 'sec-7', sectionKey: 'testimonials', title: 'Testimoni Klien', sortOrder: 7, isEnabled: true },
  { id: 'sec-8', sectionKey: 'quote_cta', title: 'Banner Konsultasi Cepat', sortOrder: 8, isEnabled: true },
  { id: 'sec-9', sectionKey: 'articles', title: 'Berita & Edukasi Industri', sortOrder: 9, isEnabled: true },
];

export const initialSettings: SiteSettingData = {
  id: 'set-1',
  siteName: 'EVERFRESH Industrial Ice & Cold Storage',
  tagline: 'Solusi Pabrik Es & Rantai Dingin Terpercaya Indonesia',
  whatsappNumber: '+628118899721',
  consultationPhone: '+622189904120',
  salesEmail: 'sales@everfresh-ice.co.id',
  supportEmail: 'support@everfresh-ice.co.id',
  operationalHours: 'Senin - Sabtu: 08:00 - 17:00 WIB',
  addressSummary: 'Sentra Bisnis Artha Gading D-08, Kelapa Gading, Jakarta Utara',
};

export const initialOffices: OfficeData[] = [
  { id: 'off-1', city: 'Jakarta', officeType: 'Kantor Pusat & Pemasaran Nasional', address: 'Sentra Bisnis Artha Gading D-08, Kelapa Gading, Jakarta Utara', phone: '+62 21 8990 4120', email: 'jakarta@everfresh-ice.co.id', isHeadquarters: true, sortOrder: 1 },
  { id: 'off-2', city: 'Surabaya / Sidoarjo', officeType: 'Fasilitas Fabrikasi & Uji Beban', address: 'Kawasan Industri Safe ' + '&' + ' Lock Blok V-12, Lingkar Timur, Sidoarjo, Jawa Timur', phone: '+62 31 8945 221', email: 'workshop@everfresh-ice.co.id', isHeadquarters: false, sortOrder: 2 },
  { id: 'off-3', city: 'Makassar', officeType: 'Hub Servis Maritim Indonesia Timur', address: 'Jl. Nusantara Pelabuhan Paotere No. 45, Makassar, Sulawesi Selatan', phone: '+62 411 362 890', email: 'makassar@everfresh-ice.co.id', isHeadquarters: false, sortOrder: 3 },
];
