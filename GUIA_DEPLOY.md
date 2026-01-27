# Guia de Implantação (Deployment)

Este guia explica passo a passo como colocar seu projeto (Backend e Frontend) no ar gratuitamente.

## 1. Banco de Dados (MongoDB Atlas)

Como seu projeto usa MongoDB (`provider = "mongodb"` no `schema.prisma`), você precisa de um banco de dados MongoDB hospedado na nuvem. O MongoDB Atlas é a melhor opção gratuita.

1.  Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Crie um novo Cluster (selecione a opção **FREE** / Shared).
3.  Em "Database Access", crie um usuário e senha para o banco de dados. **Anote a senha!**
4.  Em "Network Access", adicione o endereço IP `0.0.0.0/0` (isso permite acesso de qualquer lugar, necessário para o Render/Vercel).
5.  Clique em "Connect" -> "Drivers" e copie a **Connection String**.
    *   Substitua `<password>` pela senha que você criou.
    *   Exemplo: `mongodb+srv://usuario:senha123@cluster0.abcde.mongodb.net/meubanco?retryWrites=true&w=majority`

## 2. Backend (Render ou Railway)

O Backend (`BackEnd1`) é uma aplicação Node.js com Prisma. Recomendamos o **Render** ou **Railway**.

### Opção A: Render (Recomendado)
1.  Crie uma conta no [Render](https://render.com/).
2.  Clique em "New +" -> "Web Service".
3.  Conecte seu repositório do GitHub onde está o código do backend.
4.  Preencha os campos:
    *   **Name**: Um nome para seu serviço (ex: `meu-backend`).
    *   **Runtime**: `Node`.
    *   **Build Command**: `npm install && npx prisma generate` (Isso instala as dependências e gera o cliente do Prisma).
    *   **Start Command**: `node server.js`.
5.  Desça até a seção "Environment Variables" e adicione:
    *   **Key**: `DATABASE_URL`
    *   **Value**: Sua Connection String do MongoDB (aquela do passo 1).
6.  Clique em "Create Web Service".
7.  Aguarde o deploy. Quando finalizar, copie a URL do serviço (ex: `https://meu-backend.onrender.com`).

## 3. Frontend (Vercel)

O Frontend (`dands-cadastro-usuarios`) é uma aplicação React/Vite. A **Vercel** é a melhor opção.

1.  Crie uma conta na [Vercel](https://vercel.com/).
2.  Instale a CLI da Vercel ou conecte seu GitHub. A forma mais fácil é conectar o GitHub.
    *   Suba o código da pasta `dands-cadastro-usuarios` para um repositório no GitHub.
3.  No painel da Vercel, clique em "Add New..." -> "Project".
4.  Importe o repositório do frontend.
5.  Nas configurações de "Build & Development Settings", o Vercel geralmente detecta Vite automaticamente:
    *   **Framework Preset**: Vite
    *   **Build Command**: `vite build` (ou `npm run build`)
    *   **Output Directory**: `dist`
6.  Na seção "Environment Variables", adicione:
    *   **Key**: `VITE_API_URL`
    *   **Value**: A URL do seu backend no Render (ex: `https://meu-backend.onrender.com` - **sem a barra no final**).
7.  Clique em "Deploy".

## Resumo das Variáveis de Ambiente

| Serviço | Variável | Valor |
| :--- | :--- | :--- |
| **Backend (Render)** | `DATABASE_URL` | Sua string de conexão do MongoDB Atlas |
| **Frontend (Vercel)** | `VITE_API_URL` | A URL do Backend (`https://...`) |

## Testando

1.  Acesse a URL gerada pela Vercel.
2.  Tente cadastrar um usuário. O frontend deve se comunicar com o backend no Render, que salvará os dados no MongoDB Atlas.
