// Exemplo de array para cada categoria de dados
let funcionarios = [];
let fornecedores = [];
let clientes = [];
let estoque = [];

// Variáveis para controle de vendas
let quantidadeVendida = 0;
let totalVendas = 0.00;

// Funções para adicionar dados às tabelas
function addFuncionario() {
    let nome = prompt("Digite o nome do funcionário:");
    let posicao = prompt("Digite a posição do funcionário:");
    let dataContratacao = prompt("Digite a data de contratação:");
    let diasTrabalhados = parseInt(prompt("Digite o número de dias trabalhados:"));

    funcionarios.push({ nome, posicao, dataContratacao, diasTrabalhados });
    atualizarTabela('funcionarios', funcionarios);
}

function addFornecedor() {
    let nome = prompt("Digite o nome do fornecedor:");
    let produto = prompt("Digite o produto fornecido:");
    let contato = prompt("Digite o contato do fornecedor:");

    fornecedores.push({ nome, produto, contato });
    atualizarTabela('fornecedores', fornecedores);
}

function addCliente() {
    let nome = prompt("Digite o nome do cliente:");
    let compra = prompt("Digite o produto comprado:");
    let data = prompt("Digite a data da compra:");

    clientes.push({ nome, compra, data });
    atualizarTabela('clientes', clientes);
}

function addProduto() {
    let categoria = prompt("Digite a categoria do produto:");
    let produto = prompt("Digite o nome do produto:");
    let preco = parseFloat(prompt("Digite o preço do produto (R$):"));
    let quantidade = parseInt(prompt("Digite a quantidade do produto:"));
    
    let subtotal = (preco * quantidade).toFixed(2); // Calcula o subtotal
    estoque.push({ categoria, produto, preco: preco.toFixed(2), quantidade, subtotal, vendidos: 0, totalDinheiro: 0.00 });
    atualizarTabela('estoque', estoque);
}

function fecharCaixa() {
    let vendas = prompt("Digite a quantidade vendida e o valor total (exemplo: 5 150.00):").split(' ');
    let quantidade = parseInt(vendas[0]);
    let total = parseFloat(vendas[1]);

    quantidadeVendida += quantidade; // Atualiza a quantidade vendida total
    totalVendas += total; // Atualiza o total de vendas

    // Atualiza a tabela de fechamento do caixa
    document.getElementById('quantidade-vendida').innerText = quantidadeVendida;
    document.getElementById('total-vendas').innerText = totalVendas.toFixed(2);

    // Atualiza a tabela de estoque para refletir os produtos vendidos
    let produtoNome = prompt("Digite o nome do produto vendido:");
    let produto = estoque.find(item => item.produto === produtoNome);
    
    if (produto) {
        if (quantidade <= produto.quantidade) { // Verifica se há estoque suficiente
            produto.vendidos += quantidade;
            produto.totalDinheiro += total;
            produto.quantidade -= quantidade; // Atualiza a quantidade em estoque
            atualizarTabela('estoque', estoque);
        } else {
            alert("Quantidade vendida maior do que a disponível em estoque.");
        }
    } else {
        alert("Produto não encontrado no estoque.");
    }
}

// Função para atualizar as tabelas
function atualizarTabela(tabelaId, dados) {
    let tabela = document.getElementById(tabelaId);
    let linhas = "";

    dados.forEach(item => {
        let linha = "<tr>";
        for (let key in item) {
            linha += `<td>${item[key]}</td>`;
        }
        linha += "</tr>";
        linhas += linha;
    });

    // Limpa as linhas antigas e insere as novas
    tabela.innerHTML = `
        <tr>
            ${Object.keys(dados[0]).map(key => `<th>${key}</th>`).join('')}
        </tr>
    ` + linhas;
}