/**
 * DR. GUSTAVO RIBEIRO — receptor de leads das LPs de cidadania
 * → Google Sheets (planilha DO CLIENTE) + Meta CAPI (Pixel DO CLIENTE)
 *
 * Publicar (uma vez, NA CONTA GOOGLE DO ADVOGADO — ver docs/SETUP-CLIENTE.md):
 *  1. Planilha em sheets.new → Extensões → Apps Script → cole ESTE arquivo → salvar
 *  2. Implantar → Nova implantação → App da Web · Executar como: EU · Acesso: QUALQUER PESSOA
 *  3. Copie a URL /exec e cole em FORM_ENDPOINT (src/components/FormLead.tsx)
 *  Atualizou o código depois? Implantar → Gerenciar implantações → ✏️ → Versão: NOVA → Implantar.
 *
 * ── CAPI (Conversions API) ──
 * A LP é estática (sem servidor), então o CAPI sai DAQUI. O mesmo event_id do
 * Pixel (navegador) chega no payload e é reenviado ao Meta → dedup.
 * Propriedades do script (⚙ Configurações do projeto → Propriedades do script):
 *   META_PIXEL_ID   = ID do pixel do ADVOGADO (só números)
 *   META_CAPI_TOKEN = token da Conversions API (Events Manager → Configurações)
 *   META_TEST_CODE  = (opcional/TEMPORÁRIO) TESTxxxx pra validar em "Eventos de
 *                     teste". REMOVER pra os eventos irem à produção.
 *
 * ⚠️ PEGADINHA CONHECIDA: UrlFetchApp exige a permissão `script.external_request`,
 * que NÃO é concedida na autorização inicial (só Sheets). Sintoma: CAPI falha
 * calado. FIX (uma vez): rode a função `autorizar` abaixo pelo editor
 * (▶ Executar) e APROVE "Conectar-se a um serviço externo".
 */

var ABA = "Leads";
var CABECALHO = [
  "Data/Hora", "Nome", "WhatsApp", "Cidadania", "Urgência",
  "Resultado do teste", "Respostas do teste",
  "Origem", "Página",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term"
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var dados = JSON.parse((e.postData && e.postData.contents) || "{}");
    if (!dados.nome || !dados.whatsapp) {
      return resposta({ ok: false, erro: "nome e whatsapp são obrigatórios" });
    }

    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
    if (aba.getLastRow() === 0) { aba.appendRow(CABECALHO); aba.setFrozenRows(1); }
    aba.appendRow([
      Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss"),
      t(dados.nome, 120), t(dados.whatsapp, 40),
      t(dados.cidadania, 30), t(dados.urgencia, 40),
      t(dados.quiz_resultado_titulo || dados.quiz_resultado, 80),
      t(dados.quiz_respostas, 400),
      t(dados.origem, 60), t(dados.pagina, 200),
      t(dados.utm_source, 80), t(dados.utm_medium, 80), t(dados.utm_campaign, 120),
      t(dados.utm_content, 120), t(dados.utm_term, 120)
    ]);

    // CAPI best-effort: se falhar, o lead JÁ está salvo e o ok continua ok
    try { enviarCapi(dados); } catch (err) { console.error("CAPI falhou: " + err); }

    return resposta({ ok: true });
  } catch (erro) {
    return resposta({ ok: false, erro: String(erro) });
  } finally {
    lock.releaseLock();
  }
}

/** Envia o evento Lead pela Conversions API do Meta (server-side). */
function enviarCapi(dados) {
  var p = PropertiesService.getScriptProperties();
  var pixelId = p.getProperty("META_PIXEL_ID"), token = p.getProperty("META_CAPI_TOKEN");
  if (!pixelId || !token) return;

  var ud = { ph: [sha256Hex(normTel(dados.whatsapp))], client_user_agent: String(dados.user_agent || "") };
  if (dados.fbp) ud.fbp = String(dados.fbp);
  if (dados.fbc) ud.fbc = String(dados.fbc);

  var corpo = { data: [{
    event_name: "Lead", event_time: Math.floor(Date.now() / 1000), action_source: "website",
    event_id: String(dados.event_id || ""), event_source_url: String(dados.event_source_url || dados.pagina || ""),
    user_data: ud,
    custom_data: {
      content_name: "cidadania-" + String(dados.cidadania || ""),
      content_category: String(dados.quiz_resultado || "")
    }
  }] };
  var tc = p.getProperty("META_TEST_CODE");
  if (tc) corpo.test_event_code = tc;

  var url = "https://graph.facebook.com/v21.0/" + encodeURIComponent(pixelId) + "/events?access_token=" + encodeURIComponent(token);
  var r = UrlFetchApp.fetch(url, { method: "post", contentType: "application/json", payload: JSON.stringify(corpo), muteHttpExceptions: true });
  if (r.getResponseCode() >= 300) console.error("CAPI HTTP " + r.getResponseCode() + ": " + r.getContentText());
}

/** Rode UMA vez pelo editor (▶ Executar) pra conceder a permissão de chamada externa. */
function autorizar() {
  UrlFetchApp.fetch("https://graph.facebook.com/v21.0/");
}

function normTel(raw) { var d = String(raw == null ? "" : raw).replace(/\D/g, ""); if (d.length === 10 || d.length === 11) d = "55" + d; return d; }
function sha256Hex(s) { if (!s) return ""; return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8).map(function (b) { var v = (b < 0 ? b + 256 : b).toString(16); return v.length < 2 ? "0" + v : v; }).join(""); }
function t(v, m) { return String(v == null ? "" : v).slice(0, m); }
function resposta(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
