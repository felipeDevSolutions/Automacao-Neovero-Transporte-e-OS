document.getElementById("os-btn").addEventListener("click", function() {
    // Verifica se há linhas na tabela
    if (document.getElementById("tabelaEquipamentos").rows.length <= 1) {
        alert("Por favor, insira pelo menos um equipamento na tabela antes de abrir a OS Corretiva.");
        return;
    }
    
    var btn = this; // Captura o botão atual
    var iconeHTML = btn.innerHTML; // Armazena o HTML do ícone

    // Verifica se o botão está atualmente em estado de abertura de OS
    var abrindoOS = btn.innerText === "Abrindo OS Corretiva";

    if (!abrindoOS) {
        // Altera o texto do botão para "Abrindo OS Corretiva" se não estiver atualmente abrindo OS
        btn.innerHTML = "<i class='fas fa-cogs'></i> Abrindo OS Corretiva";

        // Adiciona a classe de animação ao botão
        this.classList.toggle("animacao-transporte");

        // Aqui você pode adicionar qualquer lógica relacionada ao processo de abertura de OS

        // Por exemplo, você pode mostrar uma mensagem de sucesso após um determinado tempo
        var intervalId = setInterval(function() {
            // Verifica se todos os status são diferentes de Pendente
            if (verificarTodosStatusDiferentesPendente()) {
                // Remove a classe de animação
                btn.classList.remove("animacao-transporte");

                // Restaura o texto e o ícone original
                btn.innerHTML = iconeHTML;

                // Encerra o intervalo
                clearInterval(intervalId);

                // Mostra mensagem de sucesso
                alert("OS Corretiva aberta com sucesso!");
            }
        }, 1000); // Verifica a cada segundo
    }
});
