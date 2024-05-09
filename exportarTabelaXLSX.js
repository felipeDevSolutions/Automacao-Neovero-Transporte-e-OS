function exportarTabelaXLSX() {
    var nomeArquivo = "Smart Flow - ";
    var tabela = document.getElementById("tabelaEquipamentos");
    var wb = XLSX.utils.table_to_book(tabela, {sheet: "Equipamentos"});
    XLSX.writeFile(wb, nomeArquivo + ".xlsx", {sheet: nomeArquivo});
}


