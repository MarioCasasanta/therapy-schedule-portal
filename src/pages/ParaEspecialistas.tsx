import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  nome_completo: string;
  email: string;
  telefone: string;
  anos_experiencia: string;
  especialidade: string;
  formacao: string;
  certificacoes: string;
  biografia_curta: string;
  biografia_longa: string;
  areas_especializacao: string;
  idiomas: string;
  whatsapp: string;
  foto_perfil: string;
  video_apresentacao: string;
  plano_escolhido: string;
  preencher_depois: boolean;
  equipe_criar_copy: boolean;
}

const ParaEspecialistas = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome_completo: '',
    email: '',
    telefone: '',
    anos_experiencia: '',
    especialidade: '',
    formacao: '',
    certificacoes: '',
    biografia_curta: '',
    biografia_longa: '',
    areas_especializacao: '',
    idiomas: '',
    whatsapp: '',
    foto_perfil: '',
    video_apresentacao: '',
    plano_escolhido: '',
    preencher_depois: false,
    equipe_criar_copy: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the data for submission - ensure all required fields are included
      const submissionData = {
        nome_completo: formData.nome_completo,
        email: formData.email,
        telefone: formData.telefone,
        anos_experiencia: formData.anos_experiencia || '0', // Provide default value
        especialidade: formData.especialidade,
        formacao: formData.formacao,
        certificacoes: formData.certificacoes || '',
        biografia_curta: formData.biografia_curta || '',
        biografia_longa: formData.biografia_longa || '',
        areas_especializacao: formData.areas_especializacao || '',
        idiomas: formData.idiomas || '',
        whatsapp: formData.whatsapp || '',
        foto_perfil: formData.foto_perfil || '',
        video_apresentacao: formData.video_apresentacao || '',
        plano_escolhido: formData.plano_escolhido,
        preencher_depois: formData.preencher_depois || false,
        equipe_criar_copy: formData.equipe_criar_copy || false,
        status: 'pending'
      };

      const { error } = await supabase
        .from('specialist_registrations')
        .insert(submissionData);

      if (error) throw error;

      toast({
        title: "Cadastro enviado com sucesso!",
        description: "Entraremos em contato em breve para dar continuidade ao seu cadastro.",
      });

      // Reset form
      setFormData({
        nome_completo: '',
        email: '',
        telefone: '',
        anos_experiencia: '',
        especialidade: '',
        formacao: '',
        certificacoes: '',
        biografia_curta: '',
        biografia_longa: '',
        areas_especializacao: '',
        idiomas: '',
        whatsapp: '',
        foto_perfil: '',
        video_apresentacao: '',
        plano_escolhido: '',
        preencher_depois: false,
        equipe_criar_copy: false
      });
      setCurrentStep(1);
    } catch (error: any) {
      console.error('Erro ao enviar cadastro:', error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar cadastro",
        description: error.message || "Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Seja um Especialista Além do Apego</h1>
            </div>
            <div className="divide-y divide-gray-200">
              {currentStep === 1 && (
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="text-xl font-semibold">Informações Pessoais</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        id="nome_completo"
                        name="nome_completo"
                        type="text"
                        className="peer"
                        placeholder="Nome Completo"
                        value={formData.nome_completo}
                        onChange={handleChange}
                      />
                      <Label htmlFor="nome_completo">Nome Completo</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="peer"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        className="peer"
                        placeholder="Telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                      />
                      <Label htmlFor="telefone">Telefone</Label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="text-xl font-semibold">Informações Profissionais</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        id="anos_experiencia"
                        name="anos_experiencia"
                        type="number"
                        className="peer"
                        placeholder="Anos de Experiência"
                        value={formData.anos_experiencia}
                        onChange={handleChange}
                      />
                      <Label htmlFor="anos_experiencia">Anos de Experiência</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="especialidade"
                        name="especialidade"
                        type="text"
                        className="peer"
                        placeholder="Especialidade"
                        value={formData.especialidade}
                        onChange={handleChange}
                      />
                      <Label htmlFor="especialidade">Especialidade</Label>
                    </div>
                    <div className="relative">
                      <Textarea
                        id="formacao"
                        name="formacao"
                        className="peer"
                        placeholder="Formação"
                        value={formData.formacao}
                        onChange={handleChange}
                      />
                      <Label htmlFor="formacao">Formação</Label>
                    </div>
                    <div className="relative">
                      <Textarea
                        id="certificacoes"
                        name="certificacoes"
                        className="peer"
                        placeholder="Certificações"
                        value={formData.certificacoes}
                        onChange={handleChange}
                      />
                      <Label htmlFor="certificacoes">Certificações</Label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="text-xl font-semibold">Perfil e Apresentação</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <Textarea
                        id="biografia_curta"
                        name="biografia_curta"
                        className="peer"
                        placeholder="Biografia Curta"
                        value={formData.biografia_curta}
                        onChange={handleChange}
                      />
                      <Label htmlFor="biografia_curta">Biografia Curta</Label>
                    </div>
                    <div className="relative">
                      <Textarea
                        id="biografia_longa"
                        name="biografia_longa"
                        className="peer"
                        placeholder="Biografia Longa"
                        value={formData.biografia_longa}
                        onChange={handleChange}
                      />
                      <Label htmlFor="biografia_longa">Biografia Longa</Label>
                    </div>
                    <div className="relative">
                      <Textarea
                        id="areas_especializacao"
                        name="areas_especializacao"
                        className="peer"
                        placeholder="Áreas de Especialização"
                        value={formData.areas_especializacao}
                        onChange={handleChange}
                      />
                      <Label htmlFor="areas_especializacao">Áreas de Especialização</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="idiomas"
                        name="idiomas"
                        type="text"
                        className="peer"
                        placeholder="Idiomas"
                        value={formData.idiomas}
                        onChange={handleChange}
                      />
                      <Label htmlFor="idiomas">Idiomas</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="text"
                        className="peer"
                        placeholder="WhatsApp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                      />
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="text-xl font-semibold">Mídia e Plano</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        id="foto_perfil"
                        name="foto_perfil"
                        type="text"
                        className="peer"
                        placeholder="Link da Foto de Perfil"
                        value={formData.foto_perfil}
                        onChange={handleChange}
                      />
                      <Label htmlFor="foto_perfil">Link da Foto de Perfil</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="video_apresentacao"
                        name="video_apresentacao"
                        type="text"
                        className="peer"
                        placeholder="Link do Vídeo de Apresentação"
                        value={formData.video_apresentacao}
                        onChange={handleChange}
                      />
                      <Label htmlFor="video_apresentacao">Link do Vídeo de Apresentação</Label>
                    </div>
                    <div className="relative">
                      <Select onValueChange={(value) => setFormData(prevData => ({ ...prevData, plano_escolhido: value }))}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um Plano" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plano_bronze">Plano Bronze</SelectItem>
                          <SelectItem value="plano_prata">Plano Prata</SelectItem>
                          <SelectItem value="plano_ouro">Plano Ouro</SelectItem>
                        </SelectContent>
                      </Select>
                      <Label htmlFor="plano_escolhido">Plano Escolhido</Label>
                    </div>
                    <div className="relative flex items-center">
                      <Checkbox
                        id="preencher_depois"
                        name="preencher_depois"
                        checked={formData.preencher_depois}
                        onCheckedChange={(checked) => setFormData(prevData => ({ ...prevData, preencher_depois: !!checked }))}
                      />
                      <Label htmlFor="preencher_depois" className="ml-2">Preencher informações adicionais depois</Label>
                    </div>
                    <div className="relative flex items-center">
                      <Checkbox
                        id="equipe_criar_copy"
                        name="equipe_criar_copy"
                        checked={formData.equipe_criar_copy}
                        onCheckedChange={(checked) => setFormData(prevData => ({ ...prevData, equipe_criar_copy: !!checked }))}
                      />
                      <Label htmlFor="equipe_criar_copy" className="ml-2">Solicitar para a equipe criar a copy do perfil</Label>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-8 flex justify-between">
                {currentStep > 1 && (
                  <Button onClick={prevStep} variant="outline" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                    Voltar
                  </Button>
                )}
                {currentStep < 4 ? (
                  <Button onClick={nextStep} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    Próximo
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-500 text-white hover:bg-green-700"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParaEspecialistas;
