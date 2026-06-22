Atividade Tarefa
Condições de conclusão
Atividade Prática: API REST de Gerenciamento de Tarefas
Objetivo
Desenvolver uma API REST utilizando Node.js, Express e PostgreSQL para gerenciamento de tarefas.

O principal objetivo da atividade é implementar um sistema de autenticação e autorização de usuários, garantindo que apenas usuários autenticados possam acessar e manipular suas próprias tarefas.

Requisitos Técnicos
Node.js
Express
PostgreSQL
Sequelize, Knex ou SQL puro (a critério do aluno)
API REST
Banco de dados relacional
Senhas armazenadas de forma segura utilizando hash
Funcionalidades
1. Cadastro de Usuários
Criar endpoint para cadastro de usuários contendo:

id
nome
email
senha
Regras:

O e-mail deve ser único.
A senha não pode ser armazenada em texto puro.
2. Login
Criar endpoint para autenticação de usuários.

Requisitos:

Validar e-mail e senha.
Após autenticação bem-sucedida, permitir acesso aos endpoints protegidos da aplicação.
O mecanismo de autenticação fica a critério do aluno.
3. Gerenciamento de Tarefas
Cada usuário poderá gerenciar apenas suas próprias tarefas.

A entidade Tarefa deve possuir os seguintes atributos:

Campo	Tipo
id	Inteiro
nome	Texto
status	Texto
data_criacao	Data/Hora
data_edicao	Data/Hora
Regras de Negócio
Criação da Tarefa
Ao criar uma nova tarefa:

O campo status deve ser definido automaticamente como:
 
CRIADO
 
O usuário não poderá informar outro status durante a criação.
Fluxo de Status
Os status permitidos são:

 
CRIADO
EM_DESENVOLVIMENTO
CONCLUIDO
 
As transições devem seguir obrigatoriamente o fluxo:

 
CRIADO
   ↓
EM_DESENVOLVIMENTO
   ↓
CONCLUIDO
 
Regras:

Uma tarefa só pode mudar para EM_DESENVOLVIMENTO se estiver em CRIADO.
Uma tarefa só pode mudar para CONCLUIDO se estiver em EM_DESENVOLVIMENTO.
Não é permitido voltar para um status anterior.
Não é permitido pular etapas.
Após atingir CONCLUIDO, a tarefa não pode mais ter seu status alterado.
Endpoints Mínimos
Usuários
Método	Endpoint	Descrição
POST	/usuarios	Cadastro de usuário
POST	/login	Autenticação
Tarefas
Método	Endpoint	Descrição
POST	/tarefas	Criar tarefa
GET	/tarefas	Listar tarefas do usuário
GET	/tarefas/:id	Buscar tarefa específica
PUT	/tarefas/:id	Atualizar nome da tarefa
PATCH	/tarefas/:id/status	Alterar status
DELETE	/tarefas/:id	Remover tarefa
Restrições
Usuários não podem acessar tarefas de outros usuários.
Todos os endpoints de tarefas devem exigir autenticação.
O sistema deve validar entradas inválidas e retornar códigos HTTP adequados.
Datas de criação e edição devem ser controladas pela aplicação.
Entregáveis
O aluno deverá entregar:

Código-fonte da aplicação.
Script SQL ou migrations para criação do banco de dados.
Coleção do Postman ou arquivo equivalente para testes.
README contendo:
Instruções de instalação.
Configuração do banco de dados.
Como executar o projeto.
Descrição dos endpoints implementados.
Critérios de Avaliação
Critério	Peso
Estrutura da API REST	20%
Autenticação e autorização	30%
Persistência em PostgreSQL	20%
Implementação das regras de negócio	20%
Organização e documentação do código	10%
Observação: A implementação deve seguir boas práticas de desenvolvimento, incluindo separação de responsabilidades, tratamento de erros e validação de dados recebidos pela API.