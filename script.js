var equipamentos = [];

function adicionarEquipamento() {
    var codigo = document.getElementById("codigo").value;
    var setor = document.getElementById("setor").value;
    if (codigo === "" || setor === "") {
        alert("Por favor, selecione um setor e informe o código do equipamento.");
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
}

function deletarEquipamento(index) {
    equipamentos.splice(index, 1);
    atualizarTabela();
}

function atualizarTabela() {
    var tabela = document.getElementById("tabelaEquipamentos");
    tabela.innerHTML = "<tr><th>Código do Equipamento</th><th>Status</th><th>Setor</th><th>Ação</th></tr>";
    for (var i = 0; i < equipamentos.length; i++) {
        var equipamento = equipamentos[i];
        tabela.innerHTML += "<tr><td>" + equipamento.codigo + "</td><td>" + equipamento.status + "</td><td>" + equipamento.setor + "</td><td><button onclick='deletarEquipamento(" + i + ")'>Deletar</button></td></tr>";
    }
}

function adicionarComEnter(event) {
    if (event.key === "Enter") {
        adicionarEquipamento();
    }
}