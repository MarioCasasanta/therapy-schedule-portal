# Além do Apego - Documentação Técnica
Plataforma de Agendamento Terapêutico

## Sumário
1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Arquitetura do Sistema](#2-arquitetura-do-sistema)
3. [Estrutura do Banco de Dados](#3-estrutura-do-banco-de-dados)
4. [Mapa de Navegação](#4-mapa-de-navegação)
5. [API e Endpoints](#5-api-e-endpoints)
6. [Testes](#6-testes)
7. [Deploy e Configuração](#7-deploy-e-configuração)
8. [Segurança](#8-segurança)
9. [Logs e Monitoramento](#9-logs-e-monitoramento)
10. [Roadmap](#10-roadmap)

## 1. Visão Geral do Projeto

### 1.1 Identificação
- **Nome:** Além do Apego
- **Tipo:** Plataforma de Agendamento Terapêutico
- **Versão:** 1.0.0

### 1.2 Objetivo
Fornecer uma plataforma completa para terapeutas gerenciarem seus atendimentos, incluindo agendamento de sessões, gestão de pagamentos e interação com clientes.

### 1.3 Público-Alvo
- Terapeutas autônomos
- Pequenas clínicas terapêuticas
- Pacientes/Clientes que buscam atendimento

### 1.4 Funcionalidades Principais
- Agendamento de sessões
  - Calendário interativo
  - Seleção de horários disponíveis
  - Confirmação automática
  - Lembretes por email
  - Sincronização com Google Calendar
  
- Gestão de clientes
  - Perfis detalhados
  - Histórico de sessões
  - Notas de progresso
  - Documentos anexados
  - Histórico de pagamentos

- Processamento de pagamentos via Stripe
  - Múltiplos métodos de pagamento
  - Faturas automáticas
  - Relatórios financeiros
  - Gestão de reembolsos
  - Recibos digitais

- Diário emocional para clientes
  - Registro diário de humor
  - Upload de áudios/textos
  - Visualização de progresso
  - Compartilhamento com terapeuta
  - Exportação de dados

- Dashboard administrativo
  - Métricas em tempo real
  - Gestão financeira
  - Relatórios personalizados
  - Controle de agenda
  - Análise de performance

### 1.5 Diferenciais Competitivos
1. **Experiência Personalizada**
   - Interface intuitiva adaptada para terapeutas
   - Fluxos otimizados para agendamento
   - Design centrado no usuário

2. **Integração Completa**
   - Sistema unificado de pagamentos
   - Sincronização com calendário
   - Notificações multicanal

3. **Segurança e Privacidade**
   - Criptografia de dados sensíveis
   - Conformidade com LGPD
   - Backups automáticos

4. **Ferramentas Especializadas**
   - Diário emocional integrado
   - Prontuário digital
   - Análise de progresso

5. **Escalabilidade**
   - Arquitetura serverless
   - Performance otimizada
   - Multitenancy preparado

## 2. Arquitetura do Sistema

### 2.1 Visão Geral da Arquitetura
```mermaid
graph TD
    A[Cliente Web] --> B[Frontend - React/Vite]
    B --> C[Supabase Backend]
    C --> D[PostgreSQL Database]
    C --> E[Edge Functions]
    B --> F[Stripe API]
    E --> G[Email Service]
    E --> H[External APIs]
```

### 2.2 Componentes Principais

#### Frontend (Client-Side)
- **Framework:** React 18
- **Build Tool:** Vite
- **UI Framework:** TailwindCSS + Shadcn/UI
- **State Management:** React Query + Context API
- **Roteamento:** React Router v6

#### Backend (Supabase)
- **Database:** PostgreSQL
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Serverless Functions:** Edge Functions
- **Real-time:** Supabase Realtime

#### Serviços Externos
- **Pagamentos:** Stripe
- **Deploy Frontend:** Vercel
- **Deploy Backend:** Supabase Cloud
- **Email:** Resend

### 2.3 Tecnologias Utilizadas

#### Frontend
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "@tanstack/react-query": "^5.56.2",
    "tailwindcss": "latest",
    "@stripe/stripe-js": "^2.4.0",
    "@supabase/supabase-js": "^2.48.1"
  }
}
```

#### Backend (Supabase)
- PostgreSQL 15+
- Node.js 18+ (Edge Functions)
- TypeScript 5+

## 3. Estrutura do Banco de Dados

### 3.1 Schema Completo

#### Tabelas Principais

##### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  tipo_usuario VARCHAR DEFAULT 'cliente',
  telefone VARCHAR,
  role TEXT,
  name TEXT,
  full_name TEXT,
  preferences JSONB DEFAULT '{}',
  data_nascimento DATE
);
```

##### sessoes
```sql
CREATE TABLE sessoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES profiles(id),
  data_hora TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  invitation_sent_at TIMESTAMPTZ,
  valor NUMERIC DEFAULT 0.0,
  data_pagamento TIMESTAMPTZ,
  reminder_sent_at TIMESTAMPTZ,
  tipo_sessao VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'agendado',
  notas TEXT,
  google_event_id TEXT,
  guest_email TEXT,
  invitation_status TEXT DEFAULT 'pending',
  status_pagamento TEXT DEFAULT 'pendente',
  post_session_notes TEXT,
  feedback TEXT
);
```

##### availability
```sql
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  day_of_week INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  interval_minutes INTEGER DEFAULT 60 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  exceptions JSONB DEFAULT '[]',
  user_id UUID,
  is_available BOOLEAN DEFAULT true,
  max_concurrent_sessions INTEGER DEFAULT 1 NOT NULL
);
```

##### pagamentos
```sql
CREATE TABLE pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  data_pagamento TIMESTAMPTZ,
  cliente_id UUID REFERENCES profiles(id),
  valor NUMERIC NOT NULL,
  status VARCHAR DEFAULT 'pendente',
  metodo_pagamento VARCHAR,
  sessao_id UUID REFERENCES sessoes(id)
);
```

##### notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT DEFAULT 'session_reminder' NOT NULL,
  title TEXT NOT NULL,
  user_id UUID NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  related_session_id UUID REFERENCES sessoes(id),
  scheduled_for TIMESTAMPTZ,
  message TEXT NOT NULL
);
```

#### Tabelas de Suporte

##### access_logs
```sql
CREATE TABLE access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accessed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  page_accessed TEXT NOT NULL,
  user_id UUID,
  component_accessed TEXT
);
```

##### system_config
```sql
CREATE TABLE system_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  value JSONB DEFAULT '{}' NOT NULL
);
```

### 3.2 Políticas de Segurança (RLS)

#### profiles
```sql
-- Permite que usuários autenticados vejam seus próprios perfis
CREATE POLICY "Usuários podem ver seus próprios perfis"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Permite que usuários autenticados atualizem seus próprios perfis
CREATE POLICY "Usuários podem atualizar seus próprios perfis"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

#### sessoes
```sql
-- Permite que terapeutas vejam todas as sessões
CREATE POLICY "Terapeutas podem ver todas as sessões"
ON sessoes FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Permite que clientes vejam apenas suas próprias sessões
CREATE POLICY "Clientes podem ver suas próprias sessões"
ON sessoes FOR SELECT
TO authenticated
USING (cliente_id = auth.uid());
```

### 3.3 Funções e Triggers

#### handle_new_user()
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'cliente')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

-- Trigger para criar perfil ao criar usuário
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### update_updated_at_column()
```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$;

-- Aplicado em várias tabelas para atualizar o updated_at
CREATE TRIGGER update_sessoes_updated_at
    BEFORE UPDATE ON sessoes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 3.4 Views

#### session_statistics
```sql
CREATE VIEW session_statistics AS
SELECT
  cliente_id,
  COUNT(*) FILTER (WHERE data_hora > CURRENT_TIMESTAMP) as upcoming_sessions,
  COUNT(*) FILTER (WHERE status_pagamento = 'pago') as paid_sessions,
  COUNT(*) as total_sessions,
  SUM(valor) FILTER (WHERE status_pagamento = 'pendente') as total_pending,
  SUM(valor) FILTER (WHERE status_pagamento = 'pago') as total_paid,
  COUNT(*) FILTER (WHERE status_pagamento = 'pendente') as pending_sessions,
  COUNT(*) FILTER (WHERE data_hora < CURRENT_TIMESTAMP) as past_sessions
FROM sessoes
GROUP BY cliente_id;
```

### 3.5 Índices

```sql
CREATE INDEX idx_sessoes_cliente_id ON sessoes(cliente_id);
CREATE INDEX idx_sessoes_data_hora ON sessoes(data_hora);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_availability_user_id ON availability(user_id);
```

## 4. Mapa de Navegação

### 4.1 Estrutura de Rotas

```typescript
const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/auth", element: <Auth /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { path: "sessions", element: <Sessions /> },
          { path: "clients", element: <Clients /> },
          { path: "payments", element: <Payments /> },
          { path: "reports", element: <Reports /> }
        ]
      },
      {
        path: "/client-dashboard",
        element: <ClientDashboard />,
        children: [
          { path: "schedule", element: <ClientSchedule /> },
          { path: "sessions", element: <ClientSessions /> },
          { path: "diary", element: <EmotionalDiary /> },
          { path: "payments", element: <ClientPayments /> }
        ]
      }
    ]
  }
];
```

### 4.2 Fluxos Principais

#### Fluxo de Agendamento
1. Cliente acessa /client-dashboard/schedule
2. Seleciona data/hora disponível
3. Confirma agendamento
4. Recebe notificação por email
5. Realiza pagamento (opcional)

#### Fluxo de Pagamento
1. Cliente seleciona sessão para pagar
2. Escolhe método de pagamento
3. Processa pagamento via Stripe
4. Recebe confirmação
5. Status da sessão é atualizado

## 5. API e Endpoints

### 5.1 Autenticação

```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: string,
  password: string
});

