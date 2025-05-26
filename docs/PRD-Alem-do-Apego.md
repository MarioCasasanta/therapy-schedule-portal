
# Product Requirements Document (PRD)
## Plataforma "Além do Apego" - Sistema Completo de Terapia Digital

---

### 1. VISÃO GERAL DO PRODUTO

#### 1.1 Resumo Executivo
A plataforma "Além do Apego" é um sistema completo de gestão terapêutica que conecta clientes a especialistas em saúde mental, oferecendo serviços de Psicanálise, Constelação Familiar e PNL. O sistema integra agendamento automatizado, gestão de pagamentos, ferramentas de autoavaliação psicológica e um ambiente seguro para acompanhamento terapêutico.

#### 1.2 Missão
Democratizar o acesso a serviços de saúde mental de qualidade através de uma plataforma digital intuitiva, segura e eficiente.

#### 1.3 Visão
Ser a principal plataforma de terapia digital no Brasil, reconhecida pela excelência no cuidado personalizado e pela inovação em ferramentas de autoconhecimento.

#### 1.4 Objetivos de Negócio
- Conectar 10.000+ clientes com especialistas qualificados
- Alcançar 95% de satisfação dos usuários
- Processar R$ 1M+ em transações mensais
- Manter 90% de retenção de clientes ativos
- Expandir para 5 países da América Latina

---

### 2. ARQUITETURA TÉCNICA

#### 2.1 Stack Tecnológico
**Frontend:**
- React 18 com TypeScript
- Vite (Build Tool)
- TailwindCSS + Shadcn/UI
- React Router DOM v6
- Tanstack Query (State Management)
- React Hook Form + Zod (Validação)

**Backend:**
- Supabase (PostgreSQL + Edge Functions)
- Row Level Security (RLS)
- Realtime Subscriptions
- Authentication & Authorization

**Integrações:**
- Stripe (Pagamentos)
- Resend (Email)
- Google Calendar API
- Google OAuth 2.0

**Deploy & Infraestrutura:**
- Vercel (Frontend)
- Supabase Cloud (Backend)
- Custom Domain + SSL
- Automated CI/CD

#### 2.2 Arquitetura de Dados
**Banco de Dados:** PostgreSQL via Supabase
**Total de Tabelas:** 45 tabelas especializadas
**Principais Entidades:**
- Usuários e Perfis
- Sessões Terapêuticas
- Sistemas de Pagamento
- Testes Psicológicos
- Notificações
- Conteúdo Educacional

#### 2.3 MAPEAMENTO COMPLETO DE TELAS E COMPONENTES

##### 2.3.1 ÁREA PÚBLICA (Landing Pages)

**Página Principal (Index.tsx)**
- **Funcionalidades:**
  - Hero section com CTA principal
  - Seções de serviços oferecidos
  - Depoimentos de clientes
  - FAQ interativo
  - Formulário de contato
  - Blog posts em destaque

- **Componentes Utilizados:**
  - `HeroSection.tsx` - Seção principal com chamada para ação
  - `ServicesSection.tsx` - Grid de serviços oferecidos
  - `TestimonialsSection.tsx` - Carousel de depoimentos
  - `FAQSection.tsx` - Accordion de perguntas frequentes
  - `ContactSection.tsx` - Formulário de contato
  - `FeaturedBlogCarousel.tsx` - Posts em destaque
  - `Navigation.tsx` - Menu de navegação responsivo
  - `Footer.tsx` - Rodapé com links e informações

**Para Especialistas (ParaEspecialistas.tsx)**
- **Funcionalidades:**
  - Informações sobre como se tornar especialista
  - Planos e preços para terapeutas
  - Formulário de registro
  - Benefícios da plataforma

- **Componentes Utilizados:**
  - `Navigation.tsx`
  - `Card` (Shadcn/UI) - Cards de planos
  - `Button` (Shadcn/UI) - CTAs
  - `Badge` (Shadcn/UI) - Tags de benefícios

**Para Você (ParaVoce.tsx)**
- **Funcionalidades:**
  - Apresentação dos serviços para clientes
  - Tipos de terapia disponíveis
  - Como funciona a plataforma
  - Testes psicológicos gratuitos

- **Componentes Utilizados:**
  - `Navigation.tsx`
  - `Tabs` (Shadcn/UI) - Navegação entre tipos de terapia
  - `Card` (Shadcn/UI) - Apresentação de serviços
  - `Progress` (Shadcn/UI) - Indicador de progresso

