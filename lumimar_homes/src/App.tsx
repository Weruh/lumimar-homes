import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import InternalLayout from './components/InternalLayout';
import OwnerLayout from './components/OwnerLayout';
import PublicLayout from './components/PublicLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { INTERNAL_ROLES, OWNER_ROLES } from './lib/auth';

import InternalCleaning from './pages/internal/Cleaning';
import InternalDashboard from './pages/internal/Dashboard';
import InternalFinance from './pages/internal/Finance';
import InternalLeads from './pages/internal/Leads';
import InternalLogin from './pages/internal/Login';
import InternalMaintenance from './pages/internal/Maintenance';
import OwnerDashboard from './pages/owner/Dashboard';
import OwnerEarnings from './pages/owner/Earnings';
import OwnerLogin from './pages/owner/Login';
import OwnerProfile from './pages/owner/Profile';
import OwnerProperties from './pages/owner/Properties';
import About from './pages/public/About';
import Apply from './pages/public/Apply';
import CaseStudies from './pages/public/CaseStudies';
import CoHostingServices from './pages/public/CoHostingServices';
import FullManagement from './pages/public/FullManagement';
import Home from './pages/public/Home';
import InteriorStyling from './pages/public/InteriorStyling';
import LongTermStays from './pages/public/LongTermStays';
import NotFound from './pages/public/NotFound';
import Pricing from './pages/public/Pricing';
import StayInquiry from './pages/public/StayInquiry';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="full-management" element={<FullManagement />} />
          <Route path="co-hosting" element={<CoHostingServices />} />
          <Route path="long-term-stays" element={<LongTermStays />} />
          <Route path="interior-styling" element={<InteriorStyling />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="about" element={<About />} />
          <Route path="stay" element={<StayInquiry />} />
          <Route path="apply" element={<Apply />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>

        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={OWNER_ROLES} redirectTo="/owner/login">
              <OwnerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="properties" element={<OwnerProperties />} />
          <Route path="earnings" element={<OwnerEarnings />} />
          <Route path="profile" element={<OwnerProfile />} />
        </Route>

        <Route path="/internal/login" element={<InternalLogin />} />
        <Route
          path="/internal"
          element={
            <ProtectedRoute allowedRoles={INTERNAL_ROLES} redirectTo="/internal/login">
              <InternalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<InternalDashboard />} />
          <Route path="leads" element={<InternalLeads />} />
          <Route path="cleaning" element={<InternalCleaning />} />
          <Route path="maintenance" element={<InternalMaintenance />} />
          <Route path="finance" element={<InternalFinance />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
