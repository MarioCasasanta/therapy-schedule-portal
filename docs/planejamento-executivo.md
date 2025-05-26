
# PLANEJAMENTO EXECUTIVO - SISTEMA "ALÉM DO APEGO"

---

## 🎯 METODOLOGIA DE DESENVOLVIMENTO

### Estratégia de Execução em 4 Fases:
1. **TELAS** - Criar todas as estruturas de páginas primeiro
2. **COMPONENTES** - Desenvolver componentes reutilizáveis
3. **CONTROLLERS** - Implementar lógica de dados e operações CRUD
4. **FUNCIONALIDADES** - Integrar tudo para implementar a lógica de negócio

### Objetivo:
- Desenvolvimento linear sem loops
- Reutilização máxima de componentes
- Separação clara de responsabilidades
- Estrutura escalável e maintível

---

## 🗄️ SCHEMA DO BANCO DE DADOS

### Tabelas Principais

#### **profiles** (Perfis de Usuários)
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'cliente',
  status TEXT DEFAULT 'active',
  notes TEXT,
  preferences JSONB DEFAULT '{}',
  data_nascimento DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **sessoes** (Sessões/Agendamentos)
```sql
CREATE TABLE sessoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES profiles(id),
  data_hora TIMESTAMPTZ NOT NULL,
  tipo_sessao VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'agendado',
  valor NUMERIC DEFAULT 0.0,
  status_pagamento TEXT DEFAULT 'pendente',
  notas TEXT,
  post_session_notes TEXT,
  feedback TEXT,
  google_event_id TEXT,
  guest_email TEXT,
  invitation_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **availability** (Disponibilidade)
```sql
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  interval_minutes INTEGER DEFAULT 60,
  max_concurrent_sessions INTEGER DEFAULT 1,
  exceptions JSONB DEFAULT '[]',
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **pagamentos** (Pagamentos)
```sql
CREATE TABLE pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES profiles(id),
  sessao_id UUID REFERENCES sessoes(id),
  valor NUMERIC NOT NULL,
  status VARCHAR DEFAULT 'pendente',
  metodo_pagamento VARCHAR,
  data_pagamento TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **invoices** (Faturas)
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  session_id UUID REFERENCES sessoes(id),
  invoice_number TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  due_date TIMESTAMPTZ NOT NULL,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **notifications** (Notificações)
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT DEFAULT 'session_reminder',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  related_session_id UUID REFERENCES sessoes(id),
  scheduled_for TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **blog_posts** (Posts do Blog)
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **system_config** (Configurações do Sistema)
```sql
CREATE TABLE system_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  value JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **access_logs** (Logs de Acesso)
```sql
CREATE TABLE access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  page_accessed TEXT NOT NULL,
  component_accessed TEXT,
  accessed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabelas de Apoio

#### **specialists** (Especialistas)
```sql
CREATE TABLE specialists (
  id UUID PRIMARY KEY REFERENCES profiles(id),
  bio TEXT,
  specialty TEXT,
  rating NUMERIC,
  experience_years INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **specialist_details** (Detalhes dos Especialistas)
```sql
CREATE TABLE specialist_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  specialist_id UUID NOT NULL,
  rating NUMERIC DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  short_description TEXT,
  long_description TEXT,
  education TEXT,
  certifications TEXT[],
  languages TEXT[],
  areas_of_expertise TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **events** (Eventos)
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  max_participants INTEGER,
  is_free BOOLEAN DEFAULT true,
  google_calendar_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Views

#### **session_statistics** (Estatísticas de Sessões)
```sql
CREATE VIEW session_statistics AS
SELECT
  cliente_id,
  COUNT(*) as total_sessions,
  COUNT(*) FILTER (WHERE data_hora > CURRENT_TIMESTAMP) as upcoming_sessions,
  COUNT(*) FILTER (WHERE data_hora < CURRENT_TIMESTAMP) as past_sessions,
  COUNT(*) FILTER (WHERE status_pagamento = 'pago') as paid_sessions,
  COUNT(*) FILTER (WHERE status_pagamento = 'pendente') as pending_sessions,
  SUM(valor) FILTER (WHERE status_pagamento = 'pago') as total_paid,
  SUM(valor) FILTER (WHERE status_pagamento = 'pendente') as total_pending
FROM sessoes
GROUP BY cliente_id;
```

---

## 📱 MAPEAMENTO COMPLETO DE TELAS

### 1. PÁGINAS PÚBLICAS (Não Autenticadas)

#### 1.1 **Página Inicial** (`/`)
- **Arquivo:** `src/pages/Index.tsx`
- **Status:** ✅ Implementado
- **Controllers:** Nenhum (página estática)
- **Funcionalidades:**
  - Hero section com CTA principal
  - Apresentação dos serviços (Psicanálise, Constelação, PNL)
  - Carousel de posts do blog
  - Seção de depoimentos
  - FAQ expandível
  - Formulário de contato
- **Componentes:**
  - `Navigation`, `HeroSection`, `ServicesSection`
  - `FeaturedBlogCarousel`, `TestimonialsSection`
  - `FAQSection`, `ContactSection`, `Footer`

#### 1.2 **Autenticação** (`/auth`)
- **Arquivo:** `src/pages/Auth.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `AuthController` (a implementar)
- **Funcionalidades:**
  - Login de usuários existentes
  - Cadastro de novos usuários
  - Recuperação de senha
  - Validação de formulários em tempo real
- **Componentes:**
  - `AuthComponent`, `Card`, `Form`, `Input`, `Button`

#### 1.3 **Login Admin** (`/admin-login`)
- **Arquivo:** `src/pages/AdminLogin.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `AuthController`, `UserController` (a implementar)
- **Funcionalidades:**
  - Login exclusivo para administradores
  - Verificação automática de perfil
  - Promoção do primeiro usuário a admin
  - Redirecionamento baseado em role
- **Componentes:**
  - `Card`, `Input`, `Button`, `useToast`

#### 1.4 **Lista de Especialistas** (`/especialistas`)
- **Arquivo:** `src/pages/Especialistas.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SpecialistController` (a implementar)
- **Funcionalidades:**
  - Grid de especialistas disponíveis
  - Filtros por especialidade e localização
  - Busca por nome
  - Cards com informações básicas
- **Componentes:**
  - `Navigation`, `Footer`, `Card`, `Avatar`, `Badge`

#### 1.5 **Perfil do Especialista** (`/especialistas/:id`)
- **Arquivo:** `src/pages/EspecialistaDetalhe.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SpecialistController` (a implementar)
- **Funcionalidades:**
  - Perfil completo do especialista
  - Formação e certificações
  - Sistema de avaliações (estrelas)
  - Botões de ação (agendar, mensagem)
- **Componentes:**
  - `Navigation`, `Footer`, `Card`, `Avatar`, `Badge`, `Star`

#### 1.6 **Blog** (`/blog`, `/blog/:slug`)
- **Arquivos:** `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `BlogController` ✅ Implementado
- **Funcionalidades:**
  - Listagem de posts publicados
  - Visualização individual de posts
  - Categorização e tags
  - Compartilhamento social
- **Componentes:**
  - `Navigation`, `Footer`, `Card`, `Badge`

#### 1.7 **Páginas Informativas**
- **Para Você** (`/para-voce`) - `src/pages/ParaVoce.tsx` ✅
- **Para Especialistas** (`/para-especialistas`) - `src/pages/ParaEspecialistas.tsx` ✅
- **Trabalhe Conosco** (`/trabalhe-conosco`) - `src/pages/HR.tsx` ✅
- **Cadastro Especialista** (`/cadastro-especialista`) - `src/pages/RegistroEspecialista.tsx` ✅
- **Controllers:** `SpecialistController` (a implementar)

---

### 2. ÁREA ADMINISTRATIVA

#### 2.1 **Dashboard Admin** (`/admin`)
- **Arquivo:** `src/pages/admin/AdminDashboard.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `ReportController`, `UserController` (a implementar)
- **Funcionalidades:**
  - Métricas gerais do sistema
  - Gráficos de performance
  - Acesso rápido às principais funções
  - Widgets de status
- **Componentes:**
  - `AdminSidebar`, `AnalyticsDashboard`, `Card`, `Chart`

#### 2.2 **Gestão de Clientes** (`/admin/clients`)
- **Arquivo:** `src/pages/dashboard/GerenciarClientes.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `ClientController`, `UserController` (a implementar)
- **Funcionalidades:**
  - Listagem completa de clientes
  - Filtros avançados e busca
  - Visualização de perfis
  - Edição de informações
- **Componentes:**
  - `AdminSidebar`, `ListaClientes`, `AdminClientList`, `Table`

#### 2.3 **Detalhes do Cliente** (`/admin/clients/:id`)
- **Arquivo:** `src/pages/dashboard/ClientDetail.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `ClientController`, `SessionController` ✅
- **Funcionalidades:**
  - Perfil completo do cliente
  - Histórico de sessões
  - Estatísticas de pagamento
  - Notas administrativas
- **Componentes:**
  - `AdminSidebar`, `Card`, `Table`, `Badge`

#### 2.4 **Gestão de Especialistas** (`/admin/specialists`)
- **Arquivo:** `src/pages/dashboard/Specialists.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SpecialistController` (a implementar)
- **Funcionalidades:**
  - Lista de especialistas cadastrados
  - Aprovação de novos cadastros
  - Edição de perfis
  - Gestão de status
- **Componentes:**
  - `AdminSidebar`, `AdminSpecialistList`, `Table`, `Switch`

#### 2.5 **Gestão de Sessões** (`/admin/sessions`)
- **Arquivo:** `src/pages/dashboard/Sessions.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SessionController` ✅ Implementado
- **Funcionalidades:**
  - Visualização de todas as sessões
  - Filtros por status e período
  - Ações em massa
  - Exportação de relatórios
- **Componentes:**
  - `AdminSidebar`, `SessionList`, `Calendar`, `Table`

#### 2.6 **Nova Sessão** (`/admin/sessions/new`)
- **Arquivo:** `src/pages/dashboard/sessions/NewSession.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SessionController` ✅, `ClientController`, `SpecialistController` (a implementar)
- **Funcionalidades:**
  - Formulário de agendamento
  - Seleção de especialista e cliente
  - Escolha de horários disponíveis
  - Configuração de tipo de sessão
- **Componentes:**
  - `AdminSidebar`, `WeeklyCalendar`, `SessionForm`, `Select`

#### 2.7 **Detalhes da Sessão** (`/admin/sessions/:id`)
- **Arquivo:** `src/pages/dashboard/sessions/SessionDetails.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SessionController` ✅ Implementado
- **Funcionalidades:**
  - Informações completas da sessão
  - Edição de dados
  - Notas pré e pós sessão
  - Controle de pagamento
- **Componentes:**
  - `AdminSidebar`, `SessionForm`, `Card`, `Textarea`

#### 2.8 **Relatórios** (`/admin/reports`)
- **Arquivo:** `src/pages/dashboard/Reports.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `ReportController` (a implementar)
- **Funcionalidades:**
  - Relatórios financeiros
  - Gráficos de receita
  - Estatísticas de sessões
  - Exportação de dados
- **Componentes:**
  - `AdminSidebar`, `Chart`, `Card`, `Button`

#### 2.9 **Pagamentos** (`/admin/payments`)
- **Arquivo:** `src/pages/dashboard/Payments.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `PaymentController`, `InvoiceController` (a implementar)
- **Funcionalidades:**
  - Gestão de transações
  - Integração com Stripe
  - Faturas pendentes
  - Relatórios financeiros
- **Componentes:**
  - `AdminSidebar`, `Table`, `Badge`, `Button`

#### 2.10 **Configurações Admin** (`/admin/settings`)
- **Arquivo:** `src/pages/dashboard/Settings.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SystemConfigController` ✅ Implementado
- **Funcionalidades:**
  - Configurações do sistema
  - Métodos de pagamento
  - Notificações
  - Integrações
- **Componentes:**
  - `AdminSidebar`, `Tabs`, `PaymentMethodsSection`, `NotificationsSection`

#### 2.11 **Disponibilidade** (`/admin/availability`)
- **Arquivo:** `src/pages/dashboard/Availability.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `AvailabilityController` ✅ Implementado
- **Funcionalidades:**
  - Gestão de horários disponíveis
  - Configuração de intervalos
  - Exceções e bloqueios
  - Sincronização com calendário
- **Componentes:**
  - `AdminSidebar`, `AvailabilitySection`, `Calendar`

#### 2.12 **Notificações Admin** (`/admin/notifications`)
- **Arquivo:** `src/pages/dashboard/notifications/index.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `NotificationController` (a implementar)
- **Funcionalidades:**
  - Central de notificações
  - Configuração de alertas
  - Templates de mensagem
  - Histórico de envios
- **Componentes:**
  - `AdminSidebar`, `NotificationCenter`, `Card`

#### 2.13 **Perfil Admin** (`/admin/profile`)
- **Arquivo:** `src/pages/admin/Profile.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `UserController` (a implementar)
- **Funcionalidades:**
  - Edição de perfil administrativo
  - Configurações pessoais
  - Alteração de senha
  - Preferências do sistema
- **Componentes:**
  - `AdminSidebar`, `ProfileForm`, `Card`

#### 2.14 **Blog Admin**
- **Posts** (`/admin/blog-posts`) - `src/pages/admin/BlogPosts.tsx` ✅
- **Editor** (`/admin/blog-posts/new`, `/admin/blog-posts/edit/:id`) - `src/pages/admin/BlogPostEditor.tsx` ✅
- **Overview** (`/admin/blog-overview`) - `src/pages/admin/AdminBlogOverview.tsx` ✅
- **Controllers:** `BlogController` ✅ Implementado

---

### 3. ÁREA DO ESPECIALISTA

#### 3.1 **Dashboard Especialista** (`/dashboard`)
- **Arquivo:** `src/pages/Dashboard.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SessionController` ✅, `ClientController` (a implementar)
- **Funcionalidades:**
  - Visão geral das atividades
  - Próximas sessões
  - Clientes ativos
  - Métricas pessoais
- **Componentes:**
  - `AdminSidebar` (role especialista), `Card`, `SessionCard`

#### 3.2 **Clientes do Especialista** (`/specialist-clients`)
- **Arquivo:** `src/pages/dashboard/SpecialistClients.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `ClientController`, `SessionController` ✅
- **Funcionalidades:**
  - Lista de clientes atendidos
  - Histórico por cliente
  - Notas e observações
  - Agendamento rápido
- **Componentes:**
  - `AdminSidebar`, `SpecialistClientList`, `Table`

#### 3.3 **Áreas Compartilhadas com Admin**
- **Sessões** (`/specialist-sessions`) - Reutiliza `Sessions.tsx`
- **Nova Sessão** (`/specialist-sessions/new`) - Reutiliza `NewSession.tsx`
- **Detalhes** (`/specialist-sessions/:id`) - Reutiliza `SessionDetails.tsx`
- **Relatórios** (`/specialist-reports`) - Reutiliza `Reports.tsx`
- **Pagamentos** (`/specialist-payments`) - Reutiliza `Payments.tsx`
- **Disponibilidade** (`/specialist-availability`) - Reutiliza `Availability.tsx`
- **Notificações** (`/specialist-notifications`) - Reutiliza `notifications/index.tsx`
- **Perfil** (`/specialist-profile`) - Reutiliza `Profile.tsx`
- **Configurações** (`/specialist-settings`) - Reutiliza `Settings.tsx`
- **Controllers:** Mesmos controllers das páginas admin correspondentes

---

### 4. ÁREA DO CLIENTE

#### 4.1 **Dashboard Cliente** (`/client-dashboard`)
- **Arquivo:** `src/pages/ClientDashboard.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SessionController` ✅, `InvoiceController` (a implementar)
- **Funcionalidades:**
  - Visão geral das sessões
  - Próximos agendamentos
  - Faturas recentes
  - Notificações
- **Componentes:**
  - `ClientSidebar`, `SessionHistory`, `InvoiceViewer`, `Tabs`

#### 4.2 **Sessões do Cliente** (`/client-dashboard/sessions`)
- **Arquivo:** `src/pages/client/ClientSessions.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SessionController` ✅ Implementado
- **Funcionalidades:**
  - Histórico completo de sessões
  - Detalhes de cada atendimento
  - Status de pagamento
  - Feedback pós-sessão
- **Componentes:**
  - `ClientSidebar`, `SessionHistory`, `SessionCard`

#### 4.3 **Detalhes da Sessão** (`/client-dashboard/sessions/:id`)
- **Arquivo:** `src/pages/client/SessionDetail.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SessionController` ✅ Implementado
- **Funcionalidades:**
  - Informações detalhadas da sessão
  - Notas do especialista
  - Opções de reagendamento
  - Avaliação da sessão
- **Componentes:**
  - `ClientSidebar`, `Card`, `Badge`, `Button`

#### 4.4 **Feedback** (`/client-dashboard/sessions/feedback`)
- **Arquivo:** `src/pages/client/sessions/SessionFeedback.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SessionController` ✅ Implementado
- **Funcionalidades:**
  - Formulário de avaliação
  - Sistema de estrelas
  - Comentários opcionais
  - Sugestões de melhoria
- **Componentes:**
  - `ClientSidebar`, `Form`, `Star`, `Textarea`

#### 4.5 **Agendamento** (`/client-dashboard/schedule`)
- **Arquivo:** `src/pages/client/ClientSchedule.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `SessionController` ✅, `AvailabilityController` ✅, `SpecialistController` (a implementar)
- **Funcionalidades:**
  - Calendário de horários disponíveis
  - Seleção de especialista
  - Escolha de tipo de sessão
  - Confirmação de agendamento
- **Componentes:**
  - `ClientSidebar`, `WeeklyCalendar`, `Card`, `Select`

#### 4.6 **Perfil Cliente** (`/client-dashboard/profile/edit`)
- **Arquivo:** `src/pages/client/Profile.tsx`
- **Status:** ✅ Implementado
- **Controllers:** `UserController` (a implementar)
- **Funcionalidades:**
  - Edição de dados pessoais
  - Upload de foto de perfil
  - Preferências de atendimento
  - Histórico médico
- **Componentes:**
  - `ClientSidebar`, `ProfileForm`, `Avatar`, `Form`

#### 4.7 **Área Financeira**
- **Pagamentos** (`/client-dashboard/payments`) - `src/pages/client/ClientPayments.tsx` ✅
- **Faturas** (`/client-dashboard/invoices`) - `src/pages/client/ClientInvoices.tsx` ✅
- **Controllers:** `PaymentController`, `InvoiceController` (a implementar)

#### 4.8 **Suporte e Configurações**
- **Ajuda** (`/client-dashboard/help`) - `src/pages/client/ClientHelp.tsx` ✅
- **Configurações** (`/client-dashboard/settings`) - `src/pages/client/ClientSettings.tsx` ✅
- **Notificações** (`/client-dashboard/notifications`) - `src/pages/client/ClientNotifications.tsx` ✅
- **Controllers:** `NotificationController`, `SystemConfigController` ✅

---

## 🧩 COMPONENTES REUTILIZÁVEIS

### 1. COMPONENTES DE NAVEGAÇÃO
- ✅ `Navigation` - Menu principal público
- ✅ `AdminSidebar` - Sidebar administrativa
- ✅ `ClientSidebar` - Sidebar do cliente
- ✅ `Footer` - Rodapé universal
- ✅ `UserMenu` - Menu do usuário logado
- ✅ `DesktopNav` - Navegação desktop
- ✅ `MobileNav` - Menu mobile

### 2. COMPONENTES DE AUTENTICAÇÃO
- ✅ `AuthComponent` - Formulários de login/registro
- ✅ `useAuth` - Hook global de autenticação

### 3. COMPONENTES DE SESSÕES
- ✅ `WeeklyCalendar` - Calendário principal
- ✅ `SessionForm` - Formulário de sessão
- ✅ `SessionList` - Lista de sessões
- ✅ `SessionCard` - Card individual
- ✅ `SessionHistory` - Histórico de sessões
- ✅ `SessionManager` - Gerenciador de sessões

### 4. COMPONENTES DE USUÁRIOS
- ✅ `AdminClientList` - Lista admin de clientes
- ✅ `AdminSpecialistList` - Lista admin de especialistas
- ✅ `SpecialistClientList` - Clientes do especialista
- ✅ `ProfileForm` - Formulário de perfil
- ✅ `ListaClientes` - Componente auxiliar

### 5. COMPONENTES FINANCEIROS
- ✅ `InvoiceCard` - Card de fatura
- ✅ `InvoiceViewer` - Visualizador de faturas

### 6. COMPONENTES DE CONFIGURAÇÕES
- ✅ `PaymentMethodsSection` - Métodos de pagamento
- ✅ `NotificationsSection` - Configurações de notificação
- ✅ `AvailabilitySection` - Gestão de disponibilidade
- ✅ `CalendarSection` - Configurações de calendário

### 7. COMPONENTES DE LANDING PAGE
- ✅ `HeroSection` - Seção principal
- ✅ `ServicesSection` - Apresentação de serviços
- ✅ `TestimonialsSection` - Depoimentos
- ✅ `FAQSection` - Perguntas frequentes
- ✅ `ContactSection` - Formulário de contato
- ✅ `AboutSection` - Sobre nós
- ✅ `FeaturedBlogCarousel` - Carousel de posts

### 8. COMPONENTES DE SISTEMA
- ✅ `NotificationCenter` - Central de notificações
- ✅ `AnalyticsDashboard` - Dashboard de analytics
- ✅ `CalendarManager` - Gerenciador de calendário

---

## 🎛️ CONTROLLERS (LÓGICA DE DADOS)

### 1. CONTROLLERS EXISTENTES

#### 1.1 **SessionController** ✅
- **Arquivo:** `src/controllers/SessionController.ts`
- **Status:** ✅ Implementado (235 linhas - precisa refatoração)
- **Operações:**
  - `getSessions()` - Listar todas as sessões
  - `getSessionById(id)` - Buscar sessão por ID
  - `createSession(data)` - Criar nova sessão
  - `updateSession(id, data)` - Atualizar sessão
  - `deleteSession(id)` - Excluir sessão
  - `getAllClients()` - Listar clientes
  - `getAllSpecialists()` - Listar especialistas
  - `getSessionsByClient(clientId)` - Sessões por cliente
  - `getSpecialistSessionCount(specialistId)` - Contagem de sessões
  - `getSpecialistDetails(specialistId)` - Detalhes completos

#### 1.2 **BlogController** ✅
- **Arquivo:** `src/controllers/BlogController.ts`
- **Status:** ✅ Implementado
- **Operações:**
  - `getAllPosts(includeUnpublished)` - Listar posts
  - `getPublishedPosts()` - Posts publicados
  - `getPostById(id)` - Buscar por ID
  - `getPostBySlug(slug)` - Buscar por slug

#### 1.3 **AvailabilityController** ✅
- **Arquivo:** `src/controllers/AvailabilityController.ts`
- **Status:** ✅ Implementado
- **Operações:**
  - `list()` - Listar disponibilidades
  - `update(availability)` - Atualizar disponibilidade
  - `getByDayOfWeek(dayOfWeek)` - Buscar por dia da semana

#### 1.4 **SystemConfigController** ✅
- **Arquivo:** `src/controllers/SystemConfigController.ts`
- **Status:** ✅ Implementado
- **Operações:**
  - `get(key)` - Buscar configuração por chave
  - `update(key, value)` - Atualizar configuração

### 2. CONTROLLERS NECESSÁRIOS (A IMPLEMENTAR)

#### 2.1 **UserController** 
- **Arquivo:** `src/controllers/UserController.ts`
- **Status:** ❌ Não implementado
- **Operações Necessárias:**
  - `getAllUsers()` - Listar todos os usuários
  - `getUserById(id)` - Buscar usuário por ID
  - `createUser(data)` - Criar novo usuário
  - `updateUser(id, data)` - Atualizar usuário
  - `deleteUser(id)` - Excluir usuário
  - `getUsersByRole(role)` - Filtrar por papel
  - `promoteToAdmin(id)` - Promover a admin
  - `updateUserRole(id, role)` - Alterar papel
  - `getUserProfile(id)` - Perfil completo
  - `updateUserProfile(id, data)` - Atualizar perfil

#### 2.2 **ClientController**
- **Arquivo:** `src/controllers/ClientController.ts`
- **Status:** ❌ Não implementado
- **Operações Necessárias:**
  - `getAllClients()` - Listar clientes
  - `getClientById(id)` - Buscar cliente por ID
  - `createClient(data)` - Criar cliente
  - `updateClient(id, data)` - Atualizar cliente
  - `deleteClient(id)` - Excluir cliente
  - `getClientSessions(id)` - Sessões do cliente
  - `getClientStatistics(id)` - Estatísticas
  - `getClientPayments(id)` - Histórico financeiro
  - `searchClients(query)` - Busca de clientes
  - `getActiveClients()` - Clientes ativos

#### 2.3 **SpecialistController**
- **Arquivo:** `src/controllers/SpecialistController.ts`
- **Status:** ❌ Não implementado
- **Operações Necessárias:**
  - `getAllSpecialists()` - Listar especialistas
  - `getSpecialistById(id)` - Buscar por ID
  - `createSpecialist(data)` - Criar especialista
  - `updateSpecialist(id, data)` - Atualizar
  - `deleteSpecialist(id)` - Excluir
  - `approveSpecialist(id)` - Aprovar cadastro
  - `rejectSpecialist(id)` - Rejeitar cadastro
  - `getSpecialistClients(id)` - Clientes do especialista
  - `getSpecialistAvailability(id)` - Disponibilidade
  - `updateSpecialistRating(id, rating)` - Atualizar avaliação
  - `searchSpecialists(query)` - Busca

#### 2.4 **PaymentController**
- **Arquivo:** `src/controllers/PaymentController.ts`
- **Status:** ❌ Não implementado
- **Operações Necessárias:**
  - `getAllPayments()` - Listar pagamentos
  - `getPaymentById(id)` - Buscar por ID
  - `createPayment(data)` - Criar pagamento
  - `updatePaymentStatus(id, status)` - Atualizar status
  - `processPayment(data)` - Processar pagamento
  - `refundPayment(id)` - Estornar
  - `getPaymentsByClient(clientId)` - Por cliente
  - `getPaymentsBySession(sessionId)` - Por sessão
  - `getPaymentStatistics()` - Estatísticas
  - `getPendingPayments()` - Pendentes

#### 2.5 **InvoiceController**
- **Arquivo:** `src/controllers/InvoiceController.ts`
- **Status:** ❌ Não implementado
- **Operações Necessárias:**
  - `getAllInvoices()` - Listar faturas
  - `getInvoiceById(id)` - Buscar por ID
  - `createInvoice(data)` - Criar fatura
  - `updateInvoice(id, data)` - Atualizar
  - `markAsPaid(id)` - Marcar como paga
  - `generateInvoiceNumber()` - Gerar número
  - `getInvoicesByClient(clientId)` - Por cliente
  - `getOverdueInvoices()` - Em atraso
  - `sendInvoiceEmail(id)` - Enviar por email

#### 2.6 **NotificationController**
- **Arquivo:** `src/controllers/NotificationController.ts`
- **Status:** ❌ Não implementado
- **Operações Necessárias:**
  - `getAllNotifications()` - Listar notificações
  - `getNotificationsByUser(userId)` - Por usuário
  - `createNotification(data)` - Criar notificação
  - `markAsRead(id)` - Marcar como lida
  - `markAllAsRead(userId)` - Marcar todas como lidas
  - `deleteNotification(id)` - Excluir
  - `scheduleNotification(data)` - Agendar
  - `sendEmailNotification(data)` - Enviar email
  - `sendSMSNotification(data)` - Enviar SMS

#### 2.7 **ReportController**
- **Arquivo:** `src/controllers/ReportController.ts`
- **Status:** ❌ Não implementado
- **Operações Necessárias:**
  - `getFinancialReport(period)` - Relatório financeiro
  - `getSessionsReport(period)` - Relatório de sessões
  - `getUsersReport()` - Relatório de usuários
  - `getPerformanceMetrics()` - Métricas de performance
  - `exportReport(type, format)` - Exportar relatório
  - `getRevenueAnalytics(period)` - Analytics de receita
  - `getSpecialistPerformance(id)` - Performance do especialista
  - `getClientAnalytics()` - Analytics de clientes

#### 2.8 **EventController**
- **Arquivo:** `src/controllers/EventController.ts`
- **Status:** ❌ Não implementado
- **Operações Necessárias:**
  - `getAllEvents()` - Listar eventos
  - `getEventById(id)` - Buscar por ID
  - `createEvent(data)` - Criar evento
  - `updateEvent(id, data)` - Atualizar
  - `deleteEvent(id)` - Excluir
  - `getEventsByUser(userId)` - Por usuário
  - `syncWithGoogleCalendar(eventId)` - Sincronizar
  - `getUpcomingEvents(userId)` - Próximos eventos

#### 2.9 **AuthController**
- **Arquivo:** `src/controllers/AuthController.ts`
- **Status:** ❌ Não implementado (existe `useAuth` hook)
- **Operações Necessárias:**
  - `login(email, password)` - Fazer login
  - `register(data)` - Registrar usuário
  - `logout()` - Fazer logout
  - `resetPassword(email)` - Resetar senha
  - `updatePassword(oldPassword, newPassword)` - Atualizar senha
  - `verifyEmail(token)` - Verificar email
  - `refreshToken()` - Renovar token
  - `validateSession()` - Validar sessão

### 3. CONTROLLERS ESPECIALIZADOS (OPCIONAIS)

#### 3.1 **CalendarController**
- **Arquivo:** `src/controllers/CalendarController.ts`
- **Operações:**
  - `getAvailableSlots(specialistId, date)` - Horários disponíveis
  - `blockTimeSlot(data)` - Bloquear horário
  - `unblockTimeSlot(id)` - Desbloquear
  - `syncWithExternalCalendar(data)` - Sincronizar
  - `getCalendarEvents(userId, period)` - Eventos do calendário

#### 3.2 **EmailController**
- **Arquivo:** `src/controllers/EmailController.ts`
- **Operações:**
  - `sendWelcomeEmail(userId)` - Email de boas-vindas
  - `sendSessionReminder(sessionId)` - Lembrete de sessão
  - `sendInvoiceEmail(invoiceId)` - Enviar fatura
  - `sendPasswordResetEmail(email)` - Reset de senha
  - `sendNotificationEmail(data)` - Email de notificação

#### 3.3 **FileController**
- **Arquivo:** `src/controllers/FileController.ts`
- **Operações:**
  - `uploadFile(file, path)` - Upload de arquivo
  - `deleteFile(path)` - Excluir arquivo
  - `getFileUrl(path)` - URL do arquivo
  - `listFiles(directory)` - Listar arquivos
  - `generateThumbnail(imagePath)` - Gerar thumbnail

---

## ⚙️ FUNCIONALIDADES POR IMPLEMENTAR

### FASE 1 - CORE (Em Desenvolvimento)
- [ ] **Sistema de Agendamento Avançado**
  - Integração com Google Calendar
  - Notificações automáticas
  - Reagendamento/cancelamento
  - Disponibilidade dinâmica

- [ ] **Sistema de Pagamentos**
  - Integração Stripe completa
  - Faturas automáticas
  - Controle de inadimplência
  - Relatórios financeiros

- [ ] **Notificações em Tempo Real**
  - Push notifications
  - Email automático
  - SMS (opcional)
  - Preferências de notificação

### FASE 2 - ESSENCIAL
- [ ] **Sistema de Avaliações**
  - Rating de especialistas
  - Feedback de sessões
  - Comentários de clientes
  - Moderação de conteúdo

- [ ] **Relatórios Avançados**
  - Analytics de uso
  - Métricas de satisfação
  - Relatórios personalizados
  - Exportação de dados

- [ ] **Chat/Mensagens**
  - Comunicação especialista-cliente
  - Anexos de arquivos
  - Histórico de conversas
  - Moderação automática

### FASE 3 - MELHORIAS
- [ ] **Recursos de Conteúdo**
  - Blog completo
  - Biblioteca de recursos
  - Vídeos educacionais
  - Podcasts/áudios

- [ ] **Automações**
  - Workflows automáticos
  - Lembretes inteligentes
  - Follow-ups personalizados
  - Campanhas de email

---

## 📋 CRONOGRAMA DE EXECUÇÃO

### SEMANA 1-2: ESTRUTURA BASE
1. ✅ Configuração inicial do projeto
2. ✅ Autenticação e autorização
3. ✅ Estrutura de páginas básicas
4. ✅ Componentes de layout

### SEMANA 3-4: CONTROLLERS E FUNCIONALIDADES CORE
1. [ ] Implementar Controllers em falta
2. [ ] Sistema de agendamento completo
3. [ ] Gestão de usuários aprimorada
4. [ ] Integração completa com banco de dados

### SEMANA 5-6: SISTEMA FINANCEIRO
1. [ ] PaymentController e InvoiceController
2. [ ] Integração Stripe
3. [ ] Gestão de faturas
4. [ ] Relatórios financeiros

### SEMANA 7-8: NOTIFICAÇÕES E COMUNICAÇÃO
1. [ ] NotificationController
2. [ ] EmailController
3. [ ] Sistema de notificações em tempo real
4. [ ] Chat básico

### SEMANA 9-10: RELATÓRIOS E ANALYTICS
1. [ ] ReportController
2. [ ] Dashboard avançado
3. [ ] Métricas de uso
4. [ ] Exportação de dados

### SEMANA 11-12: POLIMENTO E TESTES
1. [ ] Refatoração de Controllers longos
2. [ ] Testes de integração
3. [ ] Otimização de performance
4. [ ] Deploy e monitoramento

---

## 🎯 PRÓXIMOS PASSOS

### IMEDIATO:
1. **Refatorar SessionController** - Quebrar em controllers menores
2. **Implementar Controllers básicos** - UserController, ClientController, SpecialistController
3. **Validar integração** - Componentes + Controllers

### MÉDIO PRAZO:
1. **Controllers financeiros** - PaymentController, InvoiceController
2. **Sistema de notificações** - NotificationController, EmailController
3. **Relatórios e analytics** - ReportController

### LONGO PRAZO:
1. **Controllers especializados** - CalendarController, FileController
2. **Otimizações** - Performance, cache, indexação
3. **Expansão** - Novos recursos e integrações

---

## 📊 MÉTRICAS DE SUCESSO

### TÉCNICAS:
- [ ] 100% das telas implementadas
- [ ] 100% dos Controllers implementados
- [ ] 0 erros de build/runtime
- [ ] Cobertura de testes > 80%
- [ ] Performance score > 90

### FUNCIONAIS:
- [ ] Sistema de agendamento 100% funcional
- [ ] Pagamentos integrados e testados
- [ ] Notificações funcionando
- [ ] Relatórios precisos

### ARQUITETURA:
- [ ] Separação clara de responsabilidades
- [ ] Controllers com responsabilidade única
- [ ] Reutilização máxima de componentes
- [ ] Código maintível e escalável

---

*Este documento será atualizado conforme o progresso do desenvolvimento*
