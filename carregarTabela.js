function carregarTabela() {
    // Cria um input do tipo file para selecionar os arquivos XLSX
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.multiple = true; // Permite seleção de múltiplos arquivos
    
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
                
                // Obtém a primeira planilha do arquivo XLSX
                var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                
                // Converte os dados da planilha em um array de objetos JavaScript
                var jsonData = XLSX.utils.sheet_to_json(firstSheet);
                
                // Adiciona os dados carregados à lista de equipamentos sem limpar os dados antigos
                jsonData.forEach(function(row) {
                    equipamentos.push({
                        codigo: row['Código'],
                        status: row['Status'],
                        setor: row['Setor']
                    });
                });
                
                // Atualiza a tabela com os novos dados
                atualizarTabela();
            };
            
            // Lê o conteúdo do arquivo como um array buffer
            reader.readAsArrayBuffer(file);
        }
    };
    
    // Dispara o clique no input para abrir a janela de seleção de arquivo
    input.click();
}
