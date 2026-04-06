 🥚 EggFlow – Sistema de Gestão Avícola

## 📌 Visão Geral

O **EggFlow** é uma plataforma SaaS para gestão de pedidos e monitoramento de produção em granjas avícolas. O sistema permite o cadastro, listagem, edição e exclusão de pedidos de ovos, além de exibir métricas de produção e saúde dos galpões.

O projeto foi desenvolvido com foco em **componentização**, **organização de responsabilidades** e **boa experiência do usuário**, utilizando tecnologias modernas do ecossistema Next.js.

---

## 🧱 Stack Tecnológica

| Camada               | Tecnologia                                                                 |
| -------------------- | -------------------------------------------------------------------------- |
| **Framework**        | Next.js 16 (App Router + Turbopack)                                        |
| **Linguagem**        | TypeScript                                                                 |
| **Estilização**      | Tailwind CSS 4 + CSS Modules + `cn()` (utility)                           |
| **Componentes UI**   | shadcn/ui (Radix UI primitives + Tailwind)                                 |
| **Gerenciamento de estado** | Zustand (com persistência local)                                    |
| **Formulários**      | React Hook Form (via shadcn) + validação manual                           |
| **Autenticação**     | API Routes + cookies httpOnly + middleware de proteção                    |
| **Notificações**     | `sonner` (toasts modernos)                                                |
| **Ícones**           | Lucide React                                                              |
| **Rotas**            | Next.js App Router (client components)                                    |

---

## 📁 Estrutura de Diretórios (src/)
src/
├── app/ # Rotas e páginas da aplicação
│ ├── api/auth/ # Endpoints de autenticação (login, logout, me)
│ ├── dashboard/ # Página principal com métricas e pedidos recentes
│ ├── design-system/ # Documentação visual de componentes
│ ├── login/ # Página de autenticação
│ ├── novo-pedido/ # Formulário de criação (componentizado)
│ ├── pedidos/ # Listagem com CRUD completo
│ │ └── editar/[id]/ # Página de edição
│ └── layout.tsx # Layout raiz + Toaster (sonner)
├── components/ # Componentes reutilizáveis
│ ├── layout/ # Estrutura comum (TopAppBar, NavigationDrawer, etc.)
│ ├── login/ # Componentes específicos da tela de login
│ ├── dashboard/ # Cards e métricas
│ ├── pedidos/ # Tabela, filtros, paginação, cabeçalho
│ ├── ui/ # shadcn/ui components
│ └── TransitionLoader.tsx # Transição suave entre rotas
├── stores/ # Zustand stores (auth, orders)
├── types/ # TypeScript interfaces (DashboardOrder, PedidoOrder)
├── config/ # Configurações de status, tipos de ovo, etc.
├── data/ # Dados mockados (estáticos, usados como fallback)
├── lib/ # Utilitários (cn, helpers)
├── styles/ # Tailwind globals + custom classes
└── middleware.ts # Proteção de rotas privadas (cookie)

text

---

## 🧠 Arquitetura & Decisões Técnicas

### 1. Roteamento e Layout

- **App Router** do Next.js com componentes `"use client"` para interatividade.
- Layouts aninhados: raiz (`layout.tsx`) → cada rota tem seu próprio layout implícito.
- `AuthGuard` envolve as páginas protegidas (dashboard, pedidos, novo pedido).

### 2. Autenticação (Cookie httpOnly + Middleware)

- **API Route** `/api/auth/login` define um cookie `eggflow_session` com `httpOnly` e `secure` (em produção).
- O cookie tem `maxAge` configurável via checkbox "Manter conectado".
- **Middleware** verifica a existência do cookie em rotas privadas e redireciona para `/login` se ausente.
- **Logout** limpa o cookie e redireciona.

### 3. Estado Global (Zustand)

Duas stores principais:

