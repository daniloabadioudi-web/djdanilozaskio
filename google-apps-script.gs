/**
 * GOOGLE APPS SCRIPT — Recebe os dados do formulário do site e grava
 * como uma nova linha na planilha do Google Sheets.
 *
 * COMO USAR: veja o passo a passo enviado junto com este arquivo.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Se a planilha ainda estiver vazia, cria o cabeçalho primeiro
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Data/Hora', 'Nome', 'Telefone', 'Tipo do Evento', 'Data do Evento', 'Local', 'Onde conheceu']);
  }

  sheet.appendRow([
    data.dataEnvio || new Date().toLocaleString('pt-BR'),
    data.nome || '',
    data.telefone || '',
    data.tipo || '',
    data.data || '',
    data.local || '',
    data.origem || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
