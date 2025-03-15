
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é terapia focada no apego?",
    answer: "A terapia focada no apego é uma abordagem que trabalha os padrões de relacionamento formados na infância e como eles afetam nossas relações adultas. Ela ajuda a identificar e transformar padrões de apego inseguros em conexões mais saudáveis e satisfatórias."
  },
  {
    question: "Como funciona o agendamento de sessões?",
    answer: "O agendamento é simples e intuitivo. Você escolhe o especialista que melhor atende suas necessidades, seleciona um horário disponível na agenda online e confirma sua reserva. Você receberá uma confirmação por e-mail com todas as informações necessárias para sua sessão."
  },
  {
    question: "Quanto custa uma sessão de terapia?",
    answer: "Os valores variam de acordo com cada profissional e sua especialidade. Os preços são transparentes e estão disponíveis no perfil de cada terapeuta. Alguns profissionais também oferecem pacotes com descontos para sessões contínuas."
  },
  {
    question: "As sessões são online ou presenciais?",
    answer: "Nossa plataforma oferece principalmente sessões online via videoconferência, permitindo atendimento de qualquer lugar. Alguns terapeutas também podem oferecer opções presenciais, o que estará indicado em seus perfis."
  },
  {
    question: "Como sei qual abordagem terapêutica é melhor para mim?",
    answer: "Cada pessoa responde de forma única às diferentes abordagens terapêuticas. Em nosso blog, disponibilizamos conteúdos informativos sobre as diversas abordagens. Além disso, muitos de nossos terapeutas oferecem uma primeira sessão introdutória para ajudar você a determinar se a abordagem é adequada às suas necessidades."
  },
  {
    question: "Qual a duração média de um processo terapêutico?",
    answer: "O tempo de terapia varia significativamente dependendo de seus objetivos, da complexidade das questões trabalhadas e da abordagem utilizada. Algumas pessoas obtêm benefícios em poucas sessões, enquanto outras preferem um acompanhamento de longo prazo para questões mais profundas. O importante é que o processo respeite seu ritmo individual."
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-semibold text-accent mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
