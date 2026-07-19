# Setup dos ativos do cliente (Sheets, WhatsApp, Pixel/CAPI)

Princípio de arquitetura da Funnely: os ativos são DO CLIENTE. Planilha na
conta Google do advogado, Pixel na BM dele, CAPI com token dele. A Funnely
opera, o dado e o risco ficam isolados no cliente.

## 1. Planilha de leads + Apps Script (conta Google do Gustavo)

1. Logado na conta Google DO GUSTAVO, crie a planilha: sheets.new
   (nome sugerido: "Leads - Cidadania").
2. Extensões → Apps Script → apague o conteúdo e cole
   `apps-script/leads-cidadania.gs` inteiro → salvar.
3. Implantar → Nova implantação → tipo "App da Web":
   - Executar como: **EU** (a conta do Gustavo)
   - Quem pode acessar: **QUALQUER PESSOA**
   → Implantar → autorize com a conta dele → copie a URL que termina em `/exec`.
4. Cole a URL em `FORM_ENDPOINT` no `src/components/FormLead.tsx`, commit e
   redeploy.
5. **Teste**: envie um lead pelo site e confira a linha na aba "Leads".

⚠️ Atualizou o `.gs` depois? "Gerenciar implantações" → ✏️ → Versão: **NOVA**
→ Implantar. Sem nova versão, a URL continua servindo o código velho.

## 2. CAPI (depois que o Pixel existir)

1. No Apps Script: ⚙ Configurações do projeto → Propriedades do script:
   - `META_PIXEL_ID` = ID do pixel do Gustavo (só números)
   - `META_CAPI_TOKEN` = token gerado no Events Manager → Configurações →
     Conversions API → Gerar token
   - `META_TEST_CODE` = código TESTxxxx (só durante a validação)
2. **PEGADINHA CONHECIDA**: no editor do Apps Script, selecione a função
   `autorizar` e clique ▶ Executar UMA vez. Aprove "Conectar-se a um serviço
   externo". Sem isso o CAPI falha em silêncio (a permissão
   `script.external_request` não vem na autorização inicial, que só cobre
   Sheets).
3. Envie um lead de teste e confira em Events Manager → Eventos de teste
   (evento "Lead", com dedup navegador+servidor pelo mesmo event_id).
4. Funcionou? REMOVA `META_TEST_CODE` das propriedades.

## 3. Pixel no site

1. BM própria do Gustavo (business.facebook.com) → Events Manager → criar
   Pixel.
2. Preencha `META_PIXEL_ID` em `src/lib/analytics.ts` (público, pode ir no
   repo), commit e redeploy. GA4/Clarity são opcionais: mesmos campos.

## 4. WhatsApp

- Número de destino: `src/lib/marca.ts` → `whatsapp` (hoje 5519981351969).
- Quem atende: o próprio Gustavo, no horário que der. A copy do site promete
  exatamente isso e nada mais (sem SLA). Se um dia houver equipe, ajustar a
  copy do form e do sucesso.
- A mensagem chega pré-preenchida com o resultado do teste da pessoa, então o
  atendimento já começa com contexto.

## 5. Planilha: o que chega em cada lead

Data/Hora · Nome · WhatsApp · Cidadania (lituana/portuguesa/italiana) ·
Urgência (agora / 3 meses / pesquisando) · Resultado do teste · Respostas do
teste · Origem · Página · UTMs (source/medium/campaign/content/term).

Regra de leitura rápida pro Gustavo: urgência "agora" + resultado
administrativo = responder primeiro.
