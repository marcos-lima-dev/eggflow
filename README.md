# 🥚 EggFlow

Sistema de gestão de pedidos para granjas, desenvolvido como laboratório de engenharia Frontend com foco em arquitetura, escalabilidade e experiência do usuário.

---

## 🚀 Visão Geral

O **EggFlow** é uma aplicação web construída com Next.js que simula um sistema real de gestão de pedidos (CRUD), com foco em boas práticas de desenvolvimento frontend moderno.

Mais do que um app funcional, o projeto foi pensado para:

- Demonstrar organização de código
- Aplicar conceitos de engenharia frontend
- Servir como base escalável para evolução

---

## 🧠 Problema

Pequenos produtores e granjas precisam organizar pedidos, clientes e entregas de forma simples, mas muitas soluções são:

- Complexas demais
- Pouco intuitivas
- Ou inexistentes

---

## 💡 Solução

O EggFlow propõe:

- Interface simples e objetiva
- Gestão visual de pedidos
- Estrutura preparada para crescimento

---

## 🧱 Stack Tecnológica

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS (v4)**
- **shadcn/ui**
- **Zustand (estado global)**
- **React Hook Form (formulários)**
- **Zod (validação)**

---

## 📁 Estrutura do Projeto


src/
app/
login/
dashboard/
pedidos/
novo-pedido/

components/
ui/ # Componentes base (shadcn)
egg-ui/ # Componentes do domínio
layout/ # Sidebar, Header

store/ # Estado global (Zustand)
services/ # Integrações/API
types/ # Tipagens
utils/ # Funções auxiliares


---

## 🎨 Design System — Egg UI

O projeto utiliza um design system próprio:

- Componentes reutilizáveis
- Tokens visuais consistentes
- Foco em clareza e legibilidade
- Layout baseado em espaçamento (clean UI)

---

## 🔐 Autenticação

Fluxo de autenticação inclui:

- Login com validação
- Persistência de sessão
- Proteção de rotas privadas
- Redirecionamento automático pós-login

---

## 🧭 Fluxo da Aplicação

```txt
Login → Dashboard → Pedidos → Novo Pedido
✨ Funcionalidades
🔐 Login de usuário
📊 Dashboard com visão geral
📦 Listagem de pedidos
➕ Criação de novos pedidos
🔎 Filtros e busca
📱 Layout responsivo
⚙️ Como rodar o projeto
# clonar repositório
git clone https://github.com/seu-usuario/eggflow.git

# entrar na pasta
cd eggflow

# instalar dependências
npm install

# rodar projeto
npm run dev

Acesse:

👉 http://localhost:3000

🧪 Status do Projeto

🚧 Em desenvolvimento

Próximas etapas:
 Integração com API real
 Testes automatizados
 Controle de permissões
 Deploy
🧠 Aprendizados

Este projeto explora:

Arquitetura frontend escalável
Componentização eficiente
Separação de responsabilidades
Experiência do usuário (UX)
🤝 Contribuição

Sugestões, melhorias e ideias são bem-vindas!

📌 Autor

Desenvolvido por Marcos de Sousa Lima 🚀