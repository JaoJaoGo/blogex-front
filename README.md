# Blogex - Frontend

Frontend da aplicação Blogex, um sistema de blog com suporte a múltiplos autores, tags e editor de texto rico. Desenvolvido com React 19, Vite e integração com Laravel Sanctum para autenticação.

## Stack Tecnológica

- **React 19** - Biblioteca UI com hooks modernos
- **Vite 7** - Build tool com HMR rápido
- **React Router DOM 7** - Roteamento de SPA
- **TailwindCSS 3** - Framework CSS utilitário
- **Axios** - Cliente HTTP para API calls
- **TipTap 3** - Editor de texto rico (WYSIWYG)
- **Headless UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Framer Motion** - Animações
- **React Colorful** - Seletores de cor

## Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── admin/        # Componentes do painel admin
│   ├── animations/   # Componentes animados
│   ├── intro/        # Componentes de introdução
│   ├── layouts/      # Layouts da aplicação
│   ├── posts/        # Componentes relacionados a posts
│   ├── tags/         # Componentes de tags
│   └── ui/           # Componentes UI genéricos
├── context/          # Context API para estado global
│   ├── AuthContext.jsx
│   └── AuthorContext.jsx
├── hooks/            # Custom hooks reutilizáveis
│   ├── useAuth.js
│   ├── usePostForm.js
│   ├── usePosts.js
│   ├── usePublicTags.js
│   ├── useTagIcons.js
│   └── useTags.js
├── pages/            # Páginas da aplicação
│   ├── AdminTags.jsx
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   ├── EllenHome.jsx
│   ├── Intro.jsx
│   ├── JoaoHome.jsx
│   ├── Login.jsx
│   └── PostDetails.jsx
├── routes/           # Configuração de rotas
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── services/         # Serviços de API
│   ├── api.js
│   ├── authService.js
│   ├── postService.js
│   └── tagService.js
├── config/           # Configurações
├── styles/           # Estilos globais e temas
├── utils/            # Funções utilitárias
├── assets/           # Arquivos estáticos
├── App.jsx           # Componente principal
└── main.jsx          # Entry point
```

## Funcionalidades

- **Autenticação** com Laravel Sanctum (SPA authentication)
- **Gerenciamento de posts** com editor TipTap
- **Sistema de tags** com ícones customizáveis
- **Múltiplos autores** com contextos separados
- **Roteamento protegido** para áreas admin
- **Design responsivo** com TailwindCSS
- **Animações** com Framer Motion

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run lint     # Executa ESLint
npm run preview  # Preview do build de produção
```

## HTTPS Local (Vite)

Este projeto usa HTTPS local para compatibilidade com Laravel Sanctum (SPA authentication).

### Setup dos Certificados

```bash
mkcert -install
mkcert blogex.test
```

Mova os certificados gerados para a pasta `certs/`:
- `blogex.test-key.pem`
- `blogex.test.pem`

### Configuração de Host

Adicione ao seu arquivo `hosts` (Windows: `C:\Windows\System32\drivers\etc\hosts`):
```
127.0.0.1 blogex.test
```

## Variáveis de Ambiente

Configure as variáveis no arquivo `.env`:

```env
VITE_APP_URL=https://blogex.test
VITE_API_URL=https://blogex.test/api
```

## Configuração ESLint

O projeto usa ESLint com configuração moderna (flat config). As regras estão definidas em `eslint.config.js`.

## Desenvolvimento

1. Instale as dependências:
```bash
npm install
```

2. Configure os certificados HTTPS (veja acima)

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `https://blogex.test:5173`

## Integração com Backend

O frontend se comunica com o backend Laravel através da API configurada em `VITE_API_URL`. A autenticação é gerenciada via cookies e Laravel Sanctum.
