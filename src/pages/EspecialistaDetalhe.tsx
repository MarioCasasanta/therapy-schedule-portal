
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, MapPin, Phone, Clock, Star, CheckCircle, MessageCircle, CalendarPlus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SpecialistDetails {
  id: string;
  full_name?: string;
  email?: string;
  created_at: string;
  specialty?: string;
  bio?: string;
  experience_years?: number;
  rating?: number;
  details?: {
    short_description?: string;
    long_description?: string;
    education?: string;
    thumbnail_url?: string;
    sessions_completed?: number;
    areas_of_expertise?: string[];
    languages?: string[];
    certifications?: string[];
  };
  telefone?: string; // Optional phone property
}

export default function EspecialistaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [specialist, setSpecialist] = useState<SpecialistDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSpecialistData() {
      try {
        setLoading(true);
        
        // First, get basic profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name, email, created_at, telefone")
          .eq("id", id)
          .single();
        
        if (profileError) throw profileError;
        
        // Get specialist data if available
        const { data: specialistData, error: specialistError } = await supabase
          .from("specialists")
          .select("id, specialty, bio, experience_years, rating")
          .eq("id", id)
          .maybeSingle();
          
        // Get specialist details if available
        const { data: detailsData, error: detailsError } = await supabase
          .from("specialist_details")
          .select("*")
          .eq("specialist_id", id)
          .maybeSingle();
        
        // Combine the data
        setSpecialist({
          ...profileData,
          ...(specialistData || {}),
          details: detailsData || undefined
        });
      } catch (err: any) {
        console.error("Error loading specialist data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      loadSpecialistData();
    }
  }, [id]);
  
  if (loading) {
    return <div className="container mx-auto py-12 text-center">Carregando detalhes do especialista...</div>;
  }
  
  if (error || !specialist) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Erro ao carregar dados</h2>
        <p className="text-red-500 mb-4">{error || "Especialista não encontrado"}</p>
        <Link to="/especialistas">
          <Button>Voltar para lista de especialistas</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={specialist.details?.thumbnail_url || "/placeholder.svg"} alt={specialist.full_name} />
                <AvatarFallback className="text-2xl">{specialist.full_name?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <CardTitle>{specialist.full_name}</CardTitle>
              <CardDescription>{specialist.specialty}</CardDescription>
              {specialist.rating && (
                <div className="flex items-center justify-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span>{specialist.rating}/5.0</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specialist.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{specialist.email}</span>
                  </div>
                )}
                {specialist.telefone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{specialist.telefone}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Desde {format(new Date(specialist.created_at), "MMMM yyyy", { locale: ptBR })}</span>
                </div>
                {specialist.experience_years && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{specialist.experience_years} anos de experiência</span>
                  </div>
                )}
                {specialist.details?.sessions_completed && (
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>{specialist.details.sessions_completed} sessões realizadas</span>
                  </div>
                )}
              </div>
              
              {specialist.details?.areas_of_expertise && specialist.details.areas_of_expertise.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Áreas de Especialização</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialist.details.areas_of_expertise.map((area, index) => (
                      <Badge key={index} variant="secondary">{area}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {specialist.details?.languages && specialist.details.languages.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Idiomas</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialist.details.languages.map((language, index) => (
                      <Badge key={index} variant="outline">{language}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center space-x-2">
              <Button size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contatar
              </Button>
              <Button size="sm" variant="outline">
                <CalendarPlus className="h-4 w-4 mr-2" />
                Agendar
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-4">
              <TabsTrigger value="about">Sobre</TabsTrigger>
              <TabsTrigger value="qualifications">Qualificações</TabsTrigger>
              <TabsTrigger value="services">Serviços</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o Especialista</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {specialist.details?.short_description && (
                    <div>
                      <h3 className="font-medium mb-2">Resumo</h3>
                      <p>{specialist.details.short_description}</p>
                    </div>
                  )}
                  
                  {specialist.bio || specialist.details?.long_description ? (
                    <div>
                      <h3 className="font-medium mb-2">Biografia</h3>
                      <p>{specialist.details?.long_description || specialist.bio}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Biografia não disponível.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="qualifications">
              <Card>
                <CardHeader>
                  <CardTitle>Qualificações & Educação</CardTitle>
                </CardHeader>
                <CardContent>
                  {specialist.details?.education ? (
                    <div>
                      <h3 className="font-medium mb-2">Formação Acadêmica</h3>
                      <p>{specialist.details.education}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Informações de educação não disponíveis.</p>
                  )}
                  
                  {specialist.details?.certifications && specialist.details.certifications.length > 0 ? (
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Certificações</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {specialist.details.certifications.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Oferecidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Informações sobre serviços não disponíveis no momento.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