**Lista de Especialistas (Especialistas.tsx)**
- **Funcionalidades:**
  - Grid de especialistas disponíveis
  - Filtros por especialidade
  - Sistema de busca
  - Visualização de perfis
  - Sistema de rating

- **Componentes Utilizados:**
  - `Navigation.tsx`
  - `Avatar` (Shadcn/UI) - Fotos dos especialistas
  - `Badge` (Shadcn/UI) - Especialidades
  - `Star` (Lucide React) - Sistema de avaliação
  - `Input` (Shadcn/UI) - Campo de busca
  - `Select` (Shadcn/UI) - Filtros

**Detalhes do Especialista (EspecialistaDetalhe.tsx)**
- **Funcionalidades:**
  - Perfil completo do especialista
  - Agendamento de sessões
  - Visualização de disponibilidade
  - Informações detalhadas
  - Sistema de tabs

- **Componentes Utilizados:**
  - `Navigation.tsx`
  - `Avatar` (Shadcn/UI) - Foto do especialista
  - `Tabs` (Shadcn/UI) - "Sobre" e "Agendar"
  - `WeeklyCalendar` - Calendário personalizado
  - `Card` (Shadcn/UI) - Informações do perfil
  - `Badge` (Shadcn/UI) - Especializações
  - `Button` (Shadcn/UI) - Ações

##### 2.3.2 SISTEMA DE AUTENTICAÇÃO

**Autenticação (Auth.tsx)**
- **Funcionalidades:**
  - Login com email/senha
  - Registro de novos usuários
  - Recuperação de senha
  - Validação de formulários
  - Redirecionamento baseado em role

- **Componentes Utilizados:**
  - `AuthComponent.tsx` - Formulário principal
  - `Input` (Shadcn/UI) - Campos de entrada
  - `Button` (Shadcn/UI) - Botões de ação
  - `Alert` (Shadcn/UI) - Mensagens de erro/sucesso
  - `Tabs` (Shadcn/UI) - Alternância Login/Registro

**Login Administrativo (AdminLogin.tsx)**
- **Funcionalidades:**
  - Acesso restrito para administradores
  - Validação de credenciais
  - Redirecionamento seguro

- **Componentes Utilizados:**
  - `Card` (Shadcn/UI) - Container do formulário
  - `Input` (Shadcn/UI) - Campos de login
  - `Button` (Shadcn/UI) - Botão de acesso

##### 2.3.3 ÁREA DO CLIENTE

**Dashboard Principal (ClientDashboard.tsx)**
- **Funcionalidades:**
  - Visão geral das sessões
  - Próximos agendamentos
  - Progresso terapêutico
  - Acesso rápido a ferramentas
  - Notificações importantes

- **Componentes Utilizados:**
  - `ClientSidebar.tsx` - Menu lateral do cliente
  - `Card` (Shadcn/UI) - Widgets de informação
  - `Progress` (Shadcn/UI) - Barras de progresso
  - `Calendar` (Shadcn/UI) - Mini calendário
  - `Badge` (Shadcn/UI) - Status das sessões

**Agendamento (ClientSchedule.tsx)**
- **Funcionalidades:**
  - Seleção de especialista
  - Calendário de disponibilidade
  - Confirmação de agendamento
  - Escolha de tipo de sessão
  - Integração com pagamentos

- **Componentes Utilizados:**
  - `WeeklyCalendar` - Calendário principal
  - `Select` (Shadcn/UI) - Seleção de especialista
  - `RadioGroup` (Shadcn/UI) - Tipos de sessão
  - `Dialog` (Shadcn/UI) - Modal de confirmação
  - `Button` (Shadcn/UI) - Ações

**Minhas Sessões (ClientSessions.tsx)**
- **Funcionalidades:**
  - Histórico completo de sessões
  - Filtros por período/status
  - Detalhes de cada sessão
  - Feedback pós-sessão
  - Cancelamento/reagendamento

- **Componentes Utilizados:**
  - `SessionCard.tsx` - Card individual de sessão
  - `SessionHistory.tsx` - Lista histórica
  - `Tabs` (Shadcn/UI) - Navegação temporal
  - `Badge` (Shadcn/UI) - Status das sessões
  - `Button` (Shadcn/UI) - Ações disponíveis

**Perfil do Cliente (client/Profile.tsx)**
- **Funcionalidades:**
  - Edição de dados pessoais
  - Upload de avatar
  - Preferências de notificação
  - Configurações de conta
  - Histórico de atividades

- **Componentes Utilizados:**
  - `ProfileForm.tsx` - Formulário de perfil
  - `Avatar` (Shadcn/UI) - Foto do usuário
  - `Input` (Shadcn/UI) - Campos de dados
  - `Switch` (Shadcn/UI) - Preferências
  - `Separator` (Shadcn/UI) - Divisões visuais

