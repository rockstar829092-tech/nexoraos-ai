import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StudentManagementPage } from './components/StudentManagementPage';
import { StaffManagementPage } from './components/StaffManagementPage';
import { LibraryManagementPage } from './components/LibraryManagementPage';
import { StaffPayrollPage } from './components/StaffPayrollPage';
import { FeeManagementPage } from './components/FeeManagementPage';
import { ExamManagementPage } from './components/ExamManagementPage';
import { AttendanceLeavePage } from './components/AttendanceLeavePage';
import { AdmissionFeePage } from './components/AdmissionFeePage';
import { LMSPage } from './components/LMSPage';
import { HostelManagementPage } from './components/HostelManagementPage';
import { TransportManagementPage } from './components/TransportManagementPage';
import { AlertsManagementPage } from './components/AlertsManagementPage';
import { AppsManagementPage } from './components/AppsManagementPage';
import { RoleBasedAccessPage } from './components/RoleBasedAccessPage';
import { CalendarEventsPage } from './components/CalendarEventsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { NexoraLandingPage } from './components/NexoraLandingPage';
import { AcademicPage } from './components/AcademicPage';
import { OperationsPage } from './components/OperationsPage';
import { FinancePage } from './components/FinancePage';
import { MobileAppsPage } from './components/MobileAppsPage';
import { PricingPage } from './components/PricingPage';

import { RoleProvider } from './context/RoleContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Page Scroll Restorer
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <RoleProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<NexoraLandingPage theme={theme} setTheme={setTheme} />} />
            <Route path="/academic" element={<AcademicPage theme={theme} setTheme={setTheme} />} />
            <Route path="/operations" element={<OperationsPage theme={theme} setTheme={setTheme} />} />
            <Route path="/finance" element={<FinancePage theme={theme} setTheme={setTheme} />} />
            <Route path="/pricing" element={<PricingPage theme={theme} setTheme={setTheme} />} />
            <Route path="/mobile-apps" element={<MobileAppsPage theme={theme} setTheme={setTheme} />} />
            <Route path="/resources" element={<ResourcesPage />} />

            {/* Module Direct Routes */}
            <Route path="/student-management" element={<ProtectedRoute><StudentManagementPage /></ProtectedRoute>} />
            <Route path="/staff-management" element={<ProtectedRoute><StaffManagementPage /></ProtectedRoute>} />
            <Route path="/library-management" element={<ProtectedRoute><LibraryManagementPage /></ProtectedRoute>} />
            <Route path="/payroll" element={<ProtectedRoute><StaffPayrollPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/fee-management" element={<ProtectedRoute><FeeManagementPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/exam-management" element={<ProtectedRoute><ExamManagementPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/attendance-management" element={<ProtectedRoute><AttendanceLeavePage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/admission-fee" element={<ProtectedRoute><AdmissionFeePage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/lms" element={<ProtectedRoute><LMSPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/hostel-management" element={<ProtectedRoute><HostelManagementPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/transport-management" element={<ProtectedRoute><TransportManagementPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/communication" element={<ProtectedRoute><AlertsManagementPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/security" element={<ProtectedRoute><RoleBasedAccessPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/calendar-events" element={<ProtectedRoute><CalendarEventsPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/staff-app" element={<ProtectedRoute><AppsManagementPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/student-app" element={<ProtectedRoute><AppsManagementPage onBack={() => window.history.back()} /></ProtectedRoute>} />
            <Route path="/management-app" element={<ProtectedRoute><AppsManagementPage onBack={() => window.history.back()} /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </RoleProvider>
  );
}
