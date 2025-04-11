
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const specialistFormSchema = z.object({
  fullName: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  specialization: z.string().min(3, "A especialização deve ter pelo menos 3 caracteres"),
  shortDescription: z.string().min(10, "A descrição curta deve ter pelo menos 10 caracteres"),
  longDescription: z.string().min(50, "A biografia profissional deve ter pelo menos 50 caracteres"),
  education: z.string().min(10, "A formação deve ter pelo menos 10 caracteres"),
  areasOfExpertise: z.string().array().min(1, "Adicione pelo menos uma área de atuação"),
  certifications: z.string().array().optional(),
});

type SpecialistFormValues = z.infer<typeof specialistFormSchema>;

const SpecialistForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [expertise, setExpertise] = useState("");
  const [certification, setCertification] = useState("");
  
  const form = useForm<SpecialistFormValues>({
    resolver: zodResolver(specialistFormSchema),
    defaultValues: {
      fullName: "",
      specialization: "",
      shortDescription: "",
      longDescription: "",
      education: "",
      areasOfExpertise: [],
      certifications: [],
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    
    const file = e.target.files[0];
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Erro no upload",
        description: "O arquivo é muito grande. O tamanho máximo é 5MB",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Erro no upload",
        description: "Tipo de arquivo inválido. Aceitos: JPG, PNG e WebP",
        variant: "destructive",
      });
      return;
    }
    
    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const addExpertise = () => {
    if (expertise.trim() !== "") {
      const current = form.getValues().areasOfExpertise;
      if (!current.includes(expertise.trim())) {
        form.setValue("areasOfExpertise", [...current, expertise.trim()]);
        setExpertise("");
      }
    }
  };
  
  const removeExpertise = (item: string) => {
    const current = form.getValues().areasOfExpertise;
    form.setValue(
      "areasOfExpertise", 
      current.filter(i => i !== item)
    );
  };
  
  const addCertification = () => {
    if (certification.trim() !== "") {
      const current = form.getValues().certifications || [];
      if (!current.includes(certification.trim())) {
        form.setValue("certifications", [...current, certification.trim()]);
        setCertification("");
      }
    }
  };
  
  const removeCertification = (item: string) => {
    const current = form.getValues().certifications || [];
    form.setValue(
      "certifications", 
      current.filter(i => i !== item)
    );
  };

  const onSubmit = async (values: SpecialistFormValues) => {
    try {
      setIsUploading(true);
      
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para completar o cadastro",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }
      
      let imageUrl = null;
      
      // Upload profile image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('specialist_images')
          .upload(fileName, imageFile);
          
        if (uploadError) {
          throw uploadError;
        }
        
        imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/specialist_images/${fileName}`;
      }
      
      // Save specialist details in the database
      const { error: insertError } = await supabase
        .from('specialist_details')
        .upsert({
          specialist_id: session.user.id,
          full_name: values.fullName,
          education: values.education,
          short_description: values.shortDescription,
          long_description: values.longDescription,
          areas_of_expertise: values.areasOfExpertise,
          certifications: values.certifications,
          thumbnail_url: imageUrl,
          updated_at: new Date().toISOString(),
        });
        
      if (insertError) {
        throw insertError;
      }
      
      toast({
        title: "Perfil salvo com sucesso!",
        description: "Suas informações profissionais foram atualizadas.",
      });
      
      navigate("/auth");
    } catch (error: any) {
      console.error("Erro ao salvar perfil:", error);
      toast({
        title: "Erro ao salvar perfil",
        description: error.message || "Ocorreu um erro ao salvar suas informações. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Complete seu perfil profissional</h2>
      <p className="text-gray-600 mb-8 text-center">
        Forneça informações sobre sua formação e especialização para que possamos criar seu perfil
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-8">
            <div 
              className="w-32 h-32 rounded-full bg-gray-100 mb-4 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300"
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="h-10 w-10 text-gray-400" />
              )}
            </div>
            <label className="cursor-pointer bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-md transition-colors">
              Escolher foto de perfil
              <input 
                type="file" 
                onChange={handleImageChange}
                className="hidden" 
                accept="image/png, image/jpeg, image/jpg, image/webp"
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Formato: JPG, PNG ou WebP. Tamanho máximo: 5MB
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. João Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Specialization */}
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialização Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Psicólogo, Terapeuta, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Short Description */}
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição Curta (para listagens)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Uma breve descrição que aparecerá nas listagens de especialistas" 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500 mt-1">Limite de 150 caracteres para melhor apresentação</p>
              </FormItem>
            )}
          />
          
          {/* Education */}
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Formação Acadêmica</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva sua formação acadêmica" 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Long Description */}
          <FormField
            control={form.control}
            name="longDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biografia Profissional Detalhada</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Conte sobre sua experiência, abordagem e outros detalhes profissionais importantes" 
                    className="min-h-[150px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Areas of Expertise */}
          <FormField
            control={form.control}
            name="areasOfExpertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Áreas de Atuação</FormLabel>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Adicione uma área de atuação"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={addExpertise}
                    variant="outline"
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {field.value.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-sage-100 text-sage-800 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeExpertise(item)}
                        className="text-sage-600 hover:text-sage-900"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Certifications */}
          <FormField
            control={form.control}
            name="certifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificações (opcional)</FormLabel>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Adicione uma certificação"
                    value={certification}
                    onChange={(e) => setCertification(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={addCertification}
                    variant="outline"
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {field.value?.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeCertification(item)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="w-full md:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isUploading}
              className="w-full md:w-auto bg-sage-600 hover:bg-sage-700"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Salvando...
                </>
              ) : (
                "Salvar Perfil"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SpecialistForm;