**Pagamentos (ClientPayments.tsx)**
- **Funcionalidades:**
  - Histórico de pagamentos
  - Métodos de pagamento salvos
  - Faturas pendentes
  - Download de recibos
  - Configuração de cobrança

- **Componentes Utilizados:**
  - `Card` (Shadcn/UI) - Cards de pagamento
  - `Table` (Shadcn/UI) - Tabela de transações
  - `Badge` (Shadcn/UI) - Status de pagamento
  - `Button` (Shadcn/UI) - Ações de pagamento
  - `Dialog` (Shadcn/UI) - Modais de confirmação

**Notificações (ClientNotifications.tsx)**
- **Funcionalidades:**
  - Centro de notificações
  - Filtros por tipo
  - Marcar como lida
  - Configurações de alerta
  - Histórico completo

- **Componentes Utilizados:**
  - `NotificationCenter.tsx` - Lista principal
  - `Card` (Shadcn/UI) - Cards de notificação
  - `Badge` (Shadcn/UI) - Tipos e status
  - `Switch` (Shadcn/UI) - Configurações
  - `Tabs` (Shadcn/UI) - Categorização

**Configurações (ClientSettings.tsx)**
- **Funcionalidades:**
  - Preferências gerais
  - Configurações de privacidade
  - Métodos de pagamento
  - Notificações
  - Exclusão de conta

- **Componentes Utilizados:**
  - `Tabs` (Shadcn/UI) - Seções de configuração
  - `Switch` (Shadcn/UI) - Toggles de preferência
  - `PaymentMethodsSection.tsx` - Gestão de pagamentos
  - `NotificationsSection.tsx` - Config. de alertas
  - `Button` (Shadcn/UI) - Ações

##### 2.3.4 ÁREA ADMINISTRATIVA

**Dashboard Admin (AdminDashboard.tsx)**
- **Funcionalidades:**
  - Métricas em tempo real
  - Gráficos de performance
  - Resumo financeiro
  - Alertas do sistema
  - Acesso rápido a funcionalidades

- **Componentes Utilizados:**
  - `AdminSidebar.tsx` - Menu lateral admin
  - `AnalyticsDashboard.tsx` - Métricas visuais
  - `Card` (Shadcn/UI) - Widgets de dados
  - `Chart` (Recharts) - Gráficos diversos
  - `Badge` (Shadcn/UI) - Indicadores

**Gestão de Sessões (dashboard/Sessions.tsx)**
- **Funcionalidades:**
  - Lista completa de sessões
  - Filtros avançados
  - Edição em massa
  - Relatórios detalhados
  - Exportação de dados

- **Componentes Utilizados:**
  - `SessionManager.tsx` - Gerenciador principal
  - `Table` (Shadcn/UI) - Tabela de dados
  - `Select` (Shadcn/UI) - Filtros
  - `Dialog` (Shadcn/UI) - Modais de edição
  - `Button` (Shadcn/UI) - Ações em lote

**Gestão de Clientes (dashboard/Clients.tsx)**
- **Funcionalidades:**
  - Lista de clientes
  - Perfis detalhados
  - Histórico de atividades
  - Sistema de convites
  - Comunicação direta

- **Componentes Utilizados:**
  - `AdminClientList.tsx` - Lista principal
  - `ListaClientes.tsx` - Componente secundário
  - `Avatar` (Shadcn/UI) - Fotos dos clientes
  - `Badge` (Shadcn/UI) - Status e tipos
  - `Input` (Shadcn/UI) - Busca e filtros

**Gestão de Especialistas (dashboard/Specialists.tsx)**
- **Funcionalidades:**
  - Lista de especialistas
  - Aprovação de cadastros
  - Edição de perfis
  - Gestão de disponibilidade
  - Relatórios de performance

- **Componentes Utilizados:**
  - `AdminSpecialistList.tsx` - Lista principal
  - `SpecialistClientList.tsx` - Clientes por especialista
  - `Table` (Shadcn/UI) - Dados tabulares
  - `Dialog` (Shadcn/UI) - Edição de perfis
  - `Switch` (Shadcn/UI) - Status ativo/inativo

**Relatórios (dashboard/Reports.tsx)**
- **Funcionalidades:**
  - Relatórios financeiros
  - Métricas de uso
  - Análise de performance
  - Exportação de dados
  - Dashboards personalizados

