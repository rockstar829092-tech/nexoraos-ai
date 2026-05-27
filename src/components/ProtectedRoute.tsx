import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { AccessDenied } from './AccessDenied';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAllowed } = useRole();
  const location = useLocation();

  if (!isAllowed(location.pathname)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};