- `authStore` – gerencia dados do usuário e token (quando necessário). Na prática, o cookie já contém a sessão, mas a store guarda informações do perfil para exibição na UI.
- `orderStore` – gerencia a lista de pedidos com **persistência local** (`localStorage`). Oferece funções `addOrder`, `updateOrder`, `deleteOrder`.

### 4. CRUD de Pedidos

- **Create** – formulário em `/novo-pedido` → valida campos → gera avatar e data formatada → chama `addOrder`.
- **Read** – página `/pedidos` consome a store, exibe tabela com paginação e filtro por nome.
- **Update** – página `/pedidos/editar/[id]` carrega pedido existente, permite edição e chama `updateOrder`.
- **Delete** – botão na tabela → confirmação → `deleteOrder`.

### 5. Componentização e Reuso

- **FormField** – componente genérico para campos com ícone à esquerda (reutilizado no formulário de novo pedido).
- **OrdersTable** – tabela separada que recebe `orders` como prop.
- **OrdersFilters** – barra de busca e botões de filtro (ainda mockados).
- **OrdersPagination** – componente funcional de paginação.
- **InventoryStatusCard** e **QuickHelp** – cards laterais independentes.

### 6. Estilização (Tailwind + Design System)

- Tokens de cores customizados seguindo o **"No-Line Rule"** (sem bordas 1px, apenas camadas tonais).
- Classes utilitárias: `.yolk-gradient`, `.glass-card`.
- Toda a interface respeita as cores definidas no arquivo `globals.css` (variáveis CSS).

### 7. Feedback e Transições

- **Sonner** para toasts (sucesso, erro, informação).
- **TransitionLoader** (componente opcional) para animação suave entre rotas.
- **TopAppBar** dinâmico: exibe data atual e saudação "Manhã/Tarde/Noite".

### 8. Persistência de Dados

- Os pedidos são armazenados no `localStorage` (via Zustand persist middleware). Isso permite recarregar a página sem perder os dados.
- A autenticação usa cookie httpOnly, que é mais seguro e não persiste no cliente (apenas o cookie é enviado automaticamente).

---

## 🔁 Fluxos Principais

### Login

1. Usuário acessa `/login`, preenche credenciais.
2. Submit → POST `/api/auth/login`.
3. API valida (mock: `gerente@eggflow.agri` / `123456`) → define cookie e retorna dados do usuário.
4. Cliente atualiza `authStore`, exibe toast de boas‑vindas e redireciona para `/dashboard`.

### Criar Pedido

1. Usuário clica em **Novo Pedido** (em qualquer lugar) → vai para `/novo-pedido`.
2. Preenche formulário → submit → chama `addOrder` da store.
3. Store atualiza estado e persiste no `localStorage`.
4. Toast de sucesso + redirecionamento para `/pedidos`.

### Listar/Editar/Excluir

1. `/pedidos` lê `orders` da store e exibe.
2. Clique em **Editar** → vai para `/pedidos/editar/[id]` → carrega dados e permite alteração.
3. Clique em **Excluir** → confirmação → `deleteOrder` → lista é atualizada.

---

## 🚀 Execução Local

```bash
npm install
npm run dev
Acesse http://localhost:3000/login.

📦 Build e Deploy
O projeto está pronto para deploy em qualquer plataforma que suporte Next.js (Vercel, Netlify, Docker, etc.).
Para build de produção:

bash
npm run build
npm start
🔮 Possíveis Melhorias Futuras
Integração com banco de dados real (PostgreSQL + Prisma).

Autenticação com JWT e refresh token.

Filtros avançados na listagem (tipo de ovo, status, data).

Gráficos reais no dashboard (Chart.js / Recharts).

Testes unitários e e2e (Jest + Cypress).

Internacionalização (i18n).

Upload de imagens para avatar do cliente.

👥 Contribuição
Projeto desenvolvido como case de arquitetura frontend moderna. Toda sugestão ou melhoria é bem‑vinda.

📄 Licença
MIT.

