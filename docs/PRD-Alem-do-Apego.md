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

---

### 3. MAPEAMENTO COMPLETO DE COMPONENTES DO SISTEMA

#### 3.1 COMPONENTES SHADCN/UI UTILIZADOS

##### 3.1.1 Componentes de Layout e Estrutura
- **`Card`** (`card.tsx`) - Container principal para seções de conteúdo
  - Usado em: Dashboard, perfis, formulários, listas
  - Variações: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`

- **`Sidebar`** (`sidebar.tsx`) - Menu lateral responsivo
  - Usado em: ClientSidebar, AdminSidebar
  - Props: collapsible, className, variant

- **`Separator`** (`separator.tsx`) - Divisores visuais
  - Usado em: Formulários, seções de configurações
  - Orientação: horizontal/vertical

- **`ScrollArea`** (`scroll-area.tsx`) - Área de rolagem customizada
  - Usado em: Listas longas, documentação
  - Props: className, children

- **`Sheet`** (`sheet.tsx`) - Painel lateral deslizante
  - Usado em: Menu mobile, configurações rápidas
  - Variações: `SheetContent`, `SheetHeader`, `SheetTitle`

##### 3.1.2 Componentes de Navegação
- **`Navigation Menu`** (`navigation-menu.tsx`) - Menu principal
  - Usado em: Navigation.tsx
  - Suporte a dropdowns e submenus

- **`Tabs`** (`tabs.tsx`) - Navegação por abas
  - Usado em: EspecialistaDetalhe, ClientSettings, AdminDashboard
  - Variações: `TabsList`, `TabsTrigger`, `TabsContent`

- **`Breadcrumb`** (`breadcrumb.tsx`) - Navegação hierárquica
  - Usado em: Páginas internas, configurações
  - Props: separator, className

##### 3.1.3 Componentes de Formulário
- **`Form`** (`form.tsx`) - Wrapper para formulários
  - Usado em: AuthComponent, ProfileForm, SessionForm
  - Integração com React Hook Form

- **`Input`** (`input.tsx`) - Campo de entrada de texto
  - Usado em: Todos os formulários
  - Tipos: text, email, password, number

- **`Textarea`** (`textarea.tsx`) - Campo de texto longo
  - Usado em: Notas de sessão, feedback, formulários de contato
  - Props: rows, cols, placeholder

- **`Select`** (`select.tsx`) - Lista suspensa
  - Usado em: Filtros, seleção de especialistas, configurações
  - Variações: `SelectContent`, `SelectItem`, `SelectTrigger`

- **`RadioGroup`** (`radio-group.tsx`) - Grupo de opções únicas
  - Usado em: Testes psicológicos, tipos de sessão
  - Variações: `RadioGroupItem`

- **`Checkbox`** (`checkbox.tsx`) - Caixa de seleção
  - Usado em: Termos de uso, configurações, filtros
  - Props: checked, onCheckedChange

- **`Switch`** (`switch.tsx`) - Interruptor liga/desliga
  - Usado em: Configurações de notificação, preferências
  - Props: checked, onCheckedChange

- **`Slider`** (`slider.tsx`) - Controle deslizante
  - Usado em: Escalas de humor, configurações de volume
  - Props: value, min, max, step

##### 3.1.4 Componentes de Feedback
- **`Button`** (`button.tsx`) - Botões de ação
  - Usado em: Todo o sistema
  - Variantes: default, destructive, outline, secondary, ghost, link
  - Tamanhos: default, sm, lg, icon

- **`Badge`** (`badge.tsx`) - Etiquetas de status
  - Usado em: Status de sessões, especialidades, níveis
  - Variantes: default, secondary, destructive, outline

- **`Alert`** (`alert.tsx`) - Mensagens de alerta
  - Usado em: Validações, erros, avisos
  - Variações: `AlertTitle`, `AlertDescription`
  - Variantes: default, destructive

- **`Toast`** (`toast.tsx`) - Notificações temporárias
  - Usado em: Confirmações, erros, sucessos
  - Variações: `ToastProvider`, `ToastViewport`, `ToastClose`

- **`Progress`** (`progress.tsx`) - Barra de progresso
  - Usado em: Testes psicológicos, upload de arquivos
  - Props: value, max

- **`Skeleton`** (`skeleton.tsx`) - Placeholder de carregamento
  - Usado em: Estados de loading
  - Props: className, variant

##### 3.1.5 Componentes de Exibição de Dados
- **`Table`** (`table.tsx`) - Tabelas de dados
  - Usado em: AdminDashboard, relatórios, listas
  - Variações: `TableHeader`, `TableBody`, `TableRow`, `TableCell`

- **`Avatar`** (`avatar.tsx`) - Foto de perfil
  - Usado em: Perfis de usuários, especialistas
  - Variações: `AvatarImage`, `AvatarFallback`

- **`Calendar`** (`calendar.tsx`) - Calendário interativo
  - Usado em: WeeklyCalendar, agendamentos
  - Props: mode, selected, onSelect

- **`Chart`** (`chart.tsx`) - Gráficos e visualizações
  - Usado em: AnalyticsDashboard, relatórios
  - Baseado em Recharts

##### 3.1.6 Componentes de Overlay
- **`Dialog`** (`dialog.tsx`) - Modais e pop-ups
  - Usado em: Confirmações, formulários modais, detalhes
  - Variações: `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`

- **`Popover`** (`popover.tsx`) - Pop-up contextual
  - Usado em: Tooltips, menus contextuais
  - Variações: `PopoverContent`, `PopoverTrigger`

- **`Tooltip`** (`tooltip.tsx`) - Dicas de ferramentas
  - Usado em: Ícones, botões, informações adicionais
  - Variações: `TooltipProvider`, `TooltipContent`, `TooltipTrigger`

- **`Hover Card`** (`hover-card.tsx`) - Card ao passar o mouse
  - Usado em: Prévia de perfis, informações rápidas
  - Props: openDelay, closeDelay

##### 3.2 COMPONENTES CUSTOMIZADOS DO SISTEMA

##### 3.2.1 Componentes de Navegação
```typescript
// Componentes principais de navegação
Navigation.tsx              // Menu principal responsivo
DesktopNav.tsx             // Navegação desktop
MobileNav.tsx              // Menu mobile hamburger
UserMenu.tsx               // Menu do usuário logado
ClientSidebar.tsx          // Sidebar da área do cliente
AdminSidebar.tsx           // Sidebar da área administrativa
BackButton.tsx             // Botão voltar customizado
```

##### 3.2.2 Componentes de Layout
```typescript
// Estrutura e layout das páginas
PageLayout.tsx             // Layout base das páginas
Footer.tsx                 // Rodapé do site
```

##### 3.2.3 Componentes de Autenticação
```typescript
// Sistema de autenticação
AuthComponent.tsx          // Formulários de login/registro
useAuth.tsx               // Hook de autenticação global
```

##### 3.2.4 Componentes de Landing Page
```typescript
// Página inicial e marketing
HeroSection.tsx           // Seção principal da homepage
ServicesSection.tsx       // Apresentação dos serviços
TestimonialsSection.tsx   // Depoimentos de clientes
FAQSection.tsx           // Perguntas frequentes
ContactSection.tsx       // Formulário de contato
AboutSection.tsx         // Seção sobre nós
FeaturedBlogCarousel.tsx // Carousel de posts em destaque
```

##### 3.2.5 Componentes de Calendário e Agendamento
```typescript
// Sistema de agendamento
WeeklyCalendar.tsx        // Calendário semanal customizado
CalendarManager.tsx       // Gerenciador de calendário admin
SessionForm.tsx          // Formulário de agendamento
```

##### 3.2.6 Componentes de Sessões
```typescript
// Gestão de sessões terapêuticas
SessionManager.tsx        // Gerenciador principal de sessões
SessionCard.tsx          // Card individual de sessão
SessionHistory.tsx       // Histórico de sessões
SessionList.tsx          // Lista de sessões
```

##### 3.2.7 Componentes Administrativos
```typescript
// Área administrativa
AdminClientList.tsx       // Lista de clientes (admin)
AdminSpecialistList.tsx   // Lista de especialistas (admin)
ListaClientes.tsx        // Componente auxiliar de clientes
AnalyticsDashboard.tsx   // Dashboard de analytics
```

##### 3.2.8 Componentes de Perfil e Usuário
```typescript
// Gestão de perfis
ProfileForm.tsx          // Formulário de perfil
SpecialistClientList.tsx // Lista de clientes por especialista
```

##### 3.2.9 Componentes de Notificações
```typescript
// Sistema de notificações
NotificationCenter.tsx   // Centro de notificações
```

##### 3.2.10 Componentes de Configurações
```typescript
// Configurações do sistema
PaymentMethodsSection.tsx    // Métodos de pagamento
NotificationsSection.tsx     // Configurações de notificação
AvailabilitySection.tsx      // Disponibilidade de especialistas
CalendarSection.tsx          // Configurações de calendário
```

##### 3.2.11 Componentes de Faturas e Pagamentos
```typescript
// Sistema financeiro
InvoiceCard.tsx          // Card de fatura
InvoiceViewer.tsx        // Visualizador de faturas
```

#### 3.3 ICONS E ELEMENTOS VISUAIS

##### 3.3.1 Lucide React Icons Utilizados
```typescript
// Ícones principais do sistema
Heart                    // Logo e elementos de marca
User, Users             // Perfis e usuários
Calendar, Clock         // Agendamentos e tempo
Star                    // Avaliações e ratings
MessageCircle           // Chat e mensagens
Phone, Mail             // Contato
Settings, Gear          // Configurações
Search                  // Busca
Filter                  // Filtros
Plus, Minus             // Adição e remoção
Edit, Trash             // Edição e exclusão
Eye, EyeOff            // Visualização
Check, X               // Confirmação e cancelamento
ChevronDown, ChevronUp   // Navegação
ArrowLeft, ArrowRight    // Navegação direcional
Home                   // Página inicial
Bell                   // Notificações
Download, Upload       // Transferência de arquivos
Lock, Unlock           // Segurança
```

#### 3.4 PADRÕES DE UTILIZAÇÃO DE COMPONENTES

##### 3.4.1 Layout Base das Páginas
```typescript
// Estrutura padrão de uma página
<PageLayout>
  <Navigation />
  <main className="container mx-auto px-4 py-8">
    <Card>
      <CardHeader>
        <CardTitle>Título da Página</CardTitle>
        <CardDescription>Descrição opcional</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Conteúdo principal */}
      </CardContent>
    </Card>
  </main>
  <Footer />
