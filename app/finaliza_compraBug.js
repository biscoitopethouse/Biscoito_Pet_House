
async function finalizarCompra() {
    if (carrinho.length === 0) {
        showMessage("Seu carrinho está vazio.", "warning");
        return;
    }

    const cliente_id = localStorage.getItem("cliente_id");
    if (!cliente_id) {
        showMessage("Por favor, cadastre-se antes de finalizar a compra.", "warning");
        loadPage("cadastro_cliente");
        return;
    }
    
    const produtosSimulados = [
        { id: 1, nome: 'Ração Premium para Cães', preco: 89.90 },
        { id: 2, nome: 'Arranhador de Gatos Luxo', preco: 149.50 },
        { id: 3, nome: 'Brinquedo Bola de Corda', preco: 19.99 },
        { id: 4, nome: 'Cama Ortopédica', preco: 210.00 }
    ];
    
    const itens = carrinho.map(item => {
        const produto = produtosSimulados.find(p => p.id === item.id);
        return {
            produto_id: produto.id,
            nome: produto.nome,
            quantidade: item.quantidade,
            preco_unitario: produto.preco
        };
    });
    
    const valor_total = itens.reduce((acc, p) => acc + (p.preco_unitario * p.quantidade), 0);
    
    try {


        // const response = await fetch("https://synchrogest-app.onrender.com/api/compra_clientes", {
            const response = await fetch("http://localhost:8000", {
        
        
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cliente_id, itens, valor_total })
        });

        if (response.ok) {
            showMessage("Compra finalizada com sucesso! Obrigado por comprar conosco 💛", "success");
            carrinho = [];
            localStorage.removeItem("carrinho");
            loadCarrinho();
        } else {
            const data = await response.json();
            showMessage(`Erro ao finalizar compra: ${data.detail || 'Erro desconhecido'}`, "error");
        }
    } catch (error) {
        showMessage(`Falha na comunicação com o servidor: ${error.message}`, "error");
    }
}
