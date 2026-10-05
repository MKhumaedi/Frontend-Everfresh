import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.js';
import { Forbidden403Page } from './Forbidden403Page.js';
import { AppRole } from '../../config/permissions.js';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
        Memverifikasi sesi admin...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Forbidden403Page
        requiredRole={allowedRoles.join(' atau ')}
        currentRole={user.role}
      />
    );
  }

  return <>{children}</>;
};
