import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader.js';
import { PublicFooter } from './PublicFooter.js';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FB] text-[#0F1F2E]">
      <PublicHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};