- **Componentes Utilizados:**
  - `Chart` (Recharts) - Gráficos diversos
  - `Card` (Shadcn/UI) - Métricas resumidas
  - `Select` (Shadcn/UI) - Filtros de período
  - `Button` (Shadcn/UI) - Exportação
  - `Tabs` (Shadcn/UI) - Tipos de relatório

##### 2.3.5 COMPONENTES ESPECIALIZADOS

**Calendário Semanal (WeeklyCalendar.tsx)**
- **Funcionalidades:**
  - Visualização semanal
  - Seleção de horários
  - Slots disponíveis
  - Integração com disponibilidade
  - Interface responsiva

- **Tecnologias:**
  - React Hooks (useState, useEffect)
  - Date-fns para manipulação de datas
  - TailwindCSS para styling
  - Componentes Shadcn/UI

**Gerenciador de Sessões (SessionManager.tsx)**
- **Funcionalidades:**
  - CRUD completo de sessões
  - Filtros avançados
  - Ações em lote
  - Validações de negócio
  - Sincronização em tempo real

**Centro de Notificações (NotificationCenter.tsx)**
- **Funcionalidades:**
  - Exibição em tempo real
  - Filtros por tipo
  - Marcar como lida
  - Ações contextuais
  - Persistência de estado

##### 2.3.6 FUNCIONALIDADES TRANSVERSAIS

**Sistema de Navegação**
- **Componentes:**
  - `Navigation.tsx` - Menu principal público
  - `DesktopNav.tsx` - Navegação desktop
  - `MobileNav.tsx` - Menu mobile responsivo
  - `UserMenu.tsx` - Menu do usuário logado

**Autenticação e Autorização**
- **Hooks:**
  - `useAuth.tsx` - Estado global de autenticação
- **Componentes:**
  - `AuthComponent.tsx` - Formulários de auth
- **Controle:**
  - Role-based access control
  - Redirecionamento automático
  - Proteção de rotas

**Formulários e Validação**
- **Bibliotecas:**
  - React Hook Form
  - Zod para validação
- **Componentes:**
  - `Form` (Shadcn/UI) - Wrapper de formulários
  - `Input`, `Select`, `Textarea` (Shadcn/UI)
  - Validação em tempo real

**Sistema de Layout**
- **Componentes:**
  - `PageLayout.tsx` - Layout base das páginas
  - `Sidebar` (Shadcn/UI) - Menus laterais
  - `Card` (Shadcn/UI) - Containers de conteúdo

#### 2.4 INTEGRAÇÃO DE COMPONENTES POR FUNCIONALIDADE

##### 2.4.1 Fluxo de Agendamento
```
Cliente → EspecialistaDetalhe → WeeklyCalendar → SessionForm → PaymentGateway → Confirmation
```

**Componentes Envolvidos:**
- `EspecialistaDetalhe.tsx` (Seleção)
- `WeeklyCalendar.tsx` (Data/Hora)
- `SessionForm.tsx` (Detalhes)
- Stripe Integration (Pagamento)
- `NotificationCenter.tsx` (Confirmação)

##### 2.4.2 Fluxo de Gestão Administrativa
```
Admin → Dashboard → SessionManager → ClientDetail → Actions
```

**Componentes Envolvidos:**
- `AdminDashboard.tsx` (Visão geral)
- `SessionManager.tsx` (Gestão)
- `ClientDetail.tsx` (Detalhes)
- `AdminClientList.tsx` (Listagem)

##### 2.4.3 Fluxo de Autenticação
```
Login → Auth → RoleCheck → Dashboard Redirect
```

**Componentes Envolvidos:**
- `Auth.tsx` (Interface)
- `AuthComponent.tsx` (Lógica)
- `useAuth.tsx` (Estado)
- Route Protection (Redirecionamento)

---

### 3. PERFIS DE USUÁRIO

#### 3.1 Cliente Final
**Demografia:**
- Idade: 25-55 anos
- Renda: Classe B/C
- Educação: Superior completo/incompleto
- Localização: Urbana, Brasil

**Necessidades:**
- Acesso facilitado a terapia de qualidade
- Flexibilidade de horários
- Acompanhamento do progresso pessoal
- Pagamentos simplificados
- Privacidade e segurança

**Jornada do Usuário:**
1. Descoberta (Landing Page/SEO)
2. Cadastro e Avaliação Inicial
3. Agendamento de Sessão
4. Participação em Sessões
5. Acompanhamento e Evolução
6. Renovação/Recomendação

#### 3.2 Especialista/Terapeuta
**Perfil:**
- Psicólogos, Psicanalistas, Terapeutas
- 2+ anos de experiência
- Certificações reconhecidas
- Focados em crescimento profissional

