import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout.js';
import { AdminLayout } from '../components/layout/AdminLayout.js';
import { ProtectedRoute } from '../features/auth/ProtectedRoute.js';
import { AdminLoginPage } from '../features/auth/AdminLoginPage.js';
import { HomePage } from '../features/public/HomePage.js';
import { ProductsPage } from '../features/public/ProductsPage.js';
import { ProductDetailPage } from '../features/public/ProductDetailPage.js';
import { ProjectsPage } from '../features/public/ProjectsPage.js';
import { ServicesPage } from '../features/public/ServicesPage.js';
import { ServiceDetailPage } from '../features/public/ServiceDetailPage.js';
import { ArticlesPage } from '../features/public/ArticlesPage.js';
import { ArticleDetailPage } from '../features/public/ArticleDetailPage.js';
import { AboutPage } from '../features/public/AboutPage.js';
import { ContactQuotePage } from '../features/public/ContactQuotePage.js';
import { NotFoundPage } from '../features/public/NotFoundPage.js';
import { AdminDashboard } from '../features/admin/AdminDashboard.js';
import { InquiriesPage } from '../features/admin/InquiriesPage.js';
import { ProductsAdminPage } from '../features/admin/ProductsAdminPage.js';
import { HomeEditorPage } from '../features/admin/HomeEditorPage.js';
import { ProjectsAdminPage } from '../features/admin/ProjectsAdminPage.js';
import { ServicesAdminPage } from '../features/admin/ServicesAdminPage.js';
import { ArticlesAdminPage } from '../features/admin/ArticlesAdminPage.js';
import { TestimonialsAdminPage } from '../features/admin/TestimonialsAdminPage.js';
import { MediaAdminPage } from '../features/admin/MediaAdminPage.js';
import { UsersAdminPage } from '../features/admin/UsersAdminPage.js';
import { SettingsAdminPage } from '../features/admin/SettingsAdminPage.js';
import { FeatureFlagsAdminPage } from '../features/admin/FeatureFlagsAdminPage.js';
import { ActivityLogsAdminPage } from '../features/admin/ActivityLogsAdminPage.js';
import { ProfileAdminPage } from '../features/admin/ProfileAdminPage.js';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="cold-storage" element={<ProductsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/:slug" element={<ArticleDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="quote" element={<ContactQuotePage />} />
        <Route path="contact" element={<ContactQuotePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="pages" element={<Navigate to="/admin/pages/home" replace />} />
        <Route path="pages/home" element={<HomeEditorPage />} />
        <Route path="products" element={<ProductsAdminPage />} />
        <Route path="projects" element={<ProjectsAdminPage />} />
        <Route path="services" element={<ServicesAdminPage />} />
        <Route path="articles" element={<ArticlesAdminPage />} />
        <Route path="testimonials" element={<TestimonialsAdminPage />} />
        <Route path="media" element={<MediaAdminPage />} />
        <Route path="profile" element={<ProfileAdminPage />} />
        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={['SUPERADMIN']}>
              <UsersAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute allowedRoles={['SUPERADMIN']}>
              <SettingsAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="feature-flags"
          element={
            <ProtectedRoute allowedRoles={['SUPERADMIN']}>
              <FeatureFlagsAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="activity-logs"
          element={
            <ProtectedRoute allowedRoles={['SUPERADMIN']}>
              <ActivityLogsAdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
