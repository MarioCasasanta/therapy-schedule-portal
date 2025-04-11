import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ParaEspecialistas from "./pages/ParaEspecialistas";
import PlansPage from "./pages/PlansPage";
import Especialistas from "./pages/Especialistas";
import EspecialistaDetalhe from "./pages/EspecialistaDetalhe";
import RegistroEspecialista from "./pages/RegistroEspecialista";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SubscriptionSuccess from "./pages/subscription/SubscriptionSuccess";
import SubscriptionCancel from "./pages/subscription/SubscriptionCancel";
import ClientDashboard from "./pages/client/ClientDashboard";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import ParaVoce from "./pages/ParaVoce";
import { CompleteSpecialistProfile } from "./pages/CompleteSpecialistProfile";

function App() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setIsAdmin(user?.role === "admin");
    }
  }, [user, loading]);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/para-especialistas" element={<ParaEspecialistas />} />
          <Route path="/para-voce" element={<ParaVoce />} />
          <Route path="/planos" element={<PlansPage />} />
          <Route path="/especialistas" element={<Especialistas />} />
          <Route path="/especialistas/:id" element={<EspecialistaDetalhe />} />
          <Route path="/registro-especialista" element={<RegistroEspecialista />} />
          <Route path="/termos-de-uso" element={<TermsOfService />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/subscription/success" element={<SubscriptionSuccess />} />
          <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
          
          <Route 
            path="/complete-specialist-profile" 
            element={
              <ProtectedRoute>
                <CompleteSpecialistProfile />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/dashboard/cliente" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>}>
            <Route index element={<ClientDashboard />} />
          </Route>
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
          </Route>
          
          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>}>
            <Route index element={<AdminDashboard />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
