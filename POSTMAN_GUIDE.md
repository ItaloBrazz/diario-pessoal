# Guia de Requisições - Postman

## Configuração Inicial

1. **Inicie o servidor NestJS:**
   ```bash
   npm run start:dev
   ```
   O servidor estará rodando em `http://localhost:3000` (ou na porta definida na variável `PORT`)

2. **No Postman:**
   - Abra o Postman
   - Crie uma nova Collection chamada "Diario Pessoal" (opcional)

---

## 1. Criar Usuário (POST)

### Configuração da Requisição

**Método:** `POST`  
**URL:** `http://localhost:3000/user/cadastro`

**Headers:**
- `Content-Type: application/json`

**Body (raw JSON):**
```json
{
  "email": "usuario@exemplo.com",
  "nome": "João Silva",
  "senha": "senha123"
} 
```

### Exemplo Completo:

1. Selecione o método **POST**
2. Digite a URL: `http://localhost:3000/user/cadastro`
3. Vá na aba **Headers** e adicione:
   - Key: `Content-Type`
   - Value: `application/json`
4. Vá na aba **Body**
5. Selecione **raw** e escolha **JSON** no dropdown
6. Cole o JSON acima (ou modifique os valores)
7. Clique em **Send**

### Resposta Esperada (Status 201):
```json
{
  "id": 1,
  "email": "usuario@exemplo.com",
  "nome": "João Silva"
}
```
*Note: A senha não será retornada na resposta (por segurança)*

### Validações:
- ✅ Email deve ser válido (formato email)
- ✅ Nome deve ter no mínimo 2 caracteres
- ✅ Senha deve ter no mínimo 6 caracteres
- ✅ Email deve ser único (não pode repetir)

### Exemplo de Erro (validação):
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "senha must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

---

## 2. Buscar Usuário por ID (GET)

### Configuração da Requisição

**Método:** `GET`  
**URL:** `http://localhost:3000/user/1`

*(Substitua `1` pelo ID do usuário que você quer buscar)*

### Exemplo Completo:

1. Selecione o método **GET**
2. Digite a URL: `http://localhost:3000/user/1`
3. Clique em **Send**

### Resposta Esperada (Status 200):
```json
{
  "id": 1,
  "email": "usuario@exemplo.com",
  "nome": "João Silva"
}
```

### Resposta se não encontrar (Status 200 com null):
```json
null
```

---

## Exemplos de Requisições para Testar

### Criar Primeiro Usuário:
```json
POST http://localhost:3000/user/cadastro
{
  "email": "maria@exemplo.com",
  "nome": "Maria Santos",
  "senha": "minhasenha123"
}
```

### Criar Segundo Usuário:
```json
POST http://localhost:3000/user/cadastro
{
  "email": "pedro@exemplo.com",
  "nome": "Pedro Oliveira",
  "senha": "senha456"
}
```

### Buscar Usuário Criado:
```
GET http://localhost:3000/user/1
GET http://localhost:3000/user/2
```

---

## Dicas Importantes

1. **Senha Hash:** A senha é automaticamente convertida em hash usando bcrypt antes de ser salva no banco
2. **ID Auto-incremento:** O ID é gerado automaticamente pelo banco de dados
3. **Validação:** O ValidationPipe valida automaticamente os dados antes de processar
4. **Porta:** Se você mudar a porta, ajuste a URL nas requisições

---

## Troubleshooting

### Erro: "Cannot POST /user/cadastro"
- Verifique se o servidor está rodando (`npm run start:dev`)
- Confirme que a porta está correta (padrão: 3000)
- Verifique se a rota está correta: `/user/cadastro`

### Erro: "Connection refused"
- Servidor não está rodando
- Verifique se a porta não está sendo usada por outro processo

### Erro de validação
- Verifique se o JSON está correto
- Confirme que todos os campos obrigatórios estão presentes
- Email deve ser válido e senha deve ter no mínimo 6 caracteres