// Registro
const { data, error } = await supabase.auth.signUp({
  email: string,
  password: string,
  options: {
    data: {
      full_name: string,
      role: 'cliente' | 'terapeuta'
    }
  }
});
```

### 5.2 Sessões API

#### Criar Sessão
```typescript
const { data, error } = await supabase
  .from('sessoes')
  .insert({
    cliente_id: string,
    data_hora: string,
    tipo_sessao: string,
    valor: number
  })
  .select()
  .single();
```

#### Listar Sessões
```typescript
const { data, error } = await supabase
  .from('sessoes')
  .select(`
    *,
    profiles:cliente_id (*)
  `)
  .order('data_hora', { ascending: true });
```

### 5.3 Edge Functions

#### Processar Pagamento
```typescript
// /functions/process-payment/index.ts
serve(async (req) => {
  const { session_id, payment_method } = await req.json();
  // Processo de pagamento via Stripe
  // Atualização do status no banco
  return new Response(JSON.stringify({ success: true }));
});
```

## 6. Testes

### 6.1 Testes Unitários

```typescript
// SessionForm.test.tsx
describe('SessionForm', () => {
  it('should validate required fields', () => {
    render(<SessionForm />);
    fireEvent.click(screen.getByText('Criar Sessão'));
    expect(screen.getByText('Data é obrigatória')).toBeInTheDocument();
  });
});
```

### 6.2 Testes de Integração

```typescript
describe('Agendamento Flow', () => {
  it('should create session and send notification', async () => {
    // Setup
    const user = await createTestUser();
    const session = await createTestSession(user.id);
    
    // Verify
    expect(session.status).toBe('agendado');
    expect(await getNotifications(user.id)).toHaveLength(1);
  });
});
```

### 6.3 Testes E2E
Utilizar Cypress para testes end-to-end, cobrindo os principais fluxos:
- Login/Registro
- Agendamento
- Pagamento
- Cancelamento

## 7. Deploy e Configuração

### 7.1 Variáveis de Ambiente

```bash
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Stripe
VITE_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# Email
RESEND_API_KEY=
```

### 7.2 Deploy Frontend (Vercel)

```bash
# Build
npm run build

