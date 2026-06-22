-- Script SQL para criar o banco de dados e tabelas
-- Execute este script no PostgreSQL

-- Criar banco de dados
CREATE DATABASE gerenciamento_tarefas;

-- Conectar ao banco de dados
\c gerenciamento_tarefas;

-- Criar tabela de usuários
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    "accessKey" VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    "timeLife" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de tarefas
CREATE TABLE tarefa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'criado' CHECK (status IN ('criado', 'em_desenvolvimento', 'concluido')),
    "usuarioID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("usuarioID") REFERENCES usuario(id) ON DELETE CASCADE
);

-- Criar índices para melhor performance
CREATE INDEX idx_usuario_email ON usuario(email);
CREATE INDEX idx_tarefa_usuarioID ON tarefa("usuarioID");
CREATE INDEX idx_tarefa_status ON tarefa(status);

-- Exibir estrutura das tabelas
\dt

-- Descrever colunas (opcional)
\d usuario
\d tarefa
