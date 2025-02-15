
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import ClientDashboard from "@/pages/ClientDashboard";
import Settings from "@/pages/dashboard/Settings";
import Sessions from "@/pages/dashboard/Sessions";
import SessionDetail from "@/pages/dashboard/SessionDetail";
import Reports from "@/pages/dashboard/Reports";
import Payments from "@/pages/dashboard/Payments";
import Availability from "@/pages/dashboard/Availability";
import Profile from "@/pages/admin/Profile";
import ClientSessions from "@/pages/client/ClientSessions";
import ClientSchedule from "@/pages/client/ClientSchedule";
import ClientProfile from "@/pages/client/Profile";
import ChatGPTIntegration from "@/pages/Documentation/ChatGPTIntegration";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/docs/chatgpt-integration" element={<ChatGPTIntegration />} />
        
        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/sessions" element={<Sessions />} />
        <Route path="/dashboard/sessions/:id" element={<SessionDetail />} />
        <Route path="/dashboard/reports" element={<Reports />} />
        <Route path="/dashboard/payments" element={<Payments />} />
        <Route path="/dashboard/availability" element={<Availability />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        
        {/* Client Routes */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-dashboard/sessions" element={<ClientSessions />} />
        <Route path="/client-dashboard/schedule" element={<ClientSchedule />} />
        <Route path="/client-dashboard/profile/edit" element={<ClientProfile />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
