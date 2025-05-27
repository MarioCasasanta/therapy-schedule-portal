
import { Download, FileText, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DownloadSection = () => {
  const handleDownload = (filename: string, content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadPRD = async () => {
    try {
      const response = await fetch('/docs/PRD-Alem-do-Apego.md');
      const content = await response.text();
      handleDownload('PRD-Alem-do-Apego.md', content);
    } catch (error) {
      console.error('Erro ao baixar PRD:', error);
    }
  };

  const downloadTechnicalDoc = async () => {
    try {
      const response = await fetch('/docs/technical-documentation.md');
      const content = await response.text();
      handleDownload('technical-documentation.md', content);
    } catch (error) {
      console.error('Erro ao baixar documentação técnica:', error);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
            Documentação do Projeto
          </h2>
          <p className="text-lg text-gray-600">
            Baixe a documentação completa do projeto Além do Apego
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-sage-600" />
                PRD - Product Requirements Document
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Documento completo de requisitos do produto, incluindo arquitetura técnica, 
                mapeamento de componentes e especificações do sistema.
              </p>
              <Button onClick={downloadPRD} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Baixar PRD
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-sage-600" />
                Documentação Técnica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Documentação técnica completa com estrutura do banco de dados, 
                APIs, deploy, segurança e troubleshooting.
              </p>
              <Button onClick={downloadTechnicalDoc} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Baixar Documentação Técnica
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
