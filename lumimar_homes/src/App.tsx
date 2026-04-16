/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import OwnerLayout from './components/OwnerLayout';
import InternalLayout from './components/InternalLayout';

import Home from './pages/public/Home';
import FullManagement from './pages/public/FullManagement';
import LongTermStays from './pages/public/LongTermStays';
import InteriorStyling from './pages/public/InteriorStyling';
import Apply from './pages/public/Apply';
import CoHostingServices from './pages/public/CoHostingServices';
import About from './pages/public/About';
import StayInquiry from './pages/public/StayInquiry';
import CaseStudies from './pages/public/CaseStudies';
import Pricing from './pages/public/Pricing';
import NotFound from './pages/public/NotFound';

import Login from './pages/owner/Login';
import OwnerDashboard from './pages/owner/Dashboard';
import Properties from './pages/owner/Properties';
import Earnings from './pages/owner/Earnings';
import OwnerProfile from './pages/owner/Profile';

import InternalDashboard from './pages/internal/Dashboard';
import InternalLeads from './pages/internal/Leads';
import InternalCleaning from './pages/internal/Cleaning';
import InternalMaintenance from './pages/internal/Maintenance';
import InternalFinance from './pages/internal/Finance';

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
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="profile" element={<OwnerProfile />} />
        </Route>

        <Route path="/internal" element={<InternalLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<InternalDashboard />} />
          <Route path="leads" element={<InternalLeads />} />
          <Route path="cleaning" element={<InternalCleaning />} />
          <Route path="maintenance" element={<InternalMaintenance />} />
          <Route path="finance" element={<InternalFinance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
