
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const CreateAnxietyTDAHPost = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const createPost = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          navigate("/auth");
          return;
        }

        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profile || profile.role !== 'admin') {
          navigate("/client-dashboard");
          return;
        }

        // Create the blog post about anxiety tools and ADHD
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: "5 Ferramentas Eficazes para Lidar com a Ansiedade e Entendendo o TDAH",
            slug: "5-ferramentas-para-ansiedade-e-tdah",
            excerpt: "Descubra cinco estratégias comprovadas para gerenciar a ansiedade no dia a dia e compreenda melhor o que é o Transtorno do Déficit de Atenção e Hiperatividade (TDAH).",
            content: `# 5 Ferramentas Eficazes para Lidar com a Ansiedade e Entendendo o TDAH

## Parte 1: Ferramentas para Gerenciar a Ansiedade

A ansiedade é uma resposta natural do nosso corpo, mas quando se torna excessiva, pode afetar significativamente nossa qualidade de vida. Aqui estão cinco ferramentas eficazes para ajudar a gerenciar os sintomas de ansiedade:

### 1. Respiração Diafragmática

A respiração profunda e controlada é uma das técnicas mais simples e eficazes para acalmar o sistema nervoso. Para praticar:

- Sente-se confortavelmente ou deite-se
- Coloque uma mão no peito e outra no abdômen
- Inspire lentamente pelo nariz, sentindo o abdômen expandir (não o peito)
- Segure brevemente
- Expire lentamente pela boca
- Repita por 5-10 minutos, diariamente

Esta técnica ativa o sistema nervoso parassimpático, responsável por acalmar o corpo e a mente.

### 2. Mindfulness e Meditação

A prática regular de mindfulness (atenção plena) ajuda a trazer a mente para o momento presente, reduzindo preocupações com o futuro e ruminações sobre o passado:

- Reserve 10 minutos diários para a prática
- Foque em sua respiração ou em sensações corporais
- Quando a mente divagar, gentilmente traga a atenção de volta
- Use aplicativos como Headspace, Calm ou Lojong para guiar suas meditações iniciais

Estudos mostram que a meditação regular pode reduzir significativamente os sintomas de ansiedade.

### 3. Atividade Física Regular

O exercício físico é um poderoso ansiolítico natural:

- Pratique pelo menos 30 minutos de atividade moderada diariamente
- Escolha atividades que você goste (caminhada, natação, dança, ciclismo)
- Exercícios aeróbicos são particularmente eficazes para reduzir a ansiedade
- A yoga combina benefícios físicos com técnicas de respiração e mindfulness

O exercício libera endorfinas e reduz os níveis de hormônios do estresse como o cortisol.

### 4. Estabeleça uma Rotina de Sono Saudável

A privação de sono e a ansiedade formam um ciclo vicioso:

- Mantenha horários regulares para dormir e acordar
- Crie um ambiente propício ao sono (escuro, silencioso, temperatura agradável)
- Evite telas (celular, computador, TV) pelo menos 1 hora antes de dormir
- Desenvolva uma rotina relaxante antes de dormir (banho morno, leitura, chá sem cafeína)

Um sono de qualidade fortalece nossa resiliência emocional e capacidade de lidar com o estresse.

### 5. Terapia Cognitivo-Comportamental (TCC)

A TCC é uma das abordagens terapêuticas mais eficazes para a ansiedade:

- Ajuda a identificar e desafiar pensamentos negativos e catastróficos
- Ensina a substituir padrões de pensamento disfuncionais por mais realistas
- Proporciona estratégias práticas para enfrentar situações ansiogênicas
- Pode ser realizada com um profissional ou através de livros e aplicativos de auto-ajuda baseados em TCC

## Parte 2: Entendendo o TDAH

O Transtorno do Déficit de Atenção e Hiperatividade (TDAH) é um transtorno neurobiológico que afeta a capacidade de atenção, controle de impulsos e, em alguns casos, gera hiperatividade.

### O que é o TDAH?

O TDAH é caracterizado por um padrão persistente de desatenção e/ou hiperatividade-impulsividade que interfere no funcionamento e desenvolvimento do indivíduo. É um transtorno do neurodesenvolvimento, o que significa que está relacionado à maneira como o cérebro se desenvolve e funciona.

### Principais Características

O TDAH se manifesta em três apresentações principais:

1. **Predominantemente Desatenta:**
   - Dificuldade em manter a atenção em tarefas
   - Parecer não escutar quando lhe dirigem a palavra
   - Dificuldade em seguir instruções e concluir tarefas
   - Perder objetos necessários para atividades
   - Distrair-se facilmente com estímulos externos

2. **Predominantemente Hiperativa-Impulsiva:**
   - Inquietação, dificuldade em permanecer sentado
   - Correr ou escalar em situações inadequadas (em adultos, sentir-se inquieto)
   - Dificuldade em engajar-se em atividades tranquilamente
   - Falar excessivamente
   - Interromper ou intrometer-se em conversas
   - Dificuldade em esperar sua vez

3. **Apresentação Combinada:**
   - Características tanto de desatenção quanto de hiperatividade-impulsividade

### Causas do TDAH

O TDAH tem origem multifatorial:

- **Fatores Genéticos:** Estudos com gêmeos e familiares mostram forte componente hereditário.
- **Fatores Neurobiológicos:** Diferenças na estrutura e funcionamento de certas áreas cerebrais, especialmente no córtex pré-frontal.
- **Fatores Ambientais:** Exposição pré-natal a substâncias tóxicas, complicações durante a gravidez ou parto.

### Diagnóstico

O diagnóstico deve ser realizado por profissionais qualificados (psiquiatras, neurologistas ou psicólogos especializados) e envolve:

- Avaliação clínica detalhada
- Entrevistas com pais, professores ou parceiros
- Aplicação de escalas e questionários específicos
- Exclusão de outras condições que podem apresentar sintomas semelhantes

É importante ressaltar que o TDAH não está relacionado à inteligência. Muitas pessoas com TDAH têm inteligência acima da média, mas enfrentam desafios devido aos sintomas do transtorno.

### Tratamento

O tratamento mais eficaz para o TDAH é multimodal, incluindo:

- **Tratamento Medicamentoso:** Psicoestimulantes e não-estimulantes que ajudam a regular a neurotransmissão.
- **Psicoterapia:** Especialmente a Terapia Cognitivo-Comportamental, que ajuda a desenvolver estratégias para lidar com os sintomas.
- **Coaching:** Para desenvolver habilidades de organização, planejamento e gerenciamento do tempo.
- **Modificações Ambientais:** Adaptar o ambiente de estudo ou trabalho para minimizar distrações.
- **Psicoeducação:** Compreender o transtorno é fundamental para o manejo adequado.

### TDAH e Comorbidades

O TDAH frequentemente coexiste com outras condições:
- Transtornos de ansiedade
- Transtorno de humor
- Transtornos de aprendizagem
- Transtorno Opositivo Desafiador
- Transtorno de Conduta

### Conclusão

Tanto a ansiedade quanto o TDAH são condições tratáveis. Com as ferramentas adequadas e suporte profissional, é possível gerenciar os sintomas e viver uma vida plena e produtiva. Se você identifica em si mesmo ou em alguém próximo os sinais descritos neste artigo, busque a orientação de um profissional de saúde mental qualificado para uma avaliação adequada.`,
            published: true,
            author_id: session.user.id
          });

        if (error) throw error;

        navigate("/admin/blog-posts");
      } catch (error) {
        console.error("Erro ao criar post:", error);
        navigate("/admin/blog-posts");
      }
    };

    createPost();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Criando Artigo...</h1>
        <p>Por favor, aguarde enquanto o artigo sobre ansiedade e TDAH é criado.</p>
      </div>
    </div>
  );
};

export default CreateAnxietyTDAHPost;
