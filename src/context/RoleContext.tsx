import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, RolePermissions } from '../types';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  permissions: RolePermissions;
  isAllowed: (modulePath: string) => boolean;
}

const rolePermissions: Record<UserRole, RolePermissions> = {
  Admin: {
    modules: ['*'], // Full access
    actions: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canExport: true,
    },
  },
  Teacher: {
    modules: [
      '/student-management',
      '/attendance-management',
      '/exam-management',
      '/lms',
      '/communication',
      '/calendar-events',
      '/staff-app',
      '/dashboard'
    ],
    actions: {
      canCreate: false,
      canEdit: true,
      canDelete: false,
      canExport: true,
      specialActions: ['mark-attendance', 'input-grades'],
    },
  },
  Accountant: {
    modules: [
      '/admission-fee',
      '/fee-management',
      '/payroll',
      '/finance',
      '/operations',
      '/communication',
      '/dashboard'
    ],
    actions: {
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canExport: true,
    },
  },
  Parent: {
    modules: [
      '/student-app',
      '/attendance-management',
      '/fee-management',
      '/dashboard'
    ],
    actions: {
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canExport: false,
    },
  },
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('nexora_user_role');
    return (saved as UserRole) || 'Admin';
  });

  useEffect(() => {
    localStorage.setItem('nexora_user_role', role);
  }, [role]);

  const permissions = rolePermissions[role];

  const isAllowed = (modulePath: string) => {
    if (permissions.modules.includes('*')) return true;
    return permissions.modules.some(path => modulePath.startsWith(path));
  };

  return (
    <RoleContext.Provider value={{ role, setRole, permissions, isAllowed }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
