# API REST de Gerenciamento de Tarefas

Uma API REST desenvolvida com Node.js, Express e PostgreSQL para gerenciamento de tarefas com autenticação de usuários.

## Funcionalidades

- Cadastro de usuários com email único
- Sistema de autenticação com token
- CRUD completo de tarefas
- Validação de transições de status
- Isolamento de dados por usuário
- Proteção de rotas com middleware de autenticação
- Tratamento de erros
- Senhas hasheadas com SHA-256

## 📋 Pré-requisitos

- Node.js v14+
- PostgreSQL v12+
- npm ou yarn

## 🔧 Instalação

### 1. Clonar/Acessar o repositório
```bash
cd gerenciamentoTerefasFinal-3
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Edite o arquivo `.env` com suas credenciais do PostgreSQL:

```env
DB_ADAPTOR=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWD=senai
DB_DATABASE=gerenciamento_tarefas
NODE_ENV=development
PORT=3000
```

### 4. Criar banco de dados PostgreSQL
```sql
CREATE DATABASE gerenciamento_tarefas;
```

## 🚀 Como Executar

### Modo desenvolvimento
```bash
npm run dev
```

### Modo normal
```bash
npm start
```

O servidor roda em: http://localhost:3000

## 📚 Documentação da API

### Base URL
```
http://localhost:3000
```

### 1. Registrar Usuário

**Endpoint:** `POST /register`

**Request:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

### 2. Autenticar Usuário

**Endpoint:** `POST /authenticate`

**Request:**
```json
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Autenticado com sucesso",
  "token": "a1b2c3d4e5f6...",
  "timeLife": "2026-06-22T16:30:00.000Z",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

---

## Rotas Autenticadas

Todas as rotas abaixo precisam do header:
```
Authorization: <token_aqui>
```

### 3. Listar Tarefas do Usuário

**Endpoint:** `GET /auth/`

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "tarefas": [
    {
      "id": 1,
      "nome": "Implementar feature",
      "status": "em_desenvolvimento",
      "usuarioID": 1,
      "createdAt": "2026-06-22T12:00:00.000Z",
      "updatedAt": "2026-06-22T12:30:00.000Z"
    },
    {
      "id": 2,
      "nome": "Revisar código",
      "status": "criado",
      "usuarioID": 1,
      "createdAt": "2026-06-22T13:00:00.000Z",
      "updatedAt": "2026-06-22T13:00:00.000Z"
    }
  ]
}
```

### 4. Buscar Tarefa Específica

**Endpoint:** `GET /auth/tarefa/:id`

**Response (200):**
```json
{
  "success": true,
  "tarefa": {
    "id": 1,
    "nome": "Implementar feature",
    "status": "em_desenvolvimento",
    "usuarioID": 1,
    "createdAt": "2026-06-22T12:00:00.000Z",
    "updatedAt": "2026-06-22T12:30:00.000Z"
  }
}
```

### 5. Criar Tarefa

**Endpoint:** `POST /auth/tarefa`

**Request:**
```json
{
  "nome": "Implementar nova funcionalidade"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Tarefa criada com sucesso",
  "tarefa": {
    "id": 3,
    "nome": "Implementar nova funcionalidade",
    "status": "criado",
    "usuarioID": 1,
    "createdAt": "2026-06-22T14:00:00.000Z",
    "updatedAt": "2026-06-22T14:00:00.000Z"
  }
}
```

### 6. Atualizar Nome da Tarefa

**Endpoint:** `PUT /auth/tarefa/:id`

**Request:**
```json
{
  "nome": "Implementar feature (atualizado)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Tarefa atualizada com sucesso",
  "tarefa": {
    "id": 1,
    "nome": "Implementar feature (atualizado)",
    "status": "em_desenvolvimento",
    "usuarioID": 1,
    "createdAt": "2026-06-22T12:00:00.000Z",
    "updatedAt": "2026-06-22T14:05:00.000Z"
  }
}
```

### 7. Atualizar Status da Tarefa

**Endpoint:** `PATCH /auth/tarefa/:id/status`

**Request:**
```json
{
  "status": "em_desenvolvimento"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Status atualizado com sucesso",
  "tarefa": {
    "id": 1,
    "nome": "Implementar feature",
    "status": "em_desenvolvimento",
    "usuarioID": 1,
    "createdAt": "2026-06-22T12:00:00.000Z",
    "updatedAt": "2026-06-22T14:10:00.000Z"
  }
}
```

**Fluxo de Status Permitido:**
```
CRIADO → EM_DESENVOLVIMENTO → CONCLUIDO
```

### 8. Deletar Tarefa

**Endpoint:** `DELETE /auth/tarefa/:id`

**Response (200):**
```json
{
  "success": true,
  "message": "Tarefa deletada com sucesso"
}
```

---

## 🧪 Exemplos com curl

### Registrar
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@test.com","senha":"123456"}'
```