**Necessidades:**
- Gestão eficiente da agenda
- Ferramentas para acompanhamento de clientes
- Sistema de pagamentos automatizado
- Relatórios de performance
- Suporte técnico dedicado

#### 3.3 Administrador
**Responsabilidades:**
- Gestão de usuários e especialistas
- Monitoramento de métricas
- Controle de qualidade
- Suporte ao cliente
- Análise financeira

---

### 4. FUNCIONALIDADES DETALHADAS

#### 4.1 SISTEMA DE AUTENTICAÇÃO E PERFIS

**4.1.1 Autenticação Multi-Modal**
- **Email/Senha:** Sistema padrão com validação
- **Google OAuth:** Login social integrado
- **Recuperação de Senha:** Flow automatizado via email
- **Verificação de Email:** Opcional para agilizar testes

**4.1.2 Gestão de Perfis**
```typescript
interface UserProfile {
  id: uuid;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: 'admin' | 'especialista' | 'cliente';
  preferences: JsonObject;
  created_at: timestamp;
  data_nascimento?: date;
  status: 'active' | 'inactive';
}
```

**4.1.3 Sistema de Roles**
- **Admin:** Acesso total ao sistema
- **Especialista:** Gestão de clientes e sessões
- **Cliente:** Acesso a sessões e ferramentas pessoais

#### 4.2 SISTEMA DE AGENDAMENTO

**4.2.1 Gestão de Sessões**
```typescript
interface Session {
  id: uuid;
  cliente_id: uuid;
  data_hora: timestamp;
  tipo_sessao: 'psicanalise' | 'constelacao' | 'pnl' | 'avaliacao';
  status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
  valor: numeric;
  notas?: string;
  feedback?: string;
  google_event_id?: string;
  guest_email?: string;
}
```

**4.2.2 Funcionalidades de Agendamento**
- **Calendario Semanal:** Interface visual para seleção de horários
- **Disponibilidade Dinâmica:** Configuração flexível por especialista
- **Convites por Email:** Sistema automatizado via Resend
- **Lembretes Automáticos:** 24h e 1h antes da sessão
- **Reagendamento:** Flow simplificado para mudanças
- **Integração Google Calendar:** Sincronização bidirecional

#### 4.3 SISTEMA DE PAGAMENTOS

**4.3.1 Processamento via Stripe**
```typescript
interface Payment {
  id: uuid;
  cliente_id: uuid;
  sessao_id: uuid;
  valor: numeric;
  status: 'pendente' | 'processando' | 'pago' | 'falhado';
  metodo_pagamento: string;
  data_pagamento?: timestamp;
}
```

**4.3.2 Funcionalidades Financeiras**
- **Pagamento por Sessão:** Cobrança individual
- **Planos de Assinatura:** Recorrência mensal/trimestral
- **Faturas Automáticas:** Geração e envio via email
- **Relatórios Financeiros:** Dashboard completo para admin
- **Reembolsos:** Sistema controlado para exceções

#### 4.4 TESTES PSICOLÓGICOS AUTOMATIZADOS

**4.4.1 Tipos de Testes Disponíveis**
- **Teste de Ansiedade:** GAD-7 adaptado
- **Teste de Estresse:** Escala personalizada
- **Teste de Burnout:** Inventário específico
- **Teste de TDAH:** Questionário de triagem
- **Teste de Autismo:** Escala de rastreamento
- **Avaliação de Relacionamento:** Para casais

**4.4.2 Sistema de Scoring**
```typescript
interface TestResult {
  id: uuid;
  user_id: uuid;
  tipo_teste: string;
  pontuacao: number;
  percentual: number;
  nivel_resultado: 'baixo' | 'moderado' | 'alto' | 'severo';
  respostas: JsonObject;
  data_teste: timestamp;
}
```

**4.4.3 Funcionalidades dos Testes**
- **Interface Responsiva:** Otimizada para mobile
- **Progresso Visual:** Barra de andamento
- **Resultados Imediatos:** Análise automática
- **Histórico Completo:** Evolução temporal
- **Recomendações Personalizadas:** IA integrada

#### 4.5 FERRAMENTAS DE AUTOCONHECIMENTO

**4.5.1 Diário Emocional**
```typescript
interface EmotionalDiary {
  id: uuid;
  user_id: uuid;
  title: string;
  content: text;
  mood_score: number; // 1-10
  entry_date: date;
  created_at: timestamp;
}
```

