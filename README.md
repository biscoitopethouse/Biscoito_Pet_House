# Biscoito Pet House - MVP de E-commerce Estático

Este é um MVP (Produto Mínimo Viável) de um site de e-commerce estático para a "Biscoito Pet House", focado em produtos para pets.

O objetivo principal deste projeto é demonstrar a **interação de um frontend estático (HTML, CSS, JS) com um backend dinâmico (FastAPI/Python)**, utilizando o padrão de autenticação **JWT (JSON Web Tokens)**, conforme discutido na nossa conversa.

## Estrutura do Projeto

/js
│
├── app.js          ← Inicialização global e controle principal
├── utils.js        ← Funções auxiliares (fetch, mensagens, autenticação)
├── login.js        ← Login e cadastro de usuários
├── produtos.js     ← Listagem e adição de produtos
├── carrinho.js     ← Carrinho de compras com controle de quantidades
└── pages.js        ← Renderização das páginas (home, navegação, etc.)


- `index.html`: A estrutura principal do site, incluindo navegação e a área de conteúdo dinâmico.
- `style.css`: Estilos CSS otimizados para um visual profissional, moderno e responsivo.
- `app.js`: A lógica principal em JavaScript puro, responsável por:
    - Carregar o conteúdo dinâmico das páginas (Home, Produtos, Carrinho, Login).
    - Gerenciar o estado de autenticação (Login/Logout) e o token JWT.
    - Simular a comunicação com o backend FastAPI (endpoints `/login` e `/produtos`).
    - Gerenciar o carrinho de compras (adicionar, remover, finalizar compra - simulação).

## Como Funciona a Interação com o Backend

O arquivo `app.js` contém a variável:

```javascript
const API_BASE_URL = 'https://seu-backend.onrender.com'; // SUBSTITUA PELA SUA URL REAL!
```

**Para que o site funcione corretamente com o seu projeto FastAPI, você deve:**

1. **Substituir** a URL `https://seu-backend.onrender.com` pela URL pública do seu backend hospedado no Render.
2. **Garantir que o CORS** (Cross-Origin Resource Sharing) esteja configurado corretamente no seu backend FastAPI para permitir requisições vindas do domínio onde este site estático será hospedado (ex: GitHub Pages ou outro serviço).
3. **Implementar os Endpoints** necessários no seu FastAPI:
    - `/login` (POST): Recebe credenciais e retorna o token JWT (`access_token`).
    - `/produtos` (GET): Retorna a lista de produtos.
    - `/compras` (POST): (Opcional, para finalizar a compra real) Recebe os itens do carrinho e o token JWT.

## Visualização

Por ser um site estático, você pode abri-lo diretamente no seu navegador, a partir do arquivo `index.html`.

**Nota:** A lista de produtos e a finalização da compra são atualmente **simuladas** no `app.js` para permitir a visualização do layout e da lógica de interação, mesmo sem o backend configurado. A lógica de autenticação está pronta para usar o token JWT assim que o endpoint `/login` do seu FastAPI estiver ativo.

## Próximos Passos Sugeridos

- **Design Responsivo:** Refinar o CSS para melhor adaptação em dispositivos móveis.
- **Busca de Produtos:** Adicionar um campo de busca e filtros na página de Produtos.
- **Página de Detalhes:** Criar uma página para visualização detalhada de cada produto.
- **Integração Real:** Conectar o `app.js` com os endpoints reais do seu FastAPI.

