# Guia de Execução - API Gerenciamento de Tarefas

## Pré-requisitos Instalados
- Node.js v14+
- PostgreSQL
- npm

---

## Passo 1: Configurar PostgreSQL

### 1.1 Abrir PostgreSQL
```bash
psql -U postgres
```

Digitar a senha quando solicitado.

### 1.2 Executar script SQL
Dentro do PostgreSQL:

```sql
\i database.sql
```

Se der erro de caminho, tente:
```sql
\i 'C:/Users/nicol/Documents/Workspace/SENAI/Desenvolvimento de Sistemas/Daniel/ProjetoTeste/gerenciamentoTerefasFinal-3/database.sql'
```

### 1.3 Verificar banco criado
```sql
\l                          -- Lista bancos
\c gerenciamento_tarefas    -- Conecta ao banco
\dt                         -- Lista tabelas
\d usuario                  -- Descreve tabela
\d tarefa                   -- Descreve tabela
```

### 1.4 Sair
```sql
\q
```

---

## Passo 2: Instalar Dependências

```bash
cd C:\Users\nicol\Documents\Workspace\SENAI\Desenvolvimento de Sistemas\Daniel\ProjetoTeste\gerenciamentoTerefasFinal-3

npm install
```

---

## Passo 3: Verificar .env

AbrPasso 3: Verificar .env

Abra o arquivo .env e confirme
DB_ADAPTOR=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWD=senai
DB_DATABASE=gerenciamento_tarefas
NODE_ENV=development
PORT=3000
```

---

## Passo 4: Iniciar o Servidor

Modo desenvolvimento:
```bash
npm run dev
```

Modo normal:
```bash
npm start
```

Saída esperada:
```
Server running on http://127.0.0.1:3000!
```

---

## Passo 5: Testar a API

Abra um novo terminal e teste:

### Verificar se API está online
```bash
curl http://localhost:3000
```

Resposta esperada:
```json
{
  "success": true,
  "message": "API de Gerenciamento de Tarefas",
  "version": "1.0.0"
}
```

### Registrar um usuário
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"João Silva\",\"email\":\"joao@test.com\",\"senha\":\"senha123\"}"
```

Resposta esperada:
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@test.com"
  }
}
```

### Fazer login
```bash
curl -X POST http://localhost:3000/authenticate \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"joao@test.com\",\"senha\":\"senha123\"}"
```

Resposta esperada:
```json
{
  "success": true,
  "message": "Autenticado com sucesso",
  "token": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "timeLife": "2026-06-22T16:30:00.000Z",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@test.com"
  }
}
```

Copie o token que foi retornado.

### Criar uma tarefa
```bash
curl -X POST http://localhost:3000/auth/tarefa \
  -H "Authorization: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Implementar feature\"}"
```

Resposta esperada:
```json
{
  "success": true,
  "message": "Tarefa criada com sucesso",
  "tarefa": {
    "id": 1,
    "nome": "Implementar feature",
    "status": "criado",
    "usuarioID": 1,
    "createdAt": "2026-06-22T14:00:00.000Z",
    "updatedAt": "2026-06-22T14:00:00.000Z"
  }
}
```

### Listar tarefas
```bash
curl -X GET http://localhost:3000/auth/ \
  -H "Authorization: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
```

### Atualizar status da tarefa
```bash
curl -X PATCH http://localhost:3000/auth/tarefa/1/status \
  -H "Authorization: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"em_desenvolvimento\"}"
```

---

## Passo 6: Usar Postman (Opcional)
Passo 6: Usar Postman (Opcional)

Se preferir usar interface gráfica:

1. Abra Postman
2. Clique em Import
3. Selecione o arquivo postman_collection.json
4. A coleção será importada com todos os endpoints

Para usar os tokens:
1. Faça login e copie o token
2. Vá para Variables no Postman
3. Cole o token na variável "token"
4. T
---

## Problemas Comuns

Erro "Cannot find module 'express'":
Execute npm install

Erro "ECONNREFUSED 127.0.0.1:5432":
PostgreSQL não está rodando. Inicie o serviço:
```bash
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start
```

Erro "Database gerenciamento_tarefas does not exist":
Execute o script SQL (database.sql) no PostgreSQL

Erro "Token inválido":
- Copie o token da resposta do login
- Cole corretamente no header Authorization
- Tokens expiram em 1 hora

Erro "Email já cadastrado":
Use um email diferente para registrar novo usuário

---

## Verificação Final

Se conseguir executar todos esses passos com sucesso:
- Banco de dados criado e conectado
- Servidor rodando na porta 3000
- Usuário registrado
- Verificação Final

Se conseguir executar todos esses passos com sucesso:
- Banco de dados criado e conectado
- Servidor rodando na porta 3000
- Usuário registrado
- Login funcionando
- Tarefa criada
- Status atualizado

A API está funcionando! 

Recursos úteis:
- README.md - Documentação da API
- postman_collection.json - Coleção para testar
- database.sql - Script SQL
- .env - Variáveis de ambiente
