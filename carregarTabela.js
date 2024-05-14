function carregarTabela() {
    // Cria um input do tipo file para selecionar os arquivos XLSX
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.multiple = true; // Permite seleção de múltiplos arquivos
    
    // Contador para acompanhar o número de arquivos processados
    var arquivosProcessados = 0;
    
    // Adiciona um evento para capturar os arquivos selecionados
    input.onchange = function(event) {
        var files = event.target.files;
        
        // Itera sobre cada arquivo selecionado
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            
            // Cria um objeto FileReader para ler o conteúdo do arquivo
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = new Uint8Array(e.target.result);
                
                // Carrega o arquivo XLSX usando a biblioteca XLSX.js
                var workbook = XLSX.read(data, { type: 'array' });
                
                // Itera sobre cada planilha do arquivo XLSX
                workbook.SheetNames.forEach(function(sheetName) {
                    // Obtém a planilha atual
                    var sheet = workbook.Sheets[sheetName];
                    
                    // Converte os dados da planilha em um array de objetos JavaScript
                    var jsonData = XLSX.utils.sheet_to_json(sheet);
                    
                    // Adiciona os dados da planilha à lista de equipamentos
                    jsonData.forEach(function(row) {
                        equipamentos.push({
                            idec: row['Idec'] || "",
                            nSerie: row['N Série'] || "",
                            patrimonio: row['Patrimônio'] || "",
                            status: row['Status'] || "",
                            setor: row['Setor'] || ""
                        });
                    });
                });
                
                // Incrementa o contador de arquivos processados
                arquivosProcessados++;
                
                // Verifica se todos os arquivos foram processados antes de atualizar a tabela
                if (arquivosProcessados === files.length) {
                    atualizarTabela();
                }
            };
            
            // Lê o conteúdo do arquivo como um array buffer
            reader.readAsArrayBuffer(file);
        }
    };
    
    // Dispara o clique no input para abrir a janela de seleção de arquivo
    input.click();
}