**4.5.2 Jornada de Transformação**
- **Identificação de Padrões:** Mapeamento comportamental
- **Definição de Metas:** Framework SMART integrado
- **Acompanhamento de Progresso:** Sistema de pontuação
- **Liberação de Culpa:** Protocolo estruturado
- **Escudo Emocional:** Ferramenta de proteção

**4.5.3 Gestão Financeira Emocional**
```typescript
interface FinancialExpense {
  id: uuid;
  user_id: uuid;
  valor: numeric;
  categoria: string;
  sentimento: string;
  feedback_ia?: string;
  data_gasto: date;
}
```

#### 4.6 SISTEMA DE NOTIFICAÇÕES

**4.6.1 Tipos de Notificações**
- **Lembretes de Sessão:** 24h e 1h antes
- **Confirmações de Agendamento:** Imediata
- **Atualizações de Pagamento:** Status changes
- **Novas Mensagens:** Chat interno
- **Relatórios Semanais:** Progresso pessoal

**4.6.2 Canais de Entrega**
- **In-App:** Notificações em tempo real
- **Email:** Via Resend API
- **Push Notifications:** Para mobile (futuro)
- **SMS:** Para urgências (futuro)

#### 4.7 DASHBOARD ADMINISTRATIVO

**4.7.1 Métricas Principais**
- **Sessões por Período:** Gráficos temporais
- **Revenue Tracking:** Receita mensal/anual
- **User Engagement:** Métricas de atividade
- **Conversion Rates:** Funil de conversão
- **Customer Satisfaction:** NPS e feedback

**4.7.2 Gestão de Usuários**
- **Lista de Clientes:** Filtros avançados
- **Perfis de Especialistas:** Gestão completa
- **Sistema de Convites:** Email automatizado
- **Controle de Acesso:** Roles e permissões
- **Auditoria de Ações:** Log de atividades

#### 4.8 ÁREA DO CLIENTE

**4.8.1 Dashboard Pessoal**
- **Próximas Sessões:** Calendar view
- **Progresso Terapêutico:** Gráficos visuais
- **Histórico de Testes:** Timeline evolution
- **Documentos Compartilhados:** Upload/download
- **Pagamentos e Faturas:** Histórico completo

**4.8.2 Ferramentas Interativas**
- **Agenda Personal:** Booking interface
- **Chat com Terapeuta:** Messaging system
- **Biblioteca de Recursos:** Conteúdo educacional
- **Metas e Objetivos:** SMART goals tracking
- **Feedback de Sessões:** Rating system

---

### 5. INTEGRAÇÕES TÉCNICAS

#### 5.1 Google Calendar API
**Funcionalidades:**
- Sincronização bidirecional de eventos
- Criação automática de reuniões
- Atualização de status em tempo real
- Convites para participantes
- Gestão de disponibilidade

**Implementação:**
```typescript
interface GoogleCalendarSync {
  session_id: uuid;
  google_event_id: string;
  sync_status: 'pending' | 'synced' | 'error';
  last_synced_at: timestamp;
}
```

#### 5.2 Stripe Payment Processing
**Funcionalidades:**
- Processamento de cartões
- Assinaturas recorrentes
- Webhooks para atualizações
- Reembolsos automatizados
- Relatórios financeiros

#### 5.3 Resend Email Service
**Funcionalidades:**
- Templates personalizados
- Envio em lote
- Tracking de abertura
- Bounce handling
- Analytics de entrega

---

### 6. SEGURANÇA E COMPLIANCE

#### 6.1 Proteção de Dados
- **Criptografia:** TLS 1.3 end-to-end
- **LGPD Compliance:** Políticas de privacidade
- **Data Retention:** Políticas de retenção
- **Backup Automático:** Daily backups
- **Access Logs:** Auditoria completa

#### 6.2 Autenticação e Autorização
- **JWT Tokens:** Refresh automático
- **Row Level Security:** Políticas no banco
- **Rate Limiting:** Proteção contra ataques
- **CORS Configuration:** Domínios autorizados
- **Session Management:** Controle de sessões

---

### 7. PERFORMANCE E ESCALABILIDADE

#### 7.1 Otimizações Frontend
- **Code Splitting:** Lazy loading
- **Image Optimization:** WebP + compression
- **Caching Strategy:** Service workers
- **Bundle Size:** < 500KB initial
- **Core Web Vitals:** LCP < 2.5s

#### 7.2 Otimizações Backend
- **Database Indexing:** Queries otimizadas
- **Connection Pooling:** PgBouncer
- **Edge Functions:** Latência reduzida
- **CDN Integration:** Assets globais
- **Auto-scaling:** Horizontal scaling

---

### 8. ANALYTICS E MÉTRICAS

