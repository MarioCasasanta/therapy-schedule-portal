
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          
          // Get user profile with role information
          const { data, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
            
          if (profileError) {
            throw profileError;
          }
          
          setProfile(data);
          
          // If no profile exists, create one with default role
          if (!data) {
            const { error: insertError } = await supabase
              .from("profiles")
              .insert({
                id: session.user.id,
                email: session.user.email,
                role: "cliente" // Default role
              });
              
            if (insertError) throw insertError;
          }
        }
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
            
          if (error) throw error;
          
          setProfile(data);
          
          // Create profile if it doesn't exist
          if (!data) {
            await supabase.from("profiles").insert({
              id: session.user.id,
              email: session.user.email,
              role: "cliente" // Default role
            });
          }
        } catch (err: any) {
          console.error("Error fetching profile:", err);
          setError(err.message);
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Helper functions for role-based access control
  const isAdmin = () => profile?.role === "admin";
  const isSpecialist = () => profile?.role === "especialista";
  const isClient = () => profile?.role === "cliente";
  
  // Helper function for secure role changing (only admins can change roles)
  const changeUserRole = async (userId: string, newRole: string) => {
    if (!isAdmin()) {
      throw new Error("Apenas administradores podem alterar papéis de usuários");
    }
    
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);
      
    if (error) throw error;
    
    return true;
  };

  return {
    user,
    profile,
    loading,
    error,
    isAdmin,
    isSpecialist,
    isClient,
    changeUserRole
  };
};
