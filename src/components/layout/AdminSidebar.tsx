import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { EverfreshLogo } from '../ui/EverfreshLogo.js';
import { useAuth } from '../../features/auth/AuthContext.js';
import {
  LayoutDashboard,
  FileText,
  Home,
  Snowflake,
  FolderGit2,
  Headphones,
  Newspaper,
  MessageSquareQuote,
  Image as ImageIcon,
  Users,
  Settings,
  Sliders,
  Activity,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../lib/utils/cn.js';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  superAdminOnly?: boolean;
}

const mainNav: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Permintaan Penawaran', href: '/admin/inquiries', icon: FileText },
];

const contentNav: NavItem[] = [
  { name: 'Halaman Beranda', href: '/admin/pages/home', icon: Home },
  { name: 'Produk Mesin', href: '/admin/products', icon: Snowflake },
  { name: 'Proyek Instalasi', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Layanan Servis', href: '/admin/services', icon: Headphones },
  { name: 'Berita & Artikel', href: '/admin/articles', icon: Newspaper },
  { name: 'Testimoni Klien', href: '/admin/testimonials', icon: MessageSquareQuote },
];

const systemNav: NavItem[] = [
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Profil Saya', href: '/admin/profile', icon: UserCheck },
  { name: 'Pengguna', href: '/admin/users', icon: Users, superAdminOnly: true },
  { name: 'Pengaturan', href: '/admin/settings', icon: Settings, superAdminOnly: true },
  { name: 'Fitur', href: '/admin/feature-flags', icon: Sliders, superAdminOnly: true },
  { name: 'Log Aktivitas', href: '/admin/activity-logs', icon: Activity, superAdminOnly: true },
];

function renderNavList(items: NavItem[], isCollapsed: boolean, isSuperAdmin: boolean) {
  const visible = items.filter((item) => !item.superAdminOnly || isSuperAdmin);
  return visible.map((item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.name}
        to={item.href}
        end={item.href === '/admin'}
        title={isCollapsed ? item.name : undefined}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors',
            isActive
              ? 'bg-[#EBF4FC] text-[#0B4F8A] font-semibold border-l-2 border-[#0B4F8A]'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            isCollapsed && 'justify-center px-2'
          )
        }
      >
        <Icon className="w-4 h-4 shrink-0 text-slate-500" />
        {!isCollapsed && <span>{item.name}</span>}
      </NavLink>
    );
  });
}

export const AdminSidebar: React.FC = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isSuperAdmin = user?.role === 'SUPERADMIN';

  return (
    <aside
      className={cn(
        'bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-screen transition-all duration-200 z-30 select-none',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 border-b border-slate-200 flex items-center justify-between h-16">
        {!isCollapsed ? (
          <div className="flex flex-col">
            <EverfreshLogo size="sm" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#0B4F8A] mt-1 pl-0.5">
              Industrial CMS • {user?.role || 'STAFF'}
            </span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded bg-[#0B4F8A] text-white flex items-center justify-center font-bold text-xs mx-auto">
            EF
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          {!isCollapsed && <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Utama</div>}
          <nav className="flex flex-col gap-0.5">{renderNavList(mainNav, isCollapsed, isSuperAdmin)}</nav>
        </div>

        <div>
          {!isCollapsed && <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Katalog & Konten</div>}
          <nav className="flex flex-col gap-0.5">{renderNavList(contentNav, isCollapsed, isSuperAdmin)}</nav>
        </div>

        <div>
          {!isCollapsed && <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Aset & Sistem</div>}
          <nav className="flex flex-col gap-0.5">{renderNavList(systemNav, isCollapsed, isSuperAdmin)}</nav>
        </div>
      </div>
    </aside>
  );
};