# Deploy
vercel deploy
```

### 7.3 Deploy Edge Functions

```bash
# Deploy todas as functions
supabase functions deploy

# Deploy função específica
supabase functions deploy process-payment
```

## 8. Segurança

### 8.1 Autenticação
- JWT tokens via Supabase Auth
- Refresh tokens automáticos
- Sessions persistentes
- Gerenciamento de logout com limpeza de estados
- Redirecionamento pós-logout

### 8.2 Row Level Security
Todas as tabelas têm RLS habilitado com políticas específicas:
```sql
-- Usuários podem ler seu próprio perfil
CREATE POLICY "Users can read own profile"
ON profiles
FOR SELECT
USING (auth.uid() = id);

-- Usuários podem atualizar seu próprio perfil
CREATE POLICY "Users can update own profile"
ON profiles
FOR UPDATE
USING (auth.uid() = id);
```

### 8.3 Gerenciamento de Sessão
```typescript
// Exemplo de gerenciamento de sessão no Navigation.tsx
const checkSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    setUser(session.user);
    
    // Aguarda sincronização com Supabase
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (!error && data) {
      setProfile(data);
    }
  } else {
    setUser(null);
    setProfile(null);
  }
};
```

### 8.4 Controle de Acesso
- Verificação de roles para acesso ao Dashboard
- Separação de interfaces admin/cliente
- Proteção de rotas baseada em perfil
- Menu adaptativo baseado em permissões

```typescript
// Exemplo de verificação de role para exibição do Dashboard
const isAdmin = profile?.role === 'admin';