### Autenticar
```bash
curl -X POST http://localhost:3000/authenticate \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@test.com","senha":"123456"}'
```

### Criar Tarefa
```bash
curl -X POST http://localhost:3000/auth/tarefa \
  -H "Authorization: seu_token_aqui" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Fazer implementação"}'
```

### Listar Tarefas
```bash
curl -X GET http://localhost:3000/auth/ \
  -H "Authorization: seu_token_aqui"
```

### Atualizar Status
```bash
curl -X PATCH http://localhost:3000/auth/tarefa/1/status \
  -H "Authorization: seu_token_aqui" \
  -H "Content-Type: application/json" \
  -d '{"status":"em_desenvolvimento"}'
```

### Deletar Tarefa
```bash
curl -X DELETE http://localhost:3000/auth/tarefa/1 \
  -H "Authorization: seu_token_aqui"
```

---

## 📊 Estrutura de Banco de Dados

### Tabela: usuario
| Campo | Tipo | Restrições |
|-------|------|-----------|
| id | INT | PRIMARY KEY, AUTO INCREMENT |
| nome | VARCHAR(255) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| accessKey | VARCHAR(255) | NOT NULL |
| token | VARCHAR(255) | NULL |
| timeLife | TIMESTAMP | NULL |
| createdAt | TIMESTAMP | AUTO |
| updatedAt | TIMESTAMP | AUTO |

### Tabela: tarefa
| Campo | Tipo | Restrições |
|-------|------|-----------|
| id | INT | PRIMARY KEY, AUTO INCREMENT |
| nome | VARCHAR(255) | NOT NULL |
| status | ENUM | 'criado', 'em_desenvolvimento', 'concluido' |
| usuarioID | INT | FOREIGN KEY (usuario.id) |
| createdAt | TIMESTAMP | AUTO |
| updatedAt | TIMESTAMP | AUTO |

---

## 🔒 Segurança

- Senhas hasheadas com SHA-256
- Tokens únicos gerados por usuário
- Tokens expiram após 1 hora
- Validação de autenticação em todas as rotas protegidas
- Isolamento de dados por usuário
- Validação de entrada de dados

---

## 🚨 Códigos HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido/não fornecido |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

---

## 📝 Regras de Negócio

### Criação de Tarefa
- Tarefa sempre inicia com status `criado`
- Campo `nome` é obrigatório
- Apenas o usuário autenticado pode criar tarefas

### Fluxo de Status
1. `CRIADO` → `EM_DESENVOLVIMENTO` (obrigatório passar por aqui)
2. `EM_DESENVOLVIMENTO` → `CONCLUIDO` (obrigatório)
3. Não é permitido pular etapas
4. Não é permitido voltar para status anterior
5. Após `CONCLUIDO`, status não pode mais ser alterado

### Acesso a Dados
- Cada usuário vê apenas suas próprias tarefas
- Não é permitido acessar tarefas de outros usuários
- Sistema valida permissão ao deletar tarefa

---

## Problemas Comuns

Se receber erro "ECONNREFUSED" ao conectar com PostgreSQL:
- Verifique se PostgreSQL está rodando
- Verifique as credenciais no arquivo .env
- Verifique se o banco de dados foi criado

Se receber erro "Token inválido":
- Verifique se o token foi copiado corretamente
- Verifique se o token não expirou (tokens duram 1 hora)
- Tente fazer login novamente

Se receber erro "Email já cadastrado":
- O email já existe no banco
- Use outro email para registrar um novo usuário

---

## Estrutura do Projeto

```
gerenciamentoTerefasFinal-3/
├── src/
│   ├── config/
│   │   ├── database.js (Conexão com PostgreSQL)
│   │   └── routes.js (Definição de rotas)
│   ├── models/
│   │   ├── usuario.js (Modelo de usuário)
│   │   └── tarefa.js (Modelo de tarefa)
│   └── controllers/
│       ├── usuario_controller.js (Lógica de usuários)
│       └── auth/
│           └── tarefa_controller.js (Lógica de tarefas)
├── .env (Variáveis de ambiente)
├── .gitignore (Arquivos ignorados)
├── index.js (Arquivo principal)
├── package.json (Dependências)
└── README.md (Esta documentação)
```

---

## 👨‍💼 Autor

Desenvolvido para a SENAI - Curso de Desenvolvimento de Sistemas

---

## 📄 Licença

ISC