#### 8.1 KPIs de Negócio
- **Monthly Active Users (MAU)**
- **Customer Acquisition Cost (CAC)**
- **Lifetime Value (LTV)**
- **Churn Rate**
- **Net Promoter Score (NPS)**
- **Revenue per User (ARPU)**

#### 8.2 Métricas Técnicas
- **Response Time:** < 200ms avg
- **Uptime:** 99.9% SLA
- **Error Rate:** < 0.1%
- **Database Performance:** Query optimization
- **API Rate Limits:** Request throttling

---

### 9. ROADMAP DE DESENVOLVIMENTO

#### 9.1 Fase 1 - MVP (Concluída)
- ✅ Autenticação básica
- ✅ Agendamento de sessões
- ✅ Sistema de pagamentos
- ✅ Dashboard administrativo
- ✅ Testes psicológicos básicos

#### 9.2 Fase 2 - Enhancements (Em Andamento)
- 🔄 Integração Google Calendar
- 🔄 Chat em tempo real
- 🔄 Mobile responsiveness
- 🔄 Ferramentas de autoconhecimento
- 🔄 Sistema de notificações avançado

#### 9.3 Fase 3 - Scale (Planejada)
- 📋 Mobile App (React Native)
- 📋 Videochamadas integradas
- 📋 IA para recomendações
- 📋 Marketplace de especialistas
- 📋 Expansão internacional

#### 9.4 Fase 4 - Innovation (Futuro)
- 📋 VR/AR Therapy Sessions
- 📋 Blockchain credentials
- 📋 IoT Health monitoring
- 📋 Advanced AI therapy
- 📋 Telemedicine integration

---

### 10. MODELOS DE NEGÓCIO

#### 10.1 Revenue Streams
**Comissão por Sessão:**
- 15% sobre valor da sessão
- Volume mínimo: 10 sessões/mês
- Pagamento quinzenal

**Assinaturas Premium:**
- Clientes: R$ 29.90/mês
- Especialistas: R$ 99.90/mês
- Recursos exclusivos inclusos

**Certificações e Cursos:**
- Cursos para especialistas
- Certificações próprias
- Workshops e eventos

#### 10.2 Pricing Strategy
**Clientes:**
- Freemium: Testes básicos gratuitos
- Premium: R$ 29.90/mês (todas as ferramentas)
- Pay-per-session: Por demanda

**Especialistas:**
- Starter: R$ 59.90/mês (até 50 clientes)
- Professional: R$ 99.90/mês (clientes ilimitados)
- Enterprise: Personalizado (grandes clínicas)

---

### 11. ESTRATÉGIA DE GO-TO-MARKET

#### 11.1 Segmentação de Mercado
**Mercado Primário:**
- Profissionais urbanos, 25-45 anos
- Renda familiar R$ 5.000+
- Interesse em desenvolvimento pessoal

**Mercado Secundário:**
- Estudantes universitários
- Casais em relacionamento
- Profissionais em burnout

#### 11.2 Canais de Aquisição
**Digital Marketing:**
- SEO/SEM (Google Ads)
- Social Media (Instagram, LinkedIn)
- Content Marketing (Blog)
- Influencer partnerships

**Partnerships:**
- Clínicas de psicologia
- Universidades
- RH de empresas
- Planos de saúde

#### 11.3 Estratégia de Retenção
- **Onboarding:** Tutorial interativo
- **Engagement:** Gamificação
- **Support:** Chat 24/7
- **Community:** Grupos de apoio
- **Loyalty:** Programa de pontos

---

### 12. COMPETITIVE ANALYSIS

#### 12.1 Concorrentes Diretos
**Zenklub:**
- Forças: Brand recognition, investimento
- Fraquezas: Interface complexa, preço alto
- Diferencial nosso: Ferramentas de autoconhecimento

**Vittude:**
- Forças: Network de psicólogos
- Fraquezas: Foco apenas em psicologia
- Diferencial nosso: Abordagens alternativas

**Telavita:**
- Forças: Videochamadas integradas
- Fraquezas: UX limitada
- Diferencial nosso: Testes automatizados

#### 12.2 Vantagens Competitivas
1. **Ferramentas de Autoavaliação:** Testes automatizados únicos
2. **Abordagens Múltiplas:** Psicanálise + Constelação + PNL
3. **UX Superior:** Interface intuitiva e responsiva
4. **Pricing Acessível:** Modelos flexíveis
5. **Tecnologia Avançada:** Stack moderno e escalável

---

### 13. QUALITY ASSURANCE

