
const ChatGPTIntegration = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Integração Lovable com ChatGPT e GitHub</h1>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">1. Integração Lovable com ChatGPT</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Pré-requisitos:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Projeto Lovable conectado ao Supabase</li>
            <li>Chave de API do OpenAI</li>
          </ul>

          <h3 className="text-xl font-medium">Passo a Passo:</h3>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <p className="font-medium">Configurar a chave da API OpenAI no Supabase:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Acesse as configurações do projeto no Supabase</li>
                <li>Adicione a chave OPENAI_API_KEY nas variáveis de ambiente</li>
              </ul>
            </li>
            <li>
              <p className="font-medium">Criar uma Edge Function no Supabase:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Use o modelo de função edge fornecido pelo Lovable</li>
                <li>Implemente a lógica de comunicação com a API do ChatGPT</li>
                <li>Configure os headers CORS apropriados</li>
              </ul>
            </li>
            <li>
              <p className="font-medium">Implementar a interface no frontend:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Crie os componentes necessários para interação com o usuário</li>
                <li>Implemente a lógica de chamada à Edge Function</li>
                <li>Adicione feedback visual e tratamento de erros</li>
              </ul>
            </li>
          </ol>
        </div>

        <h2 className="text-2xl font-semibold mt-12">2. Integração com GitHub</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Pré-requisitos:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Conta no GitHub</li>
            <li>Projeto Lovable finalizado</li>
          </ul>

          <h3 className="text-xl font-medium">Passo a Passo:</h3>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <p className="font-medium">Exportar o projeto para GitHub:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Clique no botão "Export to GitHub" no topo da interface do Lovable</li>
                <li>Autorize o Lovable a acessar sua conta do GitHub</li>
                <li>Escolha o nome do repositório e a visibilidade (público/privado)</li>
              </ul>
            </li>
            <li>
              <p className="font-medium">Configurar o repositório:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Clone o repositório localmente</li>
                <li>Configure as variáveis de ambiente necessárias</li>
                <li>Atualize o README com as instruções de instalação e execução</li>
              </ul>
            </li>
            <li>
              <p className="font-medium">Deploy do projeto:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Configure o GitHub Actions para CI/CD (opcional)</li>
                <li>Escolha uma plataforma de hospedagem (Vercel, Netlify, etc.)</li>
                <li>Configure as variáveis de ambiente no ambiente de produção</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mt-8">
          <h3 className="text-xl font-medium mb-4">Recursos Úteis:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a 
                href="https://docs.lovable.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Documentação Oficial do Lovable
              </a>
            </li>
            <li>
              <a 
                href="https://platform.openai.com/docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Documentação da API OpenAI
              </a>
            </li>
            <li>
              <a 
                href="https://docs.github.com/en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Documentação do GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ChatGPTIntegration;