{user && isAdmin && (
  <Link to="/dashboard">Dashboard</Link>
)}
```

## 9. Logs e Monitoramento

### 9.1 Estrutura de Logs
```typescript
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  action: string;
  user_id?: string;
  metadata?: Record<string, any>;
}
```

### 9.2 Monitoramento
- Supabase Dashboard para métricas de banco
- Vercel Analytics para frontend
- Stripe Dashboard para pagamentos

## 10. Roadmap

### 10.1 Próximas Funcionalidades
1. Videoconferência integrada
2. App mobile
3. Integração com prontuário eletrônico
4. Sistema de avaliações e feedback

### 10.2 Melhorias Técnicas
1. Implementar Cache com Redis
2. Migrar para microsserviços
3. Adicionar testes automatizados
4. Implementar CI/CD completo

### 10.3 Escalabilidade
- Planejamento para múltiplos terapeutas
- Sistema de clínicas
- Marketplace de serviços

## Apêndice A: Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build
npm run build

# Testes
npm run test

# Deploy
npm run deploy
```

## Apêndice B: Troubleshooting

### Problemas Comuns

1. Erro de autenticação
```typescript
// Verificar sessão
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  // Redirecionar para login
}
```

2. Erro de permissão no banco
```sql
-- Verificar políticas
SELECT * FROM pg_policies WHERE tablename = 'sessoes';
```

3. Erro no processamento de pagamento
```typescript
try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'brl',
    payment_method: paymentMethodId,
  });
} catch (error) {
  console.error('Stripe error:', error);
}
```

## Apêndice C: Configuração de Ambiente

### C.1 Requisitos de Sistema
- Node.js 18+
- npm 9+
- Git
- PostgreSQL 15+ (desenvolvimento local)

### C.2 Configuração Local
```bash
# Clone o repositório
git clone git@github.com:usuario/alem-do-apego.git

# Instale as dependências
cd alem-do-apego
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Inicie o servidor de desenvolvimento
npm run dev
```

### C.3 Scripts de Manutenção
```bash
# Atualizar dependências
npm update

# Limpar cache
npm run clean

# Verificar tipos
npm run typecheck

# Executar linter
npm run lint
```

### C.4 Backups e Recuperação
```bash
# Backup do banco
pg_dump -U postgres alem_do_apego > backup.sql

# Restaurar backup
psql -U postgres alem_do_apego < backup.sql
```

---
Última atualização: Fevereiro 2024

## 7.4 Pipeline CI/CD

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Tests
        run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod
```

## Apêndice D: Logs e Debug

### D.1 Logs de Autenticação
```typescript
console.log("Navigation: Checking session...");
console.log("Navigation: Session:", session);
console.log("Navigation: Fetching profile...");
console.log("Navigation: Profile found:", data);
console.log("Navigation: Auth state changed", _event, session);
```

### D.2 Gerenciamento de Erros
```typescript
catch (error: any) {
  console.error('Erro no logout:', error);
  toast({
    variant: "destructive",
    title: "Erro ao sair",
    description: error.message,
  });
}
```
