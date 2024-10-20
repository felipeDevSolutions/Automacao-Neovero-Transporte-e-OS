function exportarTabelaXLSX() {
    var nomeArquivo = "Smart Inventário - ";
    var tabela = document.getElementById("tabelaEquipamentos");

    // Obter as células da tabela
    var cells = tabela.querySelectorAll("td");

    // Percorrer as células e converter as colunas "N Série" e "Patrimônio" para texto
    cells.forEach(function(cell) {
        if (cell.textContent.trim() === 'N Série' || cell.textContent.trim() === 'Patrimônio') {
            // Obter as células de dados da mesma coluna
            var columnCells = tabela.querySelectorAll(`td:nth-child(${cell.cellIndex + 1})`);

            // Converter os valores para texto para manter os zeros à esquerda
            columnCells.forEach(function(dataCell) {
                dataCell.textContent = dataCell.textContent.toString();
            });
        }
    });

    var wb = XLSX.utils.table_to_book(tabela, {sheet: "Equipamentos"});
    XLSX.writeFile(wb, nomeArquivo + ".xlsx", {sheet: nomeArquivo});
}