</PageLayout>
```

##### 3.4.2 Formulários Padrão
```typescript
// Estrutura padrão de formulários
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input placeholder="Placeholder" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submeter</Button>
  </form>
</Form>
```

##### 3.4.3 Listas com Cards
```typescript
// Padrão para listas de itens
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Conteúdo do item */}
      </CardContent>
    </Card>
  ))}
</div>
```

##### 3.4.4 Modais de Confirmação
```typescript
// Padrão para modais de confirmação
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar Ação</DialogTitle>
      <DialogDescription>
        Descrição da ação que será executada
      </DialogDescription>
    </DialogHeader>
    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={handleConfirm}>
        Confirmar
      </Button>
    </div>
  </DialogContent>
</Dialog>
```

##### 3.4.5 Estados de Loading
```typescript
// Padrão para estados de carregamento
{isLoading ? (
  <div className="space-y-4">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
) : (
  // Conteúdo carregado
)}
```

#### 3.5 RESPONSIVIDADE E ADAPTAÇÃO

##### 3.5.1 Breakpoints TailwindCSS
```typescript
// Breakpoints utilizados no sistema
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

##### 3.5.2 Padrões Responsivos
```typescript
// Grid responsivo padrão
className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

// Sidebar responsiva
className="hidden md:block"  // Desktop only
className="md:hidden"        // Mobile only

// Spacing responsivo
className="px-4 md:px-6 lg:px-8"
className="py-4 md:py-6 lg:py-8"
```

