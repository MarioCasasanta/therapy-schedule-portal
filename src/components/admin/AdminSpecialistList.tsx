
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, User } from "lucide-react";

interface Specialist {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  role: string;
  created_at: string;
}

export default function AdminSpecialistList() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        console.log("🔍 Buscando especialistas do banco de dados...");
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "especialista");
        
        if (error) {
          console.error("❌ Erro ao buscar especialistas:", error);
          return;
        }
        
        console.log("✅ Especialistas encontrados:", data?.length || 0);
        setSpecialists(data || []);
      } catch (error) {
        console.error("❌ Erro ao carregar especialistas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Especialistas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Carregando especialistas...</p>
        </CardContent>
      </Card>
    );
  }

  if (specialists.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Especialistas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Nenhum especialista cadastrado na plataforma.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Especialistas Cadastrados ({specialists.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {specialists.map((specialist) => (
            <div key={specialist.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold text-lg">
                    {specialist.full_name || "Nome não informado"}
                  </h3>
                </div>
                <Badge variant="secondary">Especialista</Badge>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                {specialist.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{specialist.email}</span>
                  </div>
                )}
                
                {specialist.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{specialist.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Cadastrado em: {new Date(specialist.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
