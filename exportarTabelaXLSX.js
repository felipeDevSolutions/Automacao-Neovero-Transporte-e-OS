function exportarTabelaXLSX() {
    var tabela = document.getElementById("tabelaEquipamentos");
    var wb = XLSX.utils.table_to_book(tabela, {sheet: "Equipamentos"});
    XLSX.writeFile(wb, "equipamentos.xlsx");
}