#### 3.6 TEMAS E CUSTOMIZAÇÃO

##### 3.6.1 Variáveis CSS Customizadas
```css
/* Cores do tema principal */
--primary: sage-600
--primary-foreground: white
--secondary: sage-100
--muted: sage-50
--accent: pink-500
--destructive: red-500
```

##### 3.6.2 Classes Utilitárias Customizadas
```typescript
// Classes específicas do projeto
'bg-sage-50'     // Background suave
'text-sage-600'  // Texto principal
'border-sage-200' // Bordas suaves
'font-playfair'  // Fonte decorativa para títulos
```

#### 3.7 ACESSIBILIDADE E UX

##### 3.7.1 Componentes Acessíveis
- Todos os componentes Shadcn/UI incluem suporte a ARIA
- Navegação por teclado implementada
- Contraste de cores otimizado
- Screen reader compatibility

##### 3.7.2 Indicadores Visuais
```typescript
// Estados visuais consistentes
'hover:bg-muted/50'        // Hover states
'focus-visible:ring-2'     // Focus states
'disabled:opacity-50'      // Disabled states
'aria-selected:bg-accent'  // Selected states
```

#### 3.8 PERFORMANCE E OTIMIZAÇÃO

##### 3.8.1 Lazy Loading de Componentes
```typescript
// Componentes carregados sob demanda
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Uso com Suspense
<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>
```

##### 3.8.2 Memoização de Componentes
```typescript
// Componentes memoizados para performance
export const ExpensiveComponent = memo(({ data }) => {
  // Renderização complexa
})
```

---
