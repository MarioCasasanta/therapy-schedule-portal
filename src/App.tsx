
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import AdminLogin from "@/pages/AdminLogin";
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
import ParaVoce from "@/pages/ParaVoce";
import ChatGPTIntegration from "@/pages/Documentation/ChatGPTIntegration";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import GerenciarClientes from "@/pages/dashboard/GerenciarClientes";
import SpecialistClients from "@/pages/dashboard/SpecialistClients";
import ClientDetail from "@/pages/dashboard/ClientDetail";
import DashboardSpecialists from "@/pages/dashboard/Specialists";
import HR from "@/pages/HR";
import RegistroEspecialista from "@/pages/RegistroEspecialista";

// Admin Dashboard Routes
import AdminDashboard from "@/pages/admin/AdminDashboard";
import BlogPosts from "@/pages/admin/BlogPosts";
import BlogPostEditor from "@/pages/admin/BlogPostEditor";
import AdminBlogOverview from "@/pages/admin/AdminBlogOverview";

// Blog Public Routes
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

// Client Routes
import ClientPayments from "@/pages/client/ClientPayments";
import ClientNotifications from "@/pages/client/ClientNotifications";
import ClientInvoices from "@/pages/client/ClientInvoices";
import ClientHelp from "@/pages/client/ClientHelp";
import ClientSettings from "@/pages/client/ClientSettings";
import ClientSessionDetail from "@/pages/client/SessionDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/docs/chatgpt-integration" element={<ChatGPTIntegration />} />
        <Route path="/especialistas" element={<Especialistas />} />
        <Route path="/especialistas/:id" element={<EspecialistaDetalhe />} />
        <Route path="/para-especialistas" element={<ParaEspecialistas />} />
        <Route path="/para-voce" element={<ParaVoce />} />
        <Route path="/trabalhe-conosco" element={<HR />} />
        <Route path="/cadastro-especialista" element={<RegistroEspecialista />} />
        
        {/* Blog Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        
        {/* Dashboard Routes - Access point */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/clients" element={<GerenciarClientes />} />
        <Route path="/admin/clients/:id" element={<ClientDetail />} />
        <Route path="/admin/specialists" element={<DashboardSpecialists />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/sessions" element={<Sessions />} />
        <Route path="/admin/sessions/new" element={<NewSession />} />
        <Route path="/admin/sessions/:id" element={<SessionDetails />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/availability" element={<Availability />} />
        <Route path="/admin/notifications" element={<Notifications />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/blog-posts" element={<BlogPosts />} />
        <Route path="/admin/blog-overview" element={<AdminBlogOverview />} />
        <Route path="/admin/blog-posts/new" element={<BlogPostEditor />} />
        <Route path="/admin/blog-posts/edit/:id" element={<BlogPostEditor />} />
        
        {/* Specialist Routes */}
        <Route path="/specialist-clients" element={<SpecialistClients />} />
        <Route path="/specialist-settings" element={<Settings />} />
        <Route path="/specialist-sessions" element={<Sessions />} />
        <Route path="/specialist-sessions/new" element={<NewSession />} />
        <Route path="/specialist-sessions/:id" element={<SessionDetails />} />
        <Route path="/specialist-reports" element={<Reports />} />
        <Route path="/specialist-payments" element={<Payments />} />
        <Route path="/specialist-availability" element={<Availability />} />
        <Route path="/specialist-notifications" element={<Notifications />} />
        <Route path="/specialist-profile" element={<Profile />} />
        
        {/* Client Routes */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-dashboard/sessions" element={<ClientSessions />} />
        <Route path="/client-dashboard/sessions/feedback" element={<SessionFeedback />} />
        <Route path="/client-dashboard/sessions/:id" element={<ClientSessionDetail />} />
        <Route path="/client-dashboard/schedule" element={<ClientSchedule />} />
        <Route path="/client-dashboard/profile/edit" element={<ClientProfile />} />
        <Route path="/client-dashboard/payments" element={<ClientPayments />} />
        <Route path="/client-dashboard/notifications" element={<ClientNotifications />} />
        <Route path="/client-dashboard/invoices" element={<ClientInvoices />} />
        <Route path="/client-dashboard/help" element={<ClientHelp />} />
        <Route path="/client-dashboard/settings" element={<ClientSettings />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
