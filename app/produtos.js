
(function () { // envolver em IIFE para não poluir global (só expõe loadProdutos)
    // Carrinho local (persistido no localStorage)
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    //=================================================================

    // Função utilitária para atualizar contador no header (com bug)
    // function updateCartCount() {
    //     const el = document.getElementById('cart-count');
    //     if (el) el.textContent = carrinho.reduce((acc,it) => acc + (it.quantidade || 0), 0);
    // }

    //=================================================================

    // Função utilitária para atualizar contador no header 
    function updateCartCount() {
        const el = document.getElementById('cart-count');
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
        if (el) el.textContent = carrinhoAtual.reduce((acc, it) => acc + (it.quantidade || 0), 0);
    }

    function updateCartCount() {
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
        const el = document.getElementById('cart-count');
        if (el) el.textContent = carrinhoAtual.reduce((acc, it) => acc + (it.quantidade || 0), 0);
    }

    //==============================================================

    // Função para adicionar produto ao carrinho (com bug)
    // function adicionarCarrinho(id, nome, preco) {
    //     const idx = carrinho.findIndex(p => p.id === id);
    //     if (idx > -1) {
    //         carrinho[idx].quantidade = (carrinho[idx].quantidade || 1) + 1;
    //     } else {
    //         carrinho.push({ id, nome, preco, quantidade: 1 });
    //     }
    //     localStorage.setItem('carrinho', JSON.stringify(carrinho));
    //     updateCartCount();
    //     // Mensagem leve (remove/ajusta conforme preferires)
    //     if (window.showMessage) {
    //         showMessage(`${nome} adicionado ao carrinho.`, 'success');
    //     } else {
    //         console.log(`${nome} adicionado ao carrinho.`);
    //     }
    // }

    //==============================================================


    // Função para adicionar produto ao carrinho
    function adicionarCarrinho(id, nome, preco) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const idx = carrinho.findIndex(p => p.id === id);
        if (idx > -1) {
            carrinho[idx].quantidade = (carrinho[idx].quantidade || 1) + 1;
        } else {
            carrinho.push({ id, nome, preco, quantidade: 1 });
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        updateCartCount();
        // Mensagem leve (remove/ajusta conforme preferires)
        if (window.showMessage) {
            showMessage(`${nome} adicionado ao carrinho.`, 'success');
        } else {
            console.log(`${nome} adicionado ao carrinho.`);
        }
    }


    // Expor a função globalmente (para ser chamada por pages.js)
    window.adicionarCarrinho = adicionarCarrinho;

    // Função principal que carrega a vitrine
    async function loadProdutos() {
        // tenta usar contentArea global (se exists), senão pega pelo id 'content'
        const content = window.contentArea || document.getElementById('content') || document.querySelector('main#content');
        if (!content) {
            console.error('Elemento #content não encontrado — verifique o HTML.');
            return;
        }

        // HTML inicial de loading
        content.innerHTML = '<h2>Carregando Produtos...</h2>';

        try {
            // -- FUTURO: buscar do backend com fetchAPI('/produtos') --
            // Exemplo:
            // const res = await fetchAPI('/produtos');
            // const produtos = await res.json();

            //===================================
            const res = await fetch("http://localhost:8000/api/produtos", {
            // const res = await fetch("https://synchrogest-app.onrender.com/api/produtos", {
            //===================================
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const produtos = await res.json();


            // Placeholder / demo de produtos (substituir depois pelos dados reais do backend)
            // const produtos = [
            //     { id: 13, nome: 'Ração Premium para Cães', descricao: 'Alimento completo e balanceado para cães adultos.', preco: 69.90, imagem_url: '/assets/images/produtos/racao.png' },
            //     { id: 14, nome: 'Arranhador de Gatos Luxo', descricao: 'Com torre e esconderijo. Gatos adoram!', preco: 99.50, imagem_url: '/assets/images/produtos/arranhador.png' },
            //     { id: 15, nome: 'Brinquedo Bola de Corda', descricao: 'Ideal para cães que gostam de morder e puxar.', preco: 19.99, imagem_url: '/assets/images/produtos/bola-corda.png' },
            //     { id: 16, nome: 'Cama para Pets', descricao: 'Conforto e qualidade para seu pet.', preco: 108.00, imagem_url: '/assets/images/produtos/cama.png' },
            //     { id: 17, nome: 'Roupa para Gatos', descricao: 'Roupa Funny para Gatos.', preco: 15.99, imagem_url: '/assets/images/produtos/roupa-gato.png' },
            //     { id: 18, nome: 'Petisco para Cães', descricao: 'Saborosos petiscos para cães.', preco: 13.00, imagem_url: '/assets/images/produtos/petisco.png' }
            // ];

            // Monta HTML
            let html = '<h2>Nossos Produtos</h2>';
            html += '<div class="produtos-grid">';

            produtos.forEach(p => {
                const img = p.imagem_url || '/assets/images/produtos/default.png';
                // proteger apóstrofos no nome ao injetar no onclick
                const safeNome = p.nome.replace(/'/g, "\\'");
                html += `
                    <div class="produto-card">
                        <img class="produto-img" src="${img}" alt="${p.nome}">
                        <div class="produto-card-content">
                            <h3 class="produto-nome">${p.nome}</h3>
                            <p class="produto-desc">${p.descricao || ''}</p>
                            <div class="produto-bottom">
                                <span class="price">R$ ${Number(p.preco_venda).toFixed(2).replace('.', ',')}</span>
                                <button class="btn btn-primary" onclick="adicionarCarrinho(${p.id}, '${safeNome}', ${Number(p.preco)})">
                                    <i class="fas fa-cart-plus"></i> Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += '</div>'; // produtos-grid
            content.innerHTML = html;

            // Atualizar contador (caso já tenha itens)
            updateCartCount();
        } catch (err) {
            console.error('Erro ao carregar produtos:', err);
            content.innerHTML = `<p style="color:crimson">Erro ao carregar produtos: ${err.message || err}</p>`;
        }
    }

    // Expor a função globalmente para o menu/pages.js
    window.loadProdutos = loadProdutos;

    // Se quiser carregar automaticamente ao carregar o script (opcional)
    // window.addEventListener('DOMContentLoaded', loadProdutos);
})();
