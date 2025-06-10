<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
  <img src="https://vitejs.dev/logo.svg" width="100" alt="Vite Logo" />
</p>

<h1 align="center">NestJS + React (Vite) Fullstack Monorepo</h1>

<p align="center">
  Monorepo combinando <a href="https://nestjs.com/" target="_blank">NestJS</a> no backend com <a href="https://vitejs.dev/" target="_blank">Vite + React</a> no frontend para criar aplicações modernas e escaláveis.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

---

# 📋 Requisitos

- Node.js 18+
- NPM ou Yarn
- Git

---

## 📁 Estrutura do Projeto

```txt
monorepo/
├── farm-pivot-api/       # NestJS app
├── farm-pivot-front/     # React + Vite app
├── package.json          # Comandos globais
└── README.md             # Este arquivo
```
---

## ▶️ Execução do Projeto

Você pode executar o backend e o frontend de duas formas:

## ✅ Opção 1: Rodar Separadamente

### 🚀 Backend (NestJS)

Um framework Node.js progressivo para aplicações escaláveis do lado do servidor.

```bash
cd farm-pivot-api
npm install

# Dev mode
npm run start:dev

# Prod
npm run start:prod
```

### 💻 Frontend (React + Vite + TypeScript)
Template moderno com HMR, SWC ou Babel, e suporte à configuração avançada de ESLint.

```bash
cd farm-pivot-front
npm install

npm run dev
```

## 🔁 Opção 2: Rodar os dois juntos com um único comando
Na raiz do projeto, rode:
```bash
npm install       # Instala dependências da raiz (inclui concurrently)
npm run dev       # Inicia frontend + backend juntos
```

## 🛠️ Tecnologias Utilizadas
 - NestJS — Backend escalável com TypeScript

 - React + Vite — Frontend moderno com HMR e SWC

 - TypeScript — Tipagem estática em todo o projeto

 - Concurrently — Execução simultânea de frontend e backend

