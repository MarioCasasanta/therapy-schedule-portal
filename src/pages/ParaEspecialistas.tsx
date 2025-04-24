import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { 
  X, Award, Star, Phone, Calendar, 
  Video, Book, Users, Check, BarChart, 
  Clock, UserPlus, Save
} from "lucide-react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const allFeatures = [
  { 
    name: "Perfil completo na plataforma", 
    available: { basic: true, professional: true, premium: true },
    icon: "profile"
  },
  { 
    name: "Integração com Google Calendar", 
    available: { basic: true, professional: true, premium: true },
    icon: "calendar"
  },
  { 
    name: "Pagamentos via plataforma", 
    available: { basic: true, professional: true, premium: true },
    icon: "payment"
  },
  { 
    name: "Calendário na página do perfil", 
    available: { basic: false, professional: true, premium: true },
    icon: "calendar"
  },
  { 
    name: "Botão de WhatsApp no perfil", 
    available: { basic: false, professional: true, premium: true },
    icon: "whatsapp"
  },
  { 
    name: "Prioridade nos resultados de busca", 
    available: { basic: false, professional: true, premium: true },
    icon: "search"
  },
  { 
    name: "Lembretes automáticos para clientes", 
    available: { basic: false, professional: true, premium: true },
    icon: "reminder"
  },
  { 
    name: "Vídeo de apresentação", 
    available: { basic: false, professional: true, premium: true },
    icon: "video"
  },
  { 
    name: "Ferramentas e testes da comunidade", 
    available: { basic: false, professional: true, premium: true },
    icon: "community"
  },
  { 
    name: "Agendamentos por mês", 
    available: { basic: "5", professional: "Ilimitados", premium: "Ilimitados" },
    icon: "schedule"
  },
  { 
    name: "Perfil destacado na plataforma", 
    available: { basic: false, professional: false, premium: true },
    icon: "highlight"
  },
  { 
    name: "Selo 'Além do Apego' após certificação", 
    available: { basic: false, professional: false, premium: true },
    icon: "award"
  },
  { 
    name: "Exibição em campanhas de dependência emocional", 
    available: { basic: false, professional: false, premium: true },
    icon: "campaign"
  },
  { 
    name: "Ferramentas de análise avançadas", 
    available: { basic: false, professional: false, premium: true },
    icon: "analytics"
  },
  { 
    name: "Artigos destacados no blog", 
    available: { basic: false, professional: false, premium: true },
    icon: "blog"
  },
  { 
    name: "Acesso à biblioteca de vídeos", 
    available: { basic: false, professional: false, premium: true },
    icon: "video-library"
  },
  { 
    name: "Suporte", 
    available: { basic: "Email", professional: "Prioritário", premium: "24/7" },
    icon: "support"
  },
  { 
    name: "Relatórios de desempenho", 
    available: { basic: false, professional: "Mensais", premium: "Semanais" },
    icon: "reports"
  }
];

const getSortedFeatures = (planType: string) => {
  return [...allFeatures].sort((a, b) => {
    const aAvailable = a.available[planType as keyof typeof a.available];
    const bAvailable = b.available[planType as keyof typeof b.available];
    
    if (!!aAvailable === !!bAvailable) {
      return 0;
    }
    
    return !!aAvailable ? -1 : 1;
  });
};

const plans = [
  {
    name: "Básico",
    price: "R$ 49,90",
    description: "Ideal para terapeutas iniciantes",
    planType: "basic",
    color: "bg-white",
    buttonColor: "bg-primary hover:bg-primary/90"
  },
  {
    name: "Profissional",
    price: "R$ 99,90",
    description: "Para terapeutas estabelecidos",
    planType: "professional",
    color: "bg-primary/5",
    buttonColor: "bg-primary hover:bg-primary/90",
    highlighted: true
  },
  {
    name: "Premium",
    price: "R$ 149,90",
    description: "Para práticas avançadas",
    planType: "premium",
    color: "bg-white",
    buttonColor: "bg-primary hover:bg-primary/90"
  }
];

const steps = [
  {
    title: "Crie sua conta",
    description: "Registre-se gratuitamente e configure seu perfil profissional",
    icon: <Users className="h-10 w-10 text-primary" />
  },
  {
    title: "Configure sua agenda",
    description: "Defina seus horários de disponibilidade e serviços oferecidos",
    icon: <Calendar className="h-10 w-10 text-primary" />
  },
  {
    title: "Receba agendamentos",
    description: "Clientes poderão agendar sessões em seus horários disponíveis",
    icon: <Clock className="h-10 w-10 text-primary" />
  },
  {
    title: "Gerencie sua prática",
    description: "Acompanhe seu desempenho e cresça com nossa plataforma",
    icon: <BarChart className="h-10 w-10 text-primary" />
  }
];

