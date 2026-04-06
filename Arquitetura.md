 🧱 Arquitetura do EggFlow

## 📁 Estrutura de Pastas (detalhada)
src/
├── app/ # Rotas e páginas (Next.js App Router)
│ ├── api/auth/ # Endpoints de autenticação (API Routes)
│ ├── dashboard/ # Página inicial (métricas + pedidos recentes)
│ ├── design-system/ # Documentação visual de componentes
│ ├── login/ # Tela de autenticação
│ ├── novo-pedido/ # Formulário de criação (componentizado localmente)
│ ├── pedidos/ # Listagem principal de pedidos
│ │ └── editar/[id]/ # Página de edição (rota dinâmica)
│ ├── favicon.ico
│ ├── globals.css # Tailwind + variáveis CSS customizadas
│ ├── layout.tsx # Layout raiz (Toaster, fontes, suppressHydrationWarning)
│ └── page.tsx # Redireciona para /dashboard
├── components/ # Componentes reutilizáveis em toda a aplicação
│ ├── layout/ # Estrutura comum: TopAppBar, NavigationDrawer, BottomNavBar, FloatingActionButton
│ ├── login/ # Componentes da tela de login (form, visual, footer, support)
│ ├── dashboard/ # Cards e métricas do dashboard
│ ├── pedidos/ # Componentes da página de pedidos (tabela, filtros, paginação, cabeçalho)
│ ├── ui/ # Componentes primitivos do shadcn/ui
│ ├── ClientOnly.tsx # Utilitário para evitar hidratação
│ └── TransitionLoader.tsx # Transição suave entre rotas
├── stores/ # Gerenciamento de estado global (Zustand)
│ ├── authStore.ts # Dados do usuário e funções de login/logout
│ └── orderStore.ts # CRUD de pedidos com persistência localStorage
├── types/ # Definições TypeScript
│ ├── dashboardOrder.ts # Tipo usado no dashboard (com iniciais, quantidade)
│ ├── pedidoOrder.ts # Tipo usado na página de pedidos (com avatar, status)
│ └── index.ts # Exportações agregadas
├── config/ # Configurações estáticas (mapeamentos)
│ ├── orderStatus.ts # Status e estilos para pedidos do dashboard
│ ├── pedidoOrderStatus.ts # Status e estilos para pedidos da listagem
│ └── pedidoEggTypeConfig.ts # Mapeamento tipo de ovo → label, cores
├── data/ # Dados mockados (fallback para desenvolvimento)
│ ├── dashboardStats.ts # Métricas iniciais do dashboard
│ ├── mockOrders.ts # Pedidos mock para o dashboard
│ ├── mockOrdersList.ts # Pedidos mock para a listagem principal
│ └── orders.ts # (legado, pode ser removido)
├── lib/ # Funções utilitárias
│ └── utils.ts # cn() para merge de classes Tailwind
├── styles/ # Estilos globais (único arquivo CSS)
│ └── globals.css # Importa Tailwind, define tokens e classes customizadas
├── middleware.ts # Proteção de rotas via cookie
└── ... (arquivos de configuração do Next.js, Tailwind, etc.)

text

---

## 🧠 Decisões Arquitetônicas

### 1. App Router com `"use client"` predominante

- O projeto utiliza **Next.js App Router** com componentes Client Component na maioria das páginas (por causa da interatividade: formulários, toasts, navegação programática).
- O layout raiz é Server Component, mas os filhos são Client Components. Isso permite usar hooks (`useState`, `useEffect`, `useRouter`) sem problemas.
- `suppressHydrationWarning` foi adicionado ao `<html>` e `<body>` para evitar erros causados por extensões de navegador.

### 2. Separação de tipos por contexto

- `dashboardOrder.ts` e `pedidoOrder.ts` são **tipos diferentes**, mesmo que compartilhem algumas propriedades.
- Isso evita confusão entre as duas tabelas (dashboard vs. listagem) e permite que cada uma evolua independentemente.
- **Decisão consciente:** não usar herança ou tipos opcionais – preferimos clareza e segurança de tipos.

### 3. Estado global com Zustand + persistência

- **Zustand** foi escolhido por ser leve, simples e ter suporte nativo a persistência (`persist` middleware).
- `orderStore` armazena a lista de pedidos e as funções `addOrder`, `updateOrder`, `deleteOrder`. Os dados são salvos no `localStorage` (chave `eggflow-orders`).
- `authStore` armazena dados do usuário (nome, role) para exibição na interface. O token/sessão real fica no cookie httpOnly (não na store).

