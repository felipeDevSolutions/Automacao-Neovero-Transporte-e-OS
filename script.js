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

function atualizarTabela() {
    var tabela = document.getElementById("tabelaEquipamentos");
    tabela.innerHTML = "<tr><th>Código do Equipamento</th><th>Status</th><th>Setor</th><th>Ok</th><th>Erro</th><th>Deletar</th></tr>";
    for (var i = 0; i < equipamentos.length; i++) {
        var equipamento = equipamentos[i];
        tabela.innerHTML += "<tr><td>" + equipamento.codigo + "</td><td>" + equipamento.status + "</td><td>" + equipamento.setor + "</td><td><button class='btn-ok' onclick='alterarStatus(" + i + ")'>OK</button></td><td><button class='btn-erro' onclick='alterarStatusErro(" + i + ")'>Erro</button></td><td><button class='btn-deletar' onclick='deletarEquipamento(" + i + ")'>Deletar</button></td></tr>";
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