# VALIDAÇÕES — checklist para levar ao Dr. Gustavo antes do go-live

Este arquivo é o contrato de verdade do site. NADA vai ao ar com pendência
BLOQUEADORA aberta. Cada item diz onde a afirmação aparece e o que o advogado
precisa confirmar. Pesquisa completa com fontes em `docs/pesquisa/`.

Legenda: [B] = bloqueador de go-live · [A] = alto (corrigir antes de tráfego
pago) · [M] = médio (conferir na primeira revisão)

## 1. Identidade e operação

- [B] **Número da OAB é placeholder.** `src/lib/marca.ts` está com
  "OAB/SP 000.000". Trocar pelo número e seccional reais e conferir se o
  registro está ativo no CNA. O footer, o topo e o JSON-LD herdam daqui.
- [B] **WhatsApp de destino**: confirmado na entrevista como +55 19 98135-1969
  (`src/lib/marca.ts`). Confirmar que é ESTE número que vai receber lead frio
  e que o Gustavo atende nele.
- [A] **Cidade**: assumimos Campinas, SP ("Campinhas" na entrevista foi lido
  como typo). Aparece no rodapé, JSON-LD e privacidade.
- [A] **Credencial usada na copy** (`src/components/Advogado.tsx`, bloco 2 do
  VSL): "conduz, hoje, todos os processos de cidadania de uma operação
  especializada em nacionalidade". É o que a entrevista sustenta. Validar a
  formulação com o Gustavo (a assessoria permite? contrato de parceria tem
  cláusula de sigilo/não-concorrência?).
- [A] **Número de casos**: NÃO usado em lugar nenhum (não confirmado).
  Se o Gustavo trouxer número real por país, atualizar VSL bloco 2 e a seção
  Advogado. Enquanto isso, a faixa "2 meses a 2 anos" é a única métrica usada
  (veio da entrevista).
- [M] Tom do VSL (professoral/direto/acolhedor) não foi definido: roteiros
  saíram com rubrica dupla. Decidir no dia da gravação.

## 2. Lituana (docs/pesquisa/lituana.md)

- [B] **"Filho, neto e bisneto podem restaurar"** (hero, quiz, FAQ, VSL):
  art. 2(7) da lei XI-1196. Confirmar leitura com o advogado.
- [B] **"Quem saiu antes de 11/03/1990 mantém a brasileira"** (hero, resultado
  restauracao-dupla, FAQ, VSL): art. 7(2)(3)(4) + 9(2), emenda XII-2473/2016.
  Confirmar, inclusive o caso deportado/exilado.
- [B] **Trava da ex-URSS** (resultado restauracao-analise): quem saiu após
  15/06/1940 para território soviético fica sem a exceção de dupla. Confirmar.
- [A] **Taxa €120 e exame em até 12 meses** (FAQ, método, VSL): migracija.lt
  em snapshot de dez/2025. Confirmar valor vigente + taxa consular de SP.
- [A] **Antepassado naturalizado brasileiro pré-1940 não desqualifica**
  (emenda XIV-925/2022): a letra da lei é favorável; prática decisória do
  Migration Department a confirmar.
- [M] Trineto: copy diz "sem direito próprio, rota pela família" (filhos
  nascidos APÓS a restauração do genitor adquirem no nascimento; menor de 14
  precisaria renunciar). Confirmar a orientação de planejamento familiar.

## 3. Portuguesa (docs/pesquisa/portuguesa.md)

- [B] **LO 1/2026 em vigor desde 19/05/2026 e o que ela mudou** (hero, FAQ,
  VSL): teste de língua E cultura pro neto (art. 1.º/3 c/ art. 6.º/1 c-h),
  fim dos sefarditas, biometria. Confirmar leitura.
- [B] **Bisneto em duas etapas continua válido** (resultado duas-etapas, FAQ,
  VSL): art. 1.º/1/c + art. 11.º (efeitos desde o nascimento). É a espinha da
  oferta pro bisneto: validar com atenção, inclusive prática registral.
- [B] **Avô naturalizado antes de 1981 perdia a nacionalidade** (quiz P2,
  resultado analise-perda, VSL): Lei 2098/1959. Confirmar enquadramento e a
  via de reaquisição (arts. 30/31).
- [A] **Regulamento do teste de cultura pendente (prazo ~16/08/2026)** (VSL,
  resultado atribuicao-neto): estado pode mudar a qualquer momento. Conferir
  NA SEMANA da gravação e do go-live.
- [A] **"Fila passa de 500 mil processos"** (hero, filtro, VSL): número de
  imprensa (Público/DN, mar-jun 2026), não estatística oficial. O advogado
  aceita usar? Alternativa conservadora: "centenas de milhares".
- [A] **Emolumentos €175/€250/grátis menor** (FAQ): tabela IRN. Confirmar.
- [M] Casamento/união: regra dos 3/6 anos + reconhecimento judicial de união
  de facto (quiz conjuge). Confirmar.

## 4. Italiana (docs/pesquisa/italiana.md)

- [B] **Critério vigente é cidadania EXCLUSIVA do genitor/avô** (quiz P3,
  resultado administrativa, VSL): art. 3-bis, letra c, da Lei 91/1992 (via
  Lei 74/2025). O texto literal foi conferido em fontes esteri.it, não no
  normattiva. Validar redação exata e a leitura "naturalizou = perdeu a
  exclusividade".
- [B] **Corte 27/03/2025, 23h59 de Roma, preserva a regra antiga** (hero,
  quiz P1, FAQ, VSL): letras a/a-bis/b. Confirmado pela Sentença 63/2026.
- [B] **Exceção dos 2 anos de residência do genitor** (quiz P4, VSL): letra d.
- [B] **Bisneto sem protocolo = via judicial, teses vivas** (resultados
  judicial e judicial-fila, VSL): Cassação 13818/2026 (fila consular),
  casos 1948, incidentes pendentes. Área em disputa ativa: o advogado precisa
  validar O QUE ele se sente confortável de sustentar em juízo.
- [A] **Taxa consular €600** (FAQ): vigente desde 01/01/2025. Confirmar.
- [A] **Sentença 63/2026 "confirmou a lei"** (hero fato, FAQ): correto nos
  perfis julgados; DUDH/CEDU ficou sem mérito. A copy simplifica; o advogado
  valida se a simplificação é aceitável.
- [M] Menores: prazos 31/05/2029 e 3 anos pós-24/05/2025 (não usados na copy,
  mas úteis no atendimento).

## 5. Antes de ligar tráfego (não jurídico)

- [ ] Substituir OAB e conferir telefone (itens [B] acima).
- [ ] Publicar Apps Script NA CONTA GOOGLE DO GUSTAVO e preencher
  FORM_ENDPOINT (docs/SETUP-CLIENTE.md).
- [ ] Rodar autorizar() no Apps Script (permissão external_request).
- [ ] Pixel/CAPI da BM DO GUSTAVO em src/lib/analytics.ts + Propriedades do
  script. Testar com META_TEST_CODE e depois REMOVER o test code.
- [ ] Gravar os 3 VSLs e preencher vsl.idVideo nas 3 variantes.
- [ ] Foto real do advogado na seção "Quem conduz" (hoje é monograma).
- [ ] Revisar VALIDACOES com o Gustavo item a item e colher um "de acordo"
  por escrito (WhatsApp serve) antes do go-live.
