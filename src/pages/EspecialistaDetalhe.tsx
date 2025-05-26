
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, MessageCircle, Award, Clock, Users } from "lucide-react";

interface SpecialistDetail {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: string;
  thumbnail_url?: string;
  short_description?: string;
  long_description?: string;
  education?: string;
  certifications?: string[];
  languages?: string[];
  areas_of_expertise?: string[];
  sessions_completed?: number;
  rating?: number;
}

const EspecialistaDetalhe = () => {
  const { id } = useParams();

  const { data: specialist, isLoading, error } = useQuery({
    queryKey: ['specialist', id],
    queryFn: async () => {
      console.log('Fetching specialist with id:', id);
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .eq('role', 'especialista')
        .single();

      if (profileError) {
        console.error('Error fetching specialist profile:', profileError);
        throw profileError;
      }

      const { data: details, error: detailsError } = await supabase
        .from('specialist_details')
        .select('*')
        .eq('specialist_id', id)
        .single();

      if (detailsError && detailsError.code !== 'PGRST116') {
        console.error('Error fetching specialist details:', detailsError);
      }

      return {
        ...profile,
        ...details
      } as SpecialistDetail;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sage-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Carregando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !specialist) {
    return (
      <div className="min-h-screen bg-sage-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-lg text-red-600">Especialista não encontrado.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <img
                    src={specialist.thumbnail_url || "/placeholder.svg"}
                    alt={specialist.full_name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-2">{specialist.full_name}</h1>
                <p className="text-gray-600 mb-4">{specialist.short_description || "Especialista em desenvolvimento pessoal"}</p>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= (specialist.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {specialist.rating || 0}/5
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-primary mr-1" />
                    </div>
                    <p className="text-sm text-gray-600">Sessões</p>
                    <p className="font-semibold">{specialist.sessions_completed || 0}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="h-4 w-4 text-primary mr-1" />
                    </div>
                    <p className="text-sm text-gray-600">Disponível</p>
                    <p className="font-semibold text-green-600">Hoje</p>
                  </div>
                </div>

                <Button className="w-full mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Consulta
                </Button>
                
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {specialist.long_description || specialist.short_description || "Profissional dedicado ao desenvolvimento pessoal e bem-estar dos clientes."}
                </p>
              </CardContent>
            </Card>

            {/* Expertise */}
            {specialist.areas_of_expertise && specialist.areas_of_expertise.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Áreas de Especialização</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {specialist.areas_of_expertise.map((area, index) => (
                      <Badge key={index} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {specialist.education && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Formação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{specialist.education}</p>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {specialist.certifications && specialist.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Certificações</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {specialist.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center">
                        <Award className="h-4 w-4 text-primary mr-2" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Languages */}
            {specialist.languages && specialist.languages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Idiomas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {specialist.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EspecialistaDetalhe;
