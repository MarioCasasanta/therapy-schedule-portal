
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PencilRuler, Save, Eye, Globe } from "lucide-react";

export default function SiteEditor() {
  const location = useLocation();
  const [heroContent, setHeroContent] = useState({
    title: "Transforme sua vida com apoio profissional",
    subtitle: "Conectamos você aos melhores especialistas em saúde mental",
    buttonText: "Começar Agora",
    backgroundImage: "/placeholder.svg"
  });

  const [siteSettings, setSiteSettings] = useState({
    siteName: "Além do Apego",
    primaryColor: "#10b981",
    secondaryColor: "#6366f1",
    showTestimonials: true,
    showBlog: true,
    showPricing: true
  });

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath={location.pathname} />
        <SidebarInset className="overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Editor de Site</h1>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </div>

            <Tabs defaultValue="hero">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hero">Hero Section</TabsTrigger>
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="services">Serviços</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hero" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Seção Principal (Hero)</CardTitle>
                    <CardDescription>
                      Configure o conteúdo da primeira seção que os visitantes veem
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hero-title">Título Principal</Label>
                      <Input
                        id="hero-title"
                        value={heroContent.title}
                        onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="hero-subtitle">Subtítulo</Label>
                      <Textarea
                        id="hero-subtitle"
                        value={heroContent.subtitle}
                        onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="hero-button">Texto do Botão</Label>
                      <Input
                        id="hero-button"
                        value={heroContent.buttonText}
                        onChange={(e) => setHeroContent({...heroContent, buttonText: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="hero-bg">Imagem de Fundo (URL)</Label>
                      <Input
                        id="hero-bg"
                        value={heroContent.backgroundImage}
                        onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Seção Sobre</CardTitle>
                    <CardDescription>
                      Configure o conteúdo da seção "Sobre nós"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <PencilRuler className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">Editor da seção "Sobre" em desenvolvimento</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Seção Serviços</CardTitle>
                    <CardDescription>
                      Configure os serviços oferecidos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <PencilRuler className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">Editor de serviços em desenvolvimento</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Gerais</CardTitle>
                    <CardDescription>
                      Configure as preferências gerais do site
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="site-name">Nome do Site</Label>
                      <Input
                        id="site-name"
                        value={siteSettings.siteName}
                        onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="primary-color">Cor Primária</Label>
                        <Input
                          id="primary-color"
                          type="color"
                          value={siteSettings.primaryColor}
                          onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="secondary-color">Cor Secundária</Label>
                        <Input
                          id="secondary-color"
                          type="color"
                          value={siteSettings.secondaryColor}
                          onChange={(e) => setSiteSettings({...siteSettings, secondaryColor: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-testimonials">Mostrar Depoimentos</Label>
                        <Switch
                          id="show-testimonials"
                          checked={siteSettings.showTestimonials}
                          onCheckedChange={(checked) => setSiteSettings({...siteSettings, showTestimonials: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-blog">Mostrar Blog</Label>
                        <Switch
                          id="show-blog"
                          checked={siteSettings.showBlog}
                          onCheckedChange={(checked) => setSiteSettings({...siteSettings, showBlog: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-pricing">Mostrar Preços</Label>
                        <Switch
                          id="show-pricing"
                          checked={siteSettings.showPricing}
                          onCheckedChange={(checked) => setSiteSettings({...siteSettings, showPricing: checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