### 4. Autenticação híbrida (cookie + store)

- **Cookie httpOnly** (`eggflow_session`) é definido pela API de login e limpo pela API de logout. Isso é seguro contra XSS.
- **Middleware** verifica a existência do cookie para proteger rotas.
- **Store** guarda informações não sensíveis do usuário (nome, avatar, role) para evitar requisições repetidas à API `/me`.
- O fluxo: login → API define cookie e retorna user → cliente salva na store → redireciona.

### 5. Componentização local vs. global

- Componentes **globais** (reutilizados em várias páginas) ficam em `src/components/`.
- Componentes **específicos de uma rota** ficam dentro da própria pasta da rota (ex: `src/app/novo-pedido/FormField.tsx`). Isso facilita a manutenção e evita poluição da pasta `components`.
- Exceção: `src/components/pedidos/` contém componentes que são usados apenas na página de pedidos, mas como a pasta `pedidos` dentro de `app` já tem o `page.tsx`, optamos por manter os componentes filhos em `components/pedidos/` para manter a estrutura mais plana (evitar aninhamento profundo).

### 6. Configurações centralizadas (`config/`)

- Mapeamentos como `pedidoEggTypeConfig` e `pedidoOrderStatusConfig` ficam em `config/` para serem importados por qualquer componente que precise deles.
- Isso evita repetição de lógica (ex: cor da bolinha para cada tipo de ovo) e facilita alterações futuras.

### 7. Estilização com Tailwind CSS 4 e variáveis CSS

- Utilizamos **Tailwind CSS 4** com o plugin `@tailwindcss/postcss`.
- Todas as cores do design system foram transformadas em variáveis CSS (ex: `--color-primary`, `--surface-container-low`) e expostas via `@theme` no `globals.css`.
- Isso permite usar classes como `bg-primary` ou `text-on-surface` diretamente, mantendo fidelidade visual.
- **"No-Line Rule"** foi implementada através da remoção global de bordas (`border-color: transparent` por padrão) e uso de `bg-surface-container-low` para separar seções.

### 8. Notificações com `sonner`

- O pacote `sonner` foi escolhido por ser moderno, leve e ter uma API simples (`toast.success()`, `toast.error()`).
- Substitui o `useToast` do shadcn/ui, que exigia mais configuração e causava erros de hidratação.

### 9. Middleware para proteção de rotas

- O `middleware.ts` verifica a existência do cookie `eggflow_session` antes de permitir acesso a rotas protegidas (`/dashboard`, `/pedidos`, `/novo-pedido`, `/design-system`).
- Rotas públicas: `/login`, `/api/auth/login`.
- Em caso de ausência de cookie, redireciona para `/login` preservando a URL original (`redirect` query param).

### 10. Persistência de dados (CRUD) sem backend

- Como o projeto ainda não possui backend, os dados são mantidos no `localStorage` via Zustand persist.
- Isso permite demonstrar o fluxo completo de CRUD (criar, ler, atualizar, deletar) sem dependência externa.
- Futuramente, as funções `addOrder`, `updateOrder`, `deleteOrder` podem ser facilmente substituídas por chamadas `fetch` para uma API real.

---

## 🔄 Fluxo de Dados entre Camadas
Usuário → UI (componente) → Store (Zustand) → localStorage
↓
API Routes (apenas para autenticação)

text

- **Pedidos**: UI → `orderStore.addOrder` → estado atualizado → persistência automática → re-renderização das listas.
- **Autenticação**: UI → fetch para `/api/auth/login` → resposta com cookie + user → `authStore.setUser` → redirecionamento.

---

## 🧪 Testabilidade

- A separação clara entre componentes, stores e tipos facilita a escrita de testes unitários.
- As stores podem ser testadas isoladamente (Zustand).
- Componentes podem ser testados com dados mockados.

---

## 📦 Build e Deploy

- O projeto usa `next build` para gerar a versão de produção.
- O deploy pode ser feito na Vercel, Netlify, ou qualquer servidor Node.js.
- Variáveis de ambiente: `NODE_ENV` (para definir `secure` do cookie em produção).

---

## 🔮 Próximos Passos (Melhorias Arquiteturais)

- Substituir `localStorage` por uma API real (ex: Next.js API Routes + banco de dados).
- Adicionar tratamento de erros global (Error Boundaries).
- Implementar testes e2e com Playwright.
- Adicionar lazy loading para rotas pesadas.
- Integrar com um sistema de logs (Sentry, etc.).