const formSchema = z.object({
  nome_completo: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(8, "Telefone inválido"),
  especialidade: z.string(),
  formacao: z.string(),
  anos_experiencia: z.string(),
  biografia_curta: z.string(),
  biografia_longa: z.string(),
  areas_especializacao: z.string(),
  idiomas: z.string(),
  certificacoes: z.string().optional().default(""),
  foto_perfil: z.string().optional().default(""),
  video_apresentacao: z.string().optional().default(""),
  whatsapp: z.string().optional().default(""),
  plano_escolhido: z.string(),
  equipe_criar_copy: z.boolean().default(false),
  preencher_depois: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const ParaEspecialistas = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome_completo: "",
      email: "",
      telefone: "",
      especialidade: "psicologia",
      formacao: "",
      anos_experiencia: "",
      biografia_curta: "",
      biografia_longa: "",
      areas_especializacao: "",
      idiomas: "",
      certificacoes: "",
      foto_perfil: "",
      video_apresentacao: "",
      whatsapp: "",
      plano_escolhido: "basic",
      equipe_criar_copy: false,
      preencher_depois: false,
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { error } = await supabase.from("specialist_registrations").insert({
        ...data,
        registration_status: "pending"
      });

      if (error) throw error;

      setRegistrationSubmitted(true);
      setRegistrationDialogOpen(false);
      toast({
        title: "Cadastro enviado com sucesso!",
        description: "Nossa equipe entrará em contato em breve.",
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente mais tarde.",
      });
    }
  };

  const nextStep = () => {
    const currentStepFields: Record<number, Array<keyof FormValues>> = {
      1: ["nome_completo", "email", "telefone"],
      2: ["especialidade", "formacao", "anos_experiencia"],
      3: ["biografia_curta", "biografia_longa"],
      4: ["areas_especializacao", "idiomas", "certificacoes"],
      5: ["plano_escolhido"]
    };

    const fields = currentStepFields[step];
    const isValid = fields.every(field => {
      const value = form.getValues(field);
      return value !== undefined && value !== "";
    });

    if (isValid) {
      setStep(step + 1);
    } else {
      fields.forEach(field => {
        if (!form.getValues(field)) {
          form.setError(field, {
            type: "required",
            message: "Este campo é obrigatório"
          });
        }
      });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const openRegistrationDialog = (planType = "basic") => {
    form.setValue("plano_escolhido", planType);
    setSelectedPlan(planType);
    setRegistrationDialogOpen(true);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
              Expanda sua prática terapêutica
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Junte-se à plataforma Além do Apego e conecte-se com clientes que buscam seu apoio especializado
            </p>
            {!registrationSubmitted ? (
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                onClick={() => openRegistrationDialog()}
              >
                <UserPlus className="mr-2" />
                Comece agora
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
                disabled
              >
                <Check className="mr-2" />
                Cadastro enviado com sucesso!
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Otimize seu tempo e expanda seu alcance com nossa plataforma intuitiva
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="bg-primary/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Planos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o seu estágio profissional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} ${plan.highlighted ? 'shadow-lg ring-2 ring-primary/20' : 'shadow'}`}>
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-sm font-medium py-1 px-4 rounded-full">
                    Mais popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-2">/mês</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {getSortedFeatures(plan.planType).map((feature, i) => {
                      const available = feature.available[plan.planType as keyof typeof feature.available];
                      
                      let icon;
                      
                      if (available === false) {
                        icon = <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />;
                      } else {
                        if (feature.icon === "award" || feature.name.includes("Selo")) {
                          icon = <Award className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />;
                        } else if (feature.icon === "highlight" || feature.name.includes("destacado")) {
                          icon = <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />;
                        } else if (feature.icon === "whatsapp" || feature.name.includes("WhatsApp")) {
                          icon = <Phone className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />;
                        } else if (feature.icon === "calendar" || feature.name.includes("Calendar") || feature.name.includes("Calendário")) {
                          icon = <Calendar className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />;
                        } else if (feature.icon === "video" || feature.name.includes("Vídeo")) {
                          icon = <Video className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />;
                        } else if (feature.icon === "blog" || feature.name.includes("blog") || feature.icon === "video-library" || feature.name.includes("biblioteca")) {
                          icon = <Book className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />;
                        } else if (feature.icon === "community" || feature.name.includes("comunidade")) {
                          icon = <Users className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />;
                        } else {
                          icon = <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />;
                        }
                      }
                      
                      let displayText = feature.name;
                      if (typeof available === 'string') {
                        if (feature.name === "Agendamentos por mês") {
                          displayText = `${feature.name}: ${available}`;
                        } else if (feature.name === "Suporte" || feature.name === "Relatórios de desempenho") {
                          displayText = `${feature.name}: ${available}`;
                        }
                      }
                      
                      return (
                        <li key={i} className="flex items-start">
                          {icon}
                          <span className={`${available === false ? 'text-gray-400' : 'text-gray-700'}`}>
                            {displayText}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.buttonColor}`}
                    onClick={() => openRegistrationDialog(plan.planType)}
                  >
                    Selecionar plano
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Registration Dialog (Pop-up) */}
      <Dialog open={registrationDialogOpen} onOpenChange={setRegistrationDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-semibold text-center">Cadastre-se como especialista</DialogTitle>
            <DialogDescription className="text-center">
              Preencha o formulário abaixo para iniciar seu processo de cadastro
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center mt-2 mb-6">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5, 6].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                      ${step === stepNum ? 'bg-primary text-white' : 
                        step > stepNum ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {step > stepNum ? <Check className="h-4 w-4" /> : stepNum}
                  </div>
                  {stepNum < 6 && (
                    <div className={`w-8 h-1 ${step > stepNum ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nome_completo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo*</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email profissional*</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone de contato*</FormLabel>
                          <FormControl>
                            <Input placeholder="(00) 00000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="pt-4">
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className="w-full"
                    >
                      Continuar
                    </Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="especialidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Especialidade*</FormLabel>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="psicologia" />
                                </FormControl>
                                <FormLabel className="font-normal">Psicologia</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="psicanalise" />
                                </FormControl>
                                <FormLabel className="font-normal">Psicanálise</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="terapia_casal" />
                                </FormControl>
                                <FormLabel className="font-normal">Terapia de Casal</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="coaching" />
                                </FormControl>
                                <FormLabel className="font-normal">Coaching</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="formacao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Formação acadêmica*</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Psicologia pela USP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="anos_experiencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anos de experiência*</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="w-full md:w-auto"
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="w-full md:w-auto"
                    >
                      Continuar
                    </Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="biografia_curta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biografia curta (para exibição em listagens)*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Breve descrição de sua prática profissional (máx. 300 caracteres)" 
                              {...field} 
                              className="h-20"
                              maxLength={300}
                            />
                          </FormControl>
                          <FormDescription>
                            Usado em cartões de listagem. Máximo 300 caracteres.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="biografia_longa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biografia completa (para sua página de perfil)*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descrição detalhada de sua formação, experiência e abordagem terapêutica (máx. 1000 caracteres)" 
                              {...field} 
                              className="min-h-[150px]"
                              maxLength={1000}
                            />
                          </FormControl>
                          <FormDescription>
                            Será exibida na sua página de perfil completo. Máximo 1000 caracteres.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preencher_depois"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 border rounded-md p-4 bg-gray-50">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Preencher biografia posteriormente</FormLabel>
                            <FormDescription>
                              Você pode adicionar ou editar sua biografia mais tarde no seu perfil.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="w-full md:w-auto"
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="w-full md:w-auto"
                    >
                      Continuar
                    </Button>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="areas_especializacao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Áreas de especialização*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Ansiedade, Depressão, Dependência Emocional" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Separe diferentes áreas por vírgulas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="idiomas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Idiomas*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Português, Inglês, Espanhol" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Separe diferentes idiomas por vírgulas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="certificacoes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certificações</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: CFP, Certificação em TCC" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Separe diferentes certificações por vírgulas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="w-full md:w-auto"
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="w-full md:w-auto"
                    >
                      Continuar
                    </Button>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="plano_escolhido"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plano escolhido*</FormLabel>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              className="space-y-4"
                            >
                              <FormItem className="flex items-start space-x-3 space-y-0 border rounded-md p-4">
                                <FormControl>
                                  <RadioGroupItem value="basic" />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="font-semibold text-lg">Básico - R$ 49,90/mês</FormLabel>
                                  <p className="text-sm text-gray-500">
                                    Ideal para terapeutas iniciantes
                                  </p>
                                </div>
                              </FormItem>
                              <FormItem className="flex items-start space-x-3 space-y-0 border rounded-md p-4 bg-primary/5 border-primary/20">
                                <FormControl>
                                  <RadioGroupItem value="professional" />
                                </FormControl>
                                <div className="space-y-1">
                                  <div className="flex items-center">
                                    <FormLabel className="font-semibold text-lg">Profissional - R$ 99,90/mês</FormLabel>
                                    <span className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">Mais popular</span>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    Para terapeutas estabelecidos
                                  </p>
                                </div>
                              </FormItem>
                              <FormItem className="flex items-start space-x-3 space-y-0 border rounded-md p-4">
                                <FormControl>
                                  <RadioGroupItem value="premium" />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="font-semibold text-lg">Premium - R$ 149,90/mês</FormLabel>
                                  <p className="text-sm text-gray-500">
                                    Para práticas avançadas
                                  </p>
                                </div>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="w-full md:w-auto"
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="w-full md:w-auto"
                    >
                      Continuar
                    </Button>
                  </div>
                </>
              )}

              {step === 6 && (
                <>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="foto_perfil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Foto de perfil (URL)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="URL da sua foto de perfil" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Link para uma imagem profissional sua (opcional).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="video_apresentacao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vídeo de apresentação (URL)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Link do YouTube, Vimeo, etc." 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Link para um vídeo curto de apresentação (opcional).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp profissional</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(00) 00000-0000" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Número para contato via WhatsApp (opcional).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="w-full md:w-auto"
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit"
                      className="w-full md:w-auto"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Enviar cadastro
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParaEspecialistas;
