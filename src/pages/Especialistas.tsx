
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, Youtube, ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AvailabilityController } from "@/controllers/AvailabilityController";
import { Availability } from "@/types/availability";

interface Especialista {
  id: string;
  full_name: string;
  avatar_url: string;
  description?: string;
  session_price?: number;
  rating?: number;
  specialty?: string;
  location?: string;
  experience?: number;
  appointments_count?: number;
  reviews_count?: number;
}

interface AvailableTimeSlot {
  time: string;
  available: boolean;
}

interface DailyAvailability {
  [date: string]: AvailableTimeSlot[];
}

const EspecialistasPage = () => {
  const [especialistas, setEspecialistas] = useState<Especialista[]>([]);
  const [loading, setLoading] = useState(true);
  const [availabilityByEspecialista, setAvailabilityByEspecialista] = useState<{[id: string]: DailyAvailability}>({});
  const today = new Date();
  
  // Gerar dias da semana para o calendário
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(today, i));
  
  useEffect(() => {
    const fetchEspecialistas = async () => {
      try {
        // Buscar perfis com role = 'admin' pois são os terapeutas/especialistas
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "admin");

        if (error) throw error;

        // Transformando os dados para o formato que precisamos
        let especialistasData = data.map((profile) => ({
          id: profile.id,
          full_name: profile.full_name || "Especialista",
          avatar_url: profile.avatar_url || "",
          description: profile.notes || "Há +6 anos ajudo a superar ansiedade, estresse, medo, timidez, depressão, sabotagem, procrastinação, bloqueio, trauma, incerteza e a desenvolver autoestima, relacionamento, carreira comunicação, autoliderança, clareza e equilíbrio emocional para conquistar seus objetivos. Agende e nos vemos em breve.",
          session_price: 150, // Valor padrão, idealmente viria do banco
          rating: 4.8, // Valor padrão, idealmente viria de avaliações
          specialty: "Terapeuta", // Exemplo, idealmente viria do banco
          location: "Atendimento online",
          experience: Math.floor(Math.random() * 20) + 3, // Entre 3 e 23 anos de experiência
          appointments_count: Math.floor(Math.random() * 300) + 50, // Entre 50 e 350 atendimentos
          reviews_count: Math.floor(Math.random() * 50) + 5 // Entre 5 e 55 comentários
        }));

        // Adicionar especialistas fictícios para visualização do layout
        if (especialistasData.length < 6) {
          const ficticios = [
            {
              id: "ficticio-1",
              full_name: "Amanda Santos",
              avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Especialista em psicologia clínica com abordagem humanista, focada no autoconhecimento e desenvolvimento pessoal. Atendo questões relacionadas à ansiedade, autoestima, relacionamentos e transições de vida. Meu objetivo é criar um espaço seguro onde você possa explorar suas emoções e desenvolver recursos internos para uma vida mais plena e consciente.",
              session_price: 180,
              rating: 4.9,
              specialty: "Psicóloga",
              location: "Atendimento online",
              experience: 8,
              appointments_count: 156,
              reviews_count: 23
            },
            {
              id: "ficticio-2",
              full_name: "Ricardo Oliveira",
              avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Há +15 anos ajudo pessoas a superarem traumas emocionais e construírem relacionamentos saudáveis. Especialista em terapia de casal e familiar, trabalho com comunicação, resolução de conflitos e reconexão afetiva. Minha abordagem é prática e baseada em evidências, com foco em resultados concretos e duradouros.",
              session_price: 200,
              rating: 4.7,
              specialty: "Terapeuta",
              location: "Atendimento online",
              experience: 15,
              appointments_count: 275,
              reviews_count: 41
            },
            {
              id: "ficticio-3",
              full_name: "Carla Mendes",
              avatar_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Psicóloga especializada em terapia cognitivo-comportamental para ansiedade e depressão. Ajudo pessoas a identificarem padrões de pensamento negativos e desenvolverem habilidades práticas para lidar com desafios emocionais. Meu trabalho é focado em resultados, com ferramentas que você pode aplicar no dia a dia para melhorar sua qualidade de vida.",
              session_price: 170,
              rating: 4.8,
              specialty: "Psicóloga",
              location: "Atendimento online",
              experience: 7,
              appointments_count: 132,
              reviews_count: 18
            },
            {
              id: "ficticio-4",
              full_name: "Thiago Luz",
              avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Há +6 anos ajudo a superar ansiedade, estresse, medo, timidez, depressão, sabotagem, procrastinação, bloqueio, trauma, incerteza e a desenvolver autoestima, relacionamento, carreira comunicação, autoliderança, clareza e equilíbrio emocional para conquistar seus objetivos. Agende e nos vemos em breve.",
              session_price: 190,
              rating: 5.0,
              specialty: "Terapeuta",
              location: "Atendimento online",
              experience: 21,
              appointments_count: 181,
              reviews_count: 19
            },
            {
              id: "ficticio-5",
              full_name: "Juliana Martins",
              avatar_url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Psicóloga especialista em desenvolvimento pessoal e profissional. Trabalho com questões relacionadas a carreira, propósito de vida e equilíbrio entre vida pessoal e trabalho. Minha abordagem integra técnicas de coaching e psicologia positiva para ajudar você a identificar seus talentos e alcançar seu potencial máximo.",
              session_price: 160,
              rating: 4.9,
              specialty: "Psicóloga",
              location: "Atendimento online",
              experience: 6,
              appointments_count: 98,
              reviews_count: 15
            }
          ];
          
          especialistasData = [...especialistasData, ...ficticios];
        }

        setEspecialistas(especialistasData);
        
        // Após carregar os especialistas, vamos buscar a disponibilidade para cada um
        await fetchAvailabilityForAll(especialistasData);
      } catch (error) {
        console.error("Erro ao buscar especialistas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialistas();
  }, []);

  // Função para buscar disponibilidade para todos os especialistas
  const fetchAvailabilityForAll = async (especialistas: Especialista[]) => {
    const availabilityMap: {[id: string]: DailyAvailability} = {};
    
    // Para cada especialista, buscar disponibilidade para os dias da semana
    for (const especialista of especialistas) {
      const dailyAvailability: DailyAvailability = {};
      
      // Para cada dia, buscar os horários disponíveis
      for (const day of weekDays) {
        const dayOfWeek = day.getDay();
        const formattedDate = format(day, 'yyyy-MM-dd');
        
        try {
          // Aqui estamos simulando a busca de disponibilidade
          // Em uma aplicação real, isso viria do backend baseado no especialista.id
          const availability = await simulateAvailabilityForDay(dayOfWeek);
          dailyAvailability[formattedDate] = availability;
        } catch (error) {
          console.error(`Erro ao buscar disponibilidade para ${especialista.full_name} no dia ${formattedDate}:`, error);
          dailyAvailability[formattedDate] = [];
        }
      }
      
      availabilityMap[especialista.id] = dailyAvailability;
    }
    
    setAvailabilityByEspecialista(availabilityMap);
  };
  
  // Função para simular disponibilidade para um dia da semana
  const simulateAvailabilityForDay = async (dayOfWeek: number): Promise<AvailableTimeSlot[]> => {
    // Simular alguns horários disponíveis baseados no dia da semana
    const possibleTimes = [
      '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', 
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      '19:00', '19:30', '20:00'
    ];
    
    // Vamos selecionar alguns horários aleatórios para simular disponibilidade
    // Em uma aplicação real, isso viria do banco de dados
    const availableSlots: AvailableTimeSlot[] = [];
    
    // Em fins de semana (0 = domingo, 6 = sábado) menos horários disponíveis
    const numSlots = (dayOfWeek === 0 || dayOfWeek === 6) 
      ? Math.floor(Math.random() * 3) + 1  // 1 a 3 slots nos fins de semana
      : Math.floor(Math.random() * 6) + 3; // 3 a 8 slots nos dias de semana
    
    // Selecionar horários aleatórios
    const selectedIndices = new Set<number>();
    while (selectedIndices.size < numSlots) {
      const index = Math.floor(Math.random() * possibleTimes.length);
      selectedIndices.add(index);
    }
    
    // Criar slots disponíveis a partir dos índices selecionados
    Array.from(selectedIndices).sort((a, b) => a - b).forEach(index => {
      availableSlots.push({
        time: possibleTimes[index],
        available: true
      });
    });
    
    return availableSlots;
  };

  // Função para retornar o nome abreviado do dia da semana
  const getDayName = (date: Date) => {
    return format(date, 'EEE', { locale: ptBR }).toUpperCase();
  }

  // Função para retornar o dia do mês
  const getDayNumber = (date: Date) => {
    return format(date, 'd');
  }

  // Função para retornar o mês abreviado
  const getMonthName = (date: Date) => {
    return format(date, 'MMM', { locale: ptBR }).toUpperCase();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nossos Especialistas</h1>
          <p className="text-gray-600">Encontramos {especialistas.length} especialistas disponíveis para você</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {especialistas.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Nenhum especialista encontrado</p>
              </div>
            ) : (
              especialistas.map((especialista) => (
                <Card 
                  key={especialista.id} 
                  className="overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Informações do especialista */}
                      <div className="md:w-2/5 flex flex-col">
                        <div className="flex gap-4">
                          <Avatar className="h-24 w-24 rounded-md">
                            <AvatarImage src={especialista.avatar_url} alt={especialista.full_name} className="object-cover" />
                            <AvatarFallback className="bg-primary/10 text-primary rounded-md">
                              {especialista.full_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-xl text-gray-900">{especialista.full_name}</h3>
                                <p className="text-gray-600">{especialista.specialty} • {especialista.experience} anos de experiência</p>
                              </div>
                              <Button variant="ghost" size="sm" className="rounded-full p-2">
                                <Heart className="h-5 w-5 text-gray-400" />
                              </Button>
                            </div>
                            
                            <Button variant="outline" size="sm" className="mt-2 rounded-full bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
                              <Youtube className="h-4 w-4 mr-1" />
                              Meu vídeo de apresentação
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="rounded-full">Ansiedade</Badge>
                          <Badge variant="secondary" className="rounded-full">Autoestima</Badge>
                          <Badge variant="secondary" className="rounded-full">Avaliação de Perfil Profissional</Badge>
                        </div>
                        
                        <p className="mt-4 text-gray-700 line-clamp-4">
                          {especialista.description}
                        </p>
                        
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 font-semibold">{especialista.rating}</span>
                            <span className="text-gray-500 ml-1">({especialista.reviews_count} comentários)</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <User className="h-4 w-4 mr-1" />
                            <span>{especialista.appointments_count} atendimentos</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Agenda do especialista */}
                      <div className="md:w-3/5 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                        <div className="flex justify-between items-center mb-4">
                          <Button variant="ghost" size="sm" className="rounded-full p-2">
                            <ArrowLeft className="h-5 w-5" />
                          </Button>
                          
                          <div className="grid grid-cols-5 gap-2 flex-1">
                            {weekDays.map((day, index) => (
                              <div 
                                key={index} 
                                className={`text-center p-2 rounded-md ${index === 0 ? 'bg-primary/10 text-primary font-medium' : ''}`}
                              >
                                <div className="text-xs uppercase">{getDayName(day)}</div>
                                <div className="text-xl font-semibold">{getDayNumber(day)}</div>
                                <div className="text-xs uppercase">{getMonthName(day)}</div>
                              </div>
                            ))}
                          </div>
                          
                          <Button variant="ghost" size="sm" className="rounded-full p-2">
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        {/* Grid de horários para cada dia */}
                        <div className="grid grid-cols-5 gap-2">
                          {/* Colunas para cada dia da semana */}
                          {weekDays.map((day, dayIndex) => {
                            const formattedDate = format(day, 'yyyy-MM-dd');
                            const dailySlots = availabilityByEspecialista[especialista.id]?.[formattedDate] || [];
                            
                            return (
                              <div key={dayIndex} className="space-y-2">
                                {dailySlots.length === 0 ? (
                                  <p className="text-center text-sm text-gray-400 py-2">Sem horários</p>
                                ) : (
                                  dailySlots.map((slot) => (
                                    <Button 
                                      key={`${dayIndex}-${slot.time}`} 
                                      variant="outline" 
                                      className="w-full justify-center text-center border border-gray-200"
                                    >
                                      {slot.time}
                                    </Button>
                                  ))
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="mt-6 flex justify-between items-center">
                          <div>
                            <p className="text-gray-500 text-sm">Sessão 50 min</p>
                            <p className="text-2xl font-bold text-green-600">R$ {especialista.session_price?.toFixed(2).replace('.', ',')}</p>
                          </div>
                          
                          <Link to={`/especialistas/${especialista.id}`}>
                            <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                              Agendar
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EspecialistasPage;
