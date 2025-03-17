
import { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const HR = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("RH@alemdoapego.com.br");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-sage-800 font-playfair mb-4">
              Trabalhe Conosco
            </h1>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">
              Faça parte da nossa equipe e ajude a transformar vidas
            </p>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-sage-700 mb-4">
                Oportunidades na Além do Apego
              </h2>
              
              <p className="mb-6 text-gray-600">
                Estamos sempre em busca de profissionais talentosos e dedicados para se juntar à nossa equipe. 
                Se você é apaixonado por ajudar pessoas e deseja fazer parte de uma organização que valoriza o bem-estar 
                emocional e psicológico, nós queremos conhecer você!
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-sage-600 mb-3">Áreas de Atuação:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Psicólogos(as) com especialização em relacionamentos</li>
                  <li>Terapeutas especializados em traumas emocionais</li>
                  <li>Profissionais de desenvolvimento pessoal</li>
                  <li>Especialistas em comunicação e marketing</li>
                  <li>Desenvolvedores e designers para nossa plataforma digital</li>
                  <li>Profissionais administrativos e de suporte</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-sage-600 mb-3">Como se Candidatar:</h3>
                <p className="text-gray-600 mb-4">
                  Envie seu currículo e uma carta de apresentação explicando por que você gostaria de trabalhar 
                  conosco e como suas habilidades podem contribuir para nossa missão. 
                </p>
                
                <div className="bg-sage-50 border border-sage-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <Mail className="h-5 w-5 text-sage-600 mr-2" />
                    <span className="text-sage-700 font-medium">RH@alemdoapego.com.br</span>
                  </div>
                  <Button
                    onClick={copyEmail}
                    variant="outline"
                    className="text-sage-600 border-sage-300"
                  >
                    {copied ? "Copiado!" : "Copiar e-mail"}
                  </Button>
                </div>
              </div>
              
              <div className="mt-12 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-medium text-sage-600 mb-3">Já é funcionário?</h3>
                <p className="text-gray-600 mb-4">
                  Se você já faz parte da nossa equipe, acesse a área administrativa através do link abaixo:
                </p>
                <Link to="/admin-login">
                  <Button variant="default" className="w-full sm:w-auto">
                    Acesso de Funcionários
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-sage-50 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-sage-700 mb-3">
              Nossos Valores
            </h2>
            <p className="text-gray-600">
              Na Além do Apego, acreditamos em criar um ambiente de trabalho acolhedor, 
              colaborativo e focado no crescimento pessoal e profissional. 
              Valorizamos a diversidade, o equilíbrio entre vida pessoal e profissional, 
              e o constante aprendizado.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HR;
