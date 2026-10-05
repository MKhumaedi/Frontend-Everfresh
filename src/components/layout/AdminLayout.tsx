import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar.js';
import { AdminTopbar } from './AdminTopbar.js';

export const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#F4F8FB] text-[#0F1F2E] overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
