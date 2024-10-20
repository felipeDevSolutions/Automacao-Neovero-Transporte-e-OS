var equipamentos = [];

function carregarEquipamentosDoLocalStorage() {
    var equipamentosSalvos = localStorage.getItem('equipamentos');
    var setorSelecionado = localStorage.getItem('setorSelecionado');

    if (equipamentosSalvos) {
        equipamentos = JSON.parse(equipamentosSalvos);
        atualizarTabela(); 
    }

    if (setorSelecionado) {
        document.getElementById("setor").value = setorSelecionado; // Define o valor do setor
    }
}

carregarEquipamentosDoLocalStorage();

function adicionarEquipamento() {
    var idec = document.getElementById("idec").value;
    var nSerie = document.getElementById("nSerie").value;
    var patrimonio = document.getElementById("patrimonio").value;
    var setor = document.getElementById("setor").value;

    if (idec === "" && nSerie === "" && patrimonio === "") {
        alert("Preencha pelo menos um dos campos: Idec, N Série ou Patrimônio.");
        return;
    }

    // Adiciona os dados ao array, mantendo os zeros à esquerda
    equipamentos.push({ 
        idec: idec, 
        nSerie: nSerie.toString(), // Converte para string para manter os zeros
        patrimonio: patrimonio.toString(), // Converte para string para manter os zeros
        status: "Pendente", 
        setor: setor 
    });

    // Salva os dados no LocalStorage
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos)); 
    localStorage.setItem('setorSelecionado', document.getElementById("setor").value); // Salva o setor
    
    atualizarTabela();
    document.getElementById("idec").value = "";
    document.getElementById("nSerie").value = "";
    document.getElementById("patrimonio").value = "";

    // Inicia a animação se necessário
    if (!verificarTodosStatusDiferentesPendente()) {
        iniciarAnimacaoTransportar();
    }
}


function deletarEquipamento(index) {
    equipamentos.splice(index, 1);

    // Atualiza os dados no LocalStorage
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
    
    atualizarTabela();
}

function alterarStatus(index) {
    equipamentos[index].status = "OK";

    // Atualiza os dados no LocalStorage
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
    
    atualizarTabela();

    // Verifica se todos os status são diferentes de Pendente e encerra a animação se necessário
    if (verificarTodosStatusDiferentesPendente()) {
        encerrarAnimacaoTransportar();
    }
}

function alterarStatusErro(index) {
    equipamentos[index].status = "Erro";

    // Atualiza os dados no LocalStorage
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
    
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





function atualizarTabela() {
    var tabela = document.getElementById("tabelaEquipamentos");

    // Verifica se é a versão mobile ou web
    if (window.innerWidth <= 834) {
        // Versão mobile
        tabela.innerHTML = "<thead><tr><th>Idec</th><th>N Série</th><th>Patrimônio</th><th>Status</th><th>Setor</th><th>Opções</th></tr></thead>";
        tabela.innerHTML += "<tbody>";
        for (var i = 0; i < equipamentos.length; i++) {
            var equipamento = equipamentos[i];
            var linha = "<tr>";
            linha += "<td>" + equipamento.idec + "</td>";
            linha += "<td>" + equipamento.nSerie + "</td>";
            linha += "<td>" + equipamento.patrimonio + "</td>";
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
        tabela.innerHTML = "<tr><th>Idec</th><th>N Série</th><th>Patrimônio</th><th>Status</th><th>Setor</th><th>Ok</th><th>Erro</th><th>Deletar</th></tr>";
        for (var i = 0; i < equipamentos.length; i++) {
            var equipamento = equipamentos[i];
            var linhaWeb = "<tr>";
            linhaWeb += "<td>" + equipamento.idec + "</td>";
            linhaWeb += "<td>" + equipamento.nSerie + "</td>";
            linhaWeb += "<td>" + equipamento.patrimonio + "</td>";
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
