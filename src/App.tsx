
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import ClientDashboard from "@/pages/ClientDashboard";
import Settings from "@/pages/dashboard/Settings";
import Sessions from "@/pages/dashboard/Sessions";
import NewSession from "@/pages/dashboard/sessions/NewSession";
import SessionDetails from "@/pages/dashboard/sessions/SessionDetails";
import Reports from "@/pages/dashboard/Reports";
import Payments from "@/pages/dashboard/Payments";
import Availability from "@/pages/dashboard/Availability";
import Notifications from "@/pages/dashboard/notifications";
import Profile from "@/pages/admin/Profile";
import ClientSessions from "@/pages/client/ClientSessions";
import ClientSchedule from "@/pages/client/ClientSchedule";
import ClientProfile from "@/pages/client/Profile";
import SessionFeedback from "@/pages/client/sessions/SessionFeedback";
import Especialistas from "@/pages/Especialistas";
import EspecialistaDetalhe from "@/pages/EspecialistaDetalhe";
import ParaEspecialistas from "@/pages/ParaEspecialistas";
import ChatGPTIntegration from "@/pages/Documentation/ChatGPTIntegration";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import DashboardClients from "@/pages/dashboard/Clients";
import SpecialistClients from "@/pages/dashboard/SpecialistClients";
import ClientDetail from "@/pages/dashboard/ClientDetail";

// Admin Dashboard Routes
import AdminDashboard from "@/pages/admin/AdminDashboard";
import BlogPosts from "@/pages/admin/BlogPosts";
import BlogPostEditor from "@/pages/admin/BlogPostEditor";

// Blog Public Routes
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/docs/chatgpt-integration" element={<ChatGPTIntegration />} />
        <Route path="/especialistas" element={<Especialistas />} />
        <Route path="/especialistas/:id" element={<EspecialistaDetalhe />} />
        <Route path="/para-especialistas" element={<ParaEspecialistas />} />
        
        {/* Blog Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        
        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/sessions" element={<Sessions />} />
        <Route path="/dashboard/sessions/new" element={<NewSession />} />
        <Route path="/dashboard/sessions/:id" element={<SessionDetails />} />
        <Route path="/dashboard/reports" element={<Reports />} />
        <Route path="/dashboard/payments" element={<Payments />} />
        <Route path="/dashboard/availability" element={<Availability />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/clients" element={<DashboardClients />} />
        <Route path="/dashboard/specialist-clients" element={<SpecialistClients />} />
        <Route path="/dashboard/clients/:id" element={<ClientDetail />} />
        
        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/blog-posts" element={<BlogPosts />} />
        <Route path="/admin/blog-posts/new" element={<BlogPostEditor />} />
        <Route path="/admin/blog-posts/edit/:id" element={<BlogPostEditor />} />
        
        {/* Client Routes */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-dashboard/sessions" element={<ClientSessions />} />
        <Route path="/client-dashboard/sessions/feedback" element={<SessionFeedback />} />
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
