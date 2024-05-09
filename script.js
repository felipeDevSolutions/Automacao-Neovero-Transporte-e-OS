var equipamentos = [];

function adicionarEquipamento() {
    var codigo = document.getElementById("codigo").value;
    var setor = document.getElementById("setor").value;
    if (codigo === "") {
        alert("Por favor, informe o código do equipamento.");
        return;
    }
    // Verifica se o código já existe na lista de equipamentos
    for (var i = 0; i < equipamentos.length; i++) {
        if (equipamentos[i].codigo === codigo) {
            alert("Já existe um equipamento com este código.");
            return;
        }
    }
    equipamentos.push({ codigo: codigo, status: "Pendente", setor: setor });
    atualizarTabela();
    document.getElementById("codigo").value = "";

    // Inicia a animação se necessário
    if (!verificarTodosStatusDiferentesPendente()) {
        iniciarAnimacaoTransportar();
    }
}

function deletarEquipamento(index) {
    equipamentos.splice(index, 1);
    atualizarTabela();
}

function alterarStatus(index) {
    equipamentos[index].status = "OK";
    atualizarTabela();

    // Verifica se todos os status são diferentes de Pendente e encerra a animação se necessário
    if (verificarTodosStatusDiferentesPendente()) {
        encerrarAnimacaoTransportar();
    }
}

function alterarStatusErro(index) {
    equipamentos[index].status = "Erro";
    atualizarTabela();

    // Verifica se todos os status são diferentes de Pendente e encerra a animação se necessário
    if (verificarTodosStatusDiferentesPendente()) {
        encerrarAnimacaoTransportar();
    }
}

// Função para verificar se todos os status são diferentes de Pendente
function verificarTodosStatusDiferentesPendente() {
    for (var i = 0; i < equipamentos.length; i++) {
        if (equipamentos[i].status === "Pendente") {
            return false;
        }
    }
    return true;
}

// Verifica se está na versão mobile (largura de tela menor que 834px)
function isMobile() {
    return window.innerWidth < 834;
}

// Atualiza o placeholder do input de acordo com a versão mobile ou desktop
function atualizarPlaceholderInput() {
    var inputCodigo = document.getElementById("codigo");
    if (isMobile()) {
        inputCodigo.placeholder = "Código do Equipamento";
    } else {
        inputCodigo.placeholder = "";
    }
}

// Adiciona um ouvinte de evento para atualizar o placeholder quando a tela for redimensionada
window.addEventListener("resize", atualizarPlaceholderInput);

// Chama a função para definir o placeholder inicialmente
atualizarPlaceholderInput();



function atualizarTabela() {
    var tabela = document.getElementById("tabelaEquipamentos");
    
    // Verifica se é a versão mobile ou web
    if (window.innerWidth <= 834) {
        // Versão mobile
        tabela.innerHTML = "<thead><tr><th>Código</th><th>Status</th><th>Setor</th><th>Opções</th></tr></thead>";
        tabela.innerHTML += "<tbody>";
        for (var i = 0; i < equipamentos.length; i++) {
            var equipamento = equipamentos[i];
            var linha = "<tr>";
            linha += "<td>" + equipamento.codigo + "</td>";
            linha += "<td>" + equipamento.status + "</td>";
            linha += "<td>" + equipamento.setor + "</td>";
            linha += "<td class='btn-group'>";
            linha += "<button class='btn-ok' onclick='alterarStatus(" + i + ")'>OK</button>";
            linha += "<button class='btn-erro' onclick='alterarStatusErro(" + i + ")'>Erro</button>";
            linha += "<button class='btn-deletar' onclick='deletarEquipamento(" + i + ")'>Deletar</button>";
            linha += "</td>";
            linha += "</tr>";
            tabela.innerHTML += linha;
        }
        tabela.innerHTML += "</tbody>";

    } else {
        // Versão web
        tabela.innerHTML = "<tr><th>Código</th><th>Status</th><th>Setor</th><th>Ok</th><th>Erro</th><th>Deletar</th></tr>";
        for (var i = 0; i < equipamentos.length; i++) {
            var equipamento = equipamentos[i];
            var linhaWeb = "<tr>";
            linhaWeb += "<td>" + equipamento.codigo + "</td>";
            linhaWeb += "<td>" + equipamento.status + "</td>";
            linhaWeb += "<td>" + equipamento.setor + "</td>";
            linhaWeb += "<td><button class='btn-ok' onclick='alterarStatus(" + i + ")'>OK</button></td>";
            linhaWeb += "<td><button class='btn-erro' onclick='alterarStatusErro(" + i + ")'>Erro</button></td>";
            linhaWeb += "<td><button class='btn-deletar' onclick='deletarEquipamento(" + i + ")'>Deletar</button></td>";
            linhaWeb += "</tr>";
            tabela.innerHTML += linhaWeb;
        }
    }
}

function adicionarComEnter(event) {
    if (event.key === "Enter") {
        adicionarEquipamento();
    }
}

// Função para encerrar a animação do botão "Transportar"
function encerrarAnimacaoTransportar() {
    var btn = document.getElementById("transportar-btn");
    btn.innerHTML = "<i class='fas fa-exchange-alt'></i> Transportar";
    btn.classList.remove("animacao-transporte");
}
