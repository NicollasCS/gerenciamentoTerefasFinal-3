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
DB_PASSWD=
DB_DATABASE=
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
- README.md - Documentação da API
- postman_collection.json - Coleção para testar
- database.sql - Script SQL
- .env - Variáveis de ambiente
