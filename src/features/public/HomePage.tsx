import React from 'react';
import { usePublicHome } from './api/publicApi.js';
import { SEOHead } from '../../components/common/SEOHead.js';
import { HeroSection } from './home/HeroSection.js';
import { CategoryGridSection } from './home/CategoryGridSection.js';
import { StatsStripSection } from './home/StatsStripSection.js';
import { AboutSplitSection } from './home/AboutSplitSection.js';
import { ServicesCardsSection } from './home/ServicesCardsSection.js';
import { ProjectGridSection } from './home/ProjectGridSection.js';
import { TestimonialSection } from './home/TestimonialSection.js';
import { CtaBannerSection } from './home/CtaBannerSection.js';
import { NewsCardsSection } from './home/NewsCardsSection.js';
import { MaintenancePage } from './MaintenancePage.js';
import { FloatingWhatsAppButton } from '../../components/layout/FloatingWhatsAppButton.js';
import { PublicHomeData, HomeSectionData } from '../../types/public.js';

function renderHomeSkeleton() {
  return (
    <div className="animate-pulse space-y-8 py-10 max-w-7xl mx-auto px-4">
      <div className="h-96 bg-slate-200 rounded-2xl" />
      <div className="h-28 bg-slate-200 rounded-xl" />
      <div className="grid grid-cols-3 gap-6">
        <div className="h-64 bg-slate-200 rounded-xl" />
        <div className="h-64 bg-slate-200 rounded-xl" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

function renderSectionByKey(key: string, data: PublicHomeData) {
  switch (key) {
    case 'hero':
      return <HeroSection key="hero" banner={data.hero} machines={data.heroMachines} />;
    case 'product_catalog':
      return <CategoryGridSection key="catalog" categories={data.categories} />;
    case 'telemetry_stats':
      return <StatsStripSection key="stats" />;
    case 'energy_efficiency':
      return <AboutSplitSection key="about" />;
    case 'services':
      return <ServicesCardsSection key="services" />;
    case 'featured_projects':
      return <ProjectGridSection key="projects" projects={data.featuredProjects} />;
    case 'testimonials':
      return <TestimonialSection key="testimonials" testimonials={data.testimonials} />;
    case 'quote_cta':
      return (
        <CtaBannerSection
          key="cta"
          whatsappNumber={data.settings?.whatsappNumber}
          phone={data.settings?.consultationPhone}
        />
      );
    case 'articles':
      return <NewsCardsSection key="articles" articles={data.latestArticles} />;
    default:
      return null;
  }
}

function renderOrderedSections(data: PublicHomeData) {
  if (!data.sections || data.sections.length === 0) {
    return (
      <>
        <HeroSection banner={data.hero} machines={data.heroMachines} />
        <CategoryGridSection categories={data.categories} />
        <StatsStripSection />
        <AboutSplitSection />
        <ServicesCardsSection />
        <ProjectGridSection projects={data.featuredProjects} />
        <TestimonialSection testimonials={data.testimonials} />
        <CtaBannerSection
          whatsappNumber={data.settings?.whatsappNumber}
          phone={data.settings?.consultationPhone}
        />
        <NewsCardsSection articles={data.latestArticles} />
      </>
    );
  }

  const sorted = [...data.sections]
    .filter((s: HomeSectionData) => s.isEnabled)
    .sort((a: HomeSectionData, b: HomeSectionData) => a.sortOrder - b.sortOrder);

  return sorted.map((s) => renderSectionByKey(s.sectionKey, data));
}

export const HomePage: React.FC = () => {
  const { data, isLoading, error } = usePublicHome();

  if (isLoading) return renderHomeSkeleton();
  if (error || !data) {
    return (
      <div className="py-20 text-center text-slate-600">
        Gagal memuat data beranda. Silakan muat ulang halaman.
      </div>
    );
  }

  if (data.maintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <>
      <SEOHead
        title="EVERFRESH | Mesin Es Industri & Cold Storage Indonesia"
        description="Solusi pabrik mesin es tube, flake, block direct cooling, dan cold room standar Bitzer Jerman di Indonesia."
      />
      {renderOrderedSections(data)}
      {data.featureFlags?.whatsapp_floating !== false && (
        <FloatingWhatsAppButton whatsappNumber={data.settings?.whatsappNumber} />
      )}
    </>
  );
};
export default HomePage;
