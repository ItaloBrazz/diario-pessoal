<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">API REST para gerenciamento de usuários de um diário pessoal, desenvolvida com <a href="http://nodejs.org" target="_blank">Node.js</a> e <a href="http://nestjs.com" target="_blank">NestJS</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## 📖 Sobre o Projeto

API REST desenvolvida com NestJS para gerenciamento de usuários de um diário pessoal. A aplicação oferece funcionalidades de cadastro e consulta de usuários com segurança através de hash de senhas e validação de dados.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js progressivo
- **TypeORM** - ORM para banco de dados
- **MySQL** - Sistema de gerenciamento de banco de dados
- **bcrypt** - Biblioteca para hash de senhas
- **class-validator** - Validação de dados
- **TypeScript** - Superset do JavaScript com tipagem estática

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- MySQL instalado e rodando
- npm ou yarn

## ⚙️ Instalação

```bash
$ npm install
```

## 🔧 Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
MYSQL_DB_HOST=localhost
MYQSL_DB_PORT=3306
MYSQL_DB_USERNAME=seu_usuario
MYSQL_DB_PASSWORD=sua_senha
MYSQL_DB_DATABASE=nome_do_banco
PORT=3000
```

## 🏃 Executando a aplicação

```bash
# Modo desenvolvimento (com hot-reload)
$ npm run start:dev

# Modo produção
$ npm run start:prod

# Modo normal
$ npm run start
```

A aplicação estará disponível em `http://localhost:3000` (ou na porta definida na variável `PORT`).

## 📡 Endpoints da API

### Cadastrar Usuário
- **POST** `/user/cadastro`
- **Body:**
  ```json
  {
    "email": "usuario@exemplo.com",
    "nome": "João Silva",
    "senha": "senha123"
  }
  ```
- **Resposta (201):**
  ```json
  {
    "id": 1,
    "email": "usuario@exemplo.com",
    "nome": "João Silva"
  }
  ```

### Buscar Usuário por ID
- **GET** `/user/:id`
- **Resposta (200):**
  ```json
  {
    "id": 1,
    "email": "usuario@exemplo.com",
    "nome": "João Silva"
  }
  ```

## 🔒 Segurança

- ✅ Senhas são automaticamente convertidas em hash usando bcrypt antes de serem salvas
- ✅ A senha nunca é retornada nas respostas da API
- ✅ Validação automática de dados de entrada
- ✅ CORS habilitado para requisições cross-origin

## ✅ Validações

- **Email:** Deve ser um email válido e único
- **Nome:** Mínimo de 2 caracteres
- **Senha:** Mínimo de 6 caracteres

## 📚 Documentação

Para mais detalhes sobre como usar a API com exemplos práticos, consulte o arquivo [POSTMAN_GUIDE.md](./POSTMAN_GUIDE.md).

## 🧪 Testes

```bash
# Testes unitários
$ npm run test

# Testes e2e
$ npm run test:e2e

# Cobertura de testes
$ npm run test:cov
```

## 📝 Scripts Disponíveis

- `npm run build` - Compila o projeto TypeScript
- `npm run format` - Formata o código com Prettier
- `npm run start` - Inicia a aplicação
- `npm run start:dev` - Inicia em modo desenvolvimento (watch mode)
- `npm run start:debug` - Inicia em modo debug
- `npm run start:prod` - Inicia em modo produção
- `npm run lint` - Executa o linter e corrige problemas
