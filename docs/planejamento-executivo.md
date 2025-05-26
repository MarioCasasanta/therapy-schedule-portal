
# PLANEJAMENTO EXECUTIVO - SISTEMA "ALÉM DO APEGO"

---

## 🎯 METODOLOGIA DE DESENVOLVIMENTO

### Estratégia de Execução em 3 Fases:
1. **TELAS** - Criar todas as estruturas de páginas primeiro
2. **COMPONENTES** - Desenvolver componentes reutilizáveis
3. **FUNCIONALIDADES** - Implementar a lógica de negócio

### Objetivo:
- Desenvolvimento linear sem loops
- Reutilização máxima de componentes
- Estrutura escalável e maintível

---

## 📱 MAPEAMENTO COMPLETO DE TELAS

### 1. PÁGINAS PÚBLICAS (Não Autenticadas)

#### 1.1 **Página Inicial** (`/`)
- **Arquivo:** `src/pages/Index.tsx`
- **Status:** ✅ Implementado
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

---

### 2. ÁREA ADMINISTRATIVA

#### 2.1 **Dashboard Admin** (`/admin`)
- **Arquivo:** `src/pages/admin/AdminDashboard.tsx`
- **Status:** ✅ Implementado
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

---

### 3. ÁREA DO ESPECIALISTA

#### 3.1 **Dashboard Especialista** (`/dashboard`)
- **Arquivo:** `src/pages/Dashboard.tsx`
- **Status:** ✅ Implementado
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

---

### 4. ÁREA DO CLIENTE

#### 4.1 **Dashboard Cliente** (`/client-dashboard`)
- **Arquivo:** `src/pages/ClientDashboard.tsx`
- **Status:** ✅ Implementado
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

#### 4.8 **Suporte e Configurações**
- **Ajuda** (`/client-dashboard/help`) - `src/pages/client/ClientHelp.tsx` ✅
- **Configurações** (`/client-dashboard/settings`) - `src/pages/client/ClientSettings.tsx` ✅
- **Notificações** (`/client-dashboard/notifications`) - `src/pages/client/ClientNotifications.tsx` ✅

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

### SEMANA 3-4: FUNCIONALIDADES CORE
1. [ ] Sistema de agendamento
2. [ ] Gestão de usuários completa
3. [ ] Dashboard básico
4. [ ] Integração com banco de dados

### SEMANA 5-6: SISTEMA FINANCEIRO
1. [ ] Integração Stripe
2. [ ] Gestão de faturas
3. [ ] Relatórios financeiros
4. [ ] Controle de pagamentos

### SEMANA 7-8: NOTIFICAÇÕES E COMUNICAÇÃO
1. [ ] Sistema de notificações
2. [ ] Email automático
3. [ ] Chat básico
4. [ ] Sincronização de calendário

### SEMANA 9-10: RELATÓRIOS E ANALYTICS
1. [ ] Dashboard avançado
2. [ ] Relatórios personalizados
3. [ ] Métricas de uso
4. [ ] Exportação de dados

### SEMANA 11-12: POLIMENTO E TESTES
1. [ ] Testes de integração
2. [ ] Otimização de performance
3. [ ] UX/UI refinements
4. [ ] Deploy e monitoramento

---

## 🎯 PRÓXIMOS PASSOS

### IMEDIATO:
1. **Validar estrutura atual** - Revisar todas as telas implementadas
2. **Identificar gaps** - Componentes ou funcionalidades em falta
3. **Priorizar desenvolvimento** - Focar no que é crítico primeiro

### MÉDIO PRAZO:
1. **Implementar funcionalidades core** - Sistema de agendamento completo
2. **Integrar pagamentos** - Stripe e gestão financeira
3. **Desenvolver notificações** - Sistema de comunicação

### LONGO PRAZO:
1. **Recursos avançados** - Analytics, relatórios, automações
2. **Otimizações** - Performance, SEO, UX
3. **Expansão** - Novos recursos e integrações

---

## 📊 MÉTRICAS DE SUCESSO

### TÉCNICAS:
- [ ] 100% das telas implementadas
- [ ] 0 erros de build/runtime
- [ ] Cobertura de testes > 80%
- [ ] Performance score > 90

### FUNCIONAIS:
- [ ] Sistema de agendamento 100% funcional
- [ ] Pagamentos integrados e testados
- [ ] Notificações funcionando
- [ ] Relatórios precisos

### UX:
- [ ] Navegação intuitiva
- [ ] Responsividade completa
- [ ] Acessibilidade WCAG
- [ ] Feedback positivo dos usuários

---

*Este documento será atualizado conforme o progresso do desenvolvimento*
