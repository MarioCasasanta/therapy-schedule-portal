
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-playfair font-semibold text-sage-800 mb-8">Política de Privacidade</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">1. Introdução</h2>
            <p>Esta Política de Privacidade descreve como o Além do Apego ("nós", "nosso" ou "aplicativo") coleta, usa e compartilha suas informações pessoais quando você utiliza nossos serviços.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">2. Informações que Coletamos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informações de conta (nome, e-mail, senha)</li>
              <li>Dados de agendamento e consultas</li>
              <li>Informações do calendário (mediante sua autorização explícita)</li>
              <li>Dados de uso do aplicativo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">3. Como Usamos suas Informações</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Para fornecer e manter nossos serviços</li>
              <li>Para agendar e gerenciar suas consultas</li>
              <li>Para sincronizar eventos com seu Google Calendar (mediante autorização)</li>
              <li>Para melhorar nossos serviços</li>
              <li>Para comunicar informações importantes sobre suas consultas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">4. Compartilhamento de Dados</h2>
            <p>Não compartilhamos suas informações pessoais com terceiros, exceto:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Com o Google Calendar (apenas mediante sua autorização explícita)</li>
              <li>Quando exigido por lei</li>
              <li>Para proteger nossos direitos legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">5. Segurança dos Dados</h2>
            <p>Implementamos medidas de segurança apropriadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">6. Seus Direitos</h2>
            <p>Você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incorretos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Retirar seu consentimento para uso do Google Calendar</li>
              <li>Receber seus dados em formato estruturado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">7. Google Calendar</h2>
            <p>Quando você autoriza a integração com o Google Calendar:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Solicitamos acesso apenas aos dados necessários para gerenciar seus agendamentos</li>
              <li>Não compartilhamos seus dados do calendário com terceiros</li>
              <li>Você pode revogar o acesso a qualquer momento</li>
              <li>Utilizamos a API do Google Calendar de acordo com as políticas do Google</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">8. Contato</h2>
            <p>Para questões sobre esta política ou seus dados pessoais, entre em contato através do e-mail: privacy@alemdoapego.com.br</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">9. Atualizações</h2>
            <p>Esta política pode ser atualizada ocasionalmente. A versão mais recente estará sempre disponível nesta página.</p>
            <p className="mt-2">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link to="/" className="text-sage-600 hover:text-sage-700 font-medium">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
