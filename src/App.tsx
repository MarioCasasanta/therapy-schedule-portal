
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Documentation from "./pages/Documentation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DomainInfo from "./pages/DomainInfo";
import TermsOfService from "./pages/TermsOfService";
import Dashboard from "./pages/Dashboard";
import ClientDetail from "./pages/dashboard/ClientDetail";
import Sessions from "./pages/dashboard/Sessions";
import SessionDetail from "./pages/dashboard/SessionDetail";
import Payments from "./pages/dashboard/Payments";
import Reports from "./pages/dashboard/Reports";
import Availability from "./pages/dashboard/Availability";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientSchedule from "./pages/client/ClientSchedule";
import ClientSessions from "./pages/client/ClientSessions";
import ClientSessionDetail from "./pages/client/SessionDetail";
import ClientPayments from "./pages/client/ClientPayments";
import ClientInvoices from "./pages/client/ClientInvoices";
import ClientNotifications from "./pages/client/ClientNotifications";
import ClientProfile from "./pages/client/Profile";
import AdminProfile from "./pages/admin/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/domain-info" element={<DomainInfo />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/dashboard/clients/:id" element={<ClientDetail />} />
          <Route path="/dashboard/sessions" element={<Sessions />} />
          <Route path="/dashboard/sessions/:id" element={<SessionDetail />} />
          <Route path="/dashboard/payments" element={<Payments />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/availability" element={<Availability />} />
          <Route path="/dashboard/profile" element={<AdminProfile />} />
          
          {/* Client Dashboard Routes */}
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-dashboard/schedule" element={<ClientSchedule />} />
          <Route path="/client-dashboard/sessions" element={<ClientSessions />} />
          <Route path="/client-dashboard/sessions/:id" element={<ClientSessionDetail />} />
          <Route path="/client-dashboard/payments" element={<ClientPayments />} />
          <Route path="/client-dashboard/invoices" element={<ClientInvoices />} />
          <Route path="/client-dashboard/notifications" element={<ClientNotifications />} />
          <Route path="/client-dashboard/profile/edit" element={<ClientProfile />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
