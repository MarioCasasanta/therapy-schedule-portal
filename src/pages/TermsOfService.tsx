
import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-playfair font-semibold text-sage-800 mb-8">Termos de Serviço</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">1. Aceitação dos Termos</h2>
            <p>Ao acessar e usar o Além do Apego, você concorda em cumprir e estar vinculado a estes Termos de Serviço.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">2. Descrição do Serviço</h2>
            <p>O Além do Apego oferece serviços de organização e consultoria, incluindo:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Consultoria em organização residencial</li>
              <li>Assessoria em mudanças</li>
              <li>Organização de ambientes</li>
              <li>Otimização de espaços</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">3. Agendamento e Cancelamento</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Os agendamentos devem ser feitos com antecedência mínima de 24 horas</li>
              <li>Cancelamentos devem ser comunicados com 24 horas de antecedência</li>
              <li>Reagendamentos estão sujeitos à disponibilidade</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">4. Pagamento</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Os preços são estabelecidos por projeto ou hora de serviço</li>
              <li>O pagamento deve ser realizado conforme acordado no contrato de serviço</li>
              <li>Aceitamos diversas formas de pagamento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">5. Responsabilidades do Cliente</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer informações precisas sobre o projeto</li>
              <li>Estar presente ou designar um responsável durante o serviço</li>
              <li>Comunicar claramente suas expectativas e necessidades</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">6. Confidencialidade</h2>
            <p>Nos comprometemos a manter a confidencialidade de todas as informações e materiais do cliente.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">7. Alterações nos Termos</h2>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento, com notificação prévia aos usuários.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-sage-700 mb-3">8. Contato</h2>
            <p>Para dúvidas sobre estes termos, entre em contato através do e-mail: contato@alemdoapego.com.br</p>
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

export default TermsOfService;