#### 13.1 Testing Strategy
**Automated Testing:**
- Unit Tests: 80%+ coverage
- Integration Tests: API endpoints
- E2E Tests: Critical user flows
- Performance Tests: Load testing

**Manual Testing:**
- Usability Testing: User feedback
- Security Testing: Penetration tests
- Accessibility Testing: WCAG compliance
- Cross-browser Testing: Compatibility

#### 13.2 Deployment Strategy
**Environments:**
- Development: Feature branches
- Staging: Pre-production testing
- Production: Blue-green deployment
- Hotfix: Emergency patches

**CI/CD Pipeline:**
- GitHub Actions
- Automated testing
- Security scanning
- Performance monitoring

---

### 14. SUPPORT E DOCUMENTATION

#### 14.1 User Support
**Channels:**
- In-app chat support
- Email support (24h response)
- Video call support (emergencies)
- Knowledge base (self-service)

**SLA Commitments:**
- Critical issues: 2h response
- High priority: 4h response
- Medium priority: 24h response
- Low priority: 72h response

#### 14.2 Technical Documentation
**For Developers:**
- API documentation (OpenAPI)
- Database schema docs
- Deployment guides
- Architecture diagrams

**For Users:**
- User manuals
- Video tutorials
- FAQ sections
- Best practices guides

---

### 15. RISK MANAGEMENT

#### 15.1 Technical Risks
**Risk:** Database performance degradation
**Mitigation:** Monitoring, indexing, caching

**Risk:** Third-party API failures
**Mitigation:** Fallback systems, SLA monitoring

**Risk:** Security breaches
**Mitigation:** Regular audits, encryption, monitoring

#### 15.2 Business Risks
**Risk:** Regulatory changes (LGPD)
**Mitigation:** Legal compliance, privacy by design

**Risk:** Market competition
**Mitigation:** Innovation, customer loyalty, pricing

**Risk:** Economic downturn
**Mitigation:** Diverse pricing models, cost optimization

---

### 16. SUCCESS METRICS

#### 16.1 Short-term Goals (6 months)
- 1,000 registered users
- 100 active specialists
- R$ 50K monthly revenue
- 4.5+ app store rating
- 90% uptime

#### 16.2 Medium-term Goals (12 months)
- 5,000 registered users
- 300 active specialists
- R$ 200K monthly revenue
- Market expansion (2 new cities)
- Mobile app launch

#### 16.3 Long-term Goals (24 months)
- 20,000 registered users
- 1,000 active specialists
- R$ 1M monthly revenue
- International expansion
- Series A funding

---

### 17. TECHNICAL DEBT MANAGEMENT

#### 17.1 Current Technical Debt
- Large component files need refactoring
- Missing unit tests in some modules
- Database query optimization needed
- Mobile responsiveness improvements
- Error handling standardization

#### 17.2 Debt Reduction Plan
**Q1 2024:**
- Refactor large components
- Add comprehensive testing
- Optimize database queries

**Q2 2024:**
- Implement design system
- Standardize error handling
- Performance optimization

**Q3 2024:**
- Code quality automation
- Documentation completion
- Security hardening

---

### 18. CONCLUSÃO

A plataforma "Além do Apego" representa uma solução inovadora e completa para o mercado de terapia digital no Brasil. Com um stack tecnológico moderno, funcionalidades diferenciadas e foco na experiência do usuário, o projeto está posicionado para capturar uma parcela significativa do mercado de saúde mental digital.

O roadmap estabelecido permite crescimento sustentável, enquanto as métricas de sucesso garantem que o produto atenda às necessidades reais dos usuários. A combinação de tecnologia avançada, modelo de negócio sólido e estratégia de go-to-market bem definida cria as condições ideais para o sucesso do projeto.

**Próximos Passos Imediatos:**
1. Finalizar integração Google Calendar
2. Implementar chat em tempo real
3. Otimizar performance mobile
4. Lançar programa beta com especialistas
5. Iniciar campanha de marketing digital

---

### ANEXOS

#### A. Estrutura do Banco de Dados
[Diagrama ER completo disponível em arquivo separado]

#### B. API Documentation
[Swagger/OpenAPI specs disponível em /docs/api]

#### C. UI/UX Mockups
[Figma designs disponível em link compartilhado]

#### D. Financial Projections
[Planilha detalhada de projeções financeiras]

#### E. Legal Framework
[Documentos de compliance LGPD e termos de uso]

---

**Documento versão:** 1.0
**Data de criação:** Janeiro 2024
**Última atualização:** [Data atual]
**Responsável:** Equipe de Produto "Além do Apego"
**Status:** APROVADO PARA IMPLEMENTAÇÃO
