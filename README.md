# lp-cidadania — funil de captação para advogado de cidadania

Template "cidadania" da Funnely, primeira instância: Dr. Gustavo Ribeiro
(Campinas, SP). Três funis completos, um por cidadania:

- `/cidadania-lituana` · `/cidadania-portuguesa` · `/cidadania-italiana`
- Arquitetura do funil: Quiz de elegibilidade → VSL → formulário de
  qualificação (nome + WhatsApp + urgência) → WhatsApp do advogado com o
  resultado do teste anexado.

## Stack

Next.js (App Router, `output: "export"`, 100% estático) + CSS Modules, sem
Tailwind. Form → Google Apps Script → Sheets do cliente (POST `text/plain`
anti-preflight) + Meta CAPI server-side. Deploy: Docker (nginx + certbot).

## Mapa do repo

| Caminho | O que é |
|---|---|
| `src/variantes/*.ts` | Conteúdo de cada cidadania: copy, quiz (perguntas condicionais + regras), resultados, FAQ. Componentes são white-label |
| `src/lib/marca.ts` | Identidade do cliente (nome, OAB, WhatsApp) |
| `src/lib/analytics.ts` | IDs de Pixel/GA4/Clarity (do CLIENTE; vazio = não injeta) |
| `src/app/globals.css` | Tokens da identidade "dossiê de arquivo" (docs/IDENTIDADE.md) |
| `apps-script/leads-cidadania.gs` | Receptor de leads → Sheets + CAPI (conta do cliente) |
| `docs/pesquisa/` | Base jurídica com fontes primárias (jul/2026) |
| `docs/VALIDACOES.md` | Checklist de validação com o advogado. **Nada vai ao ar com [B] aberto** |
| `docs/vsl/` | Roteiro-mestre + 3 roteiros de gravação |
| `docs/SETUP-CLIENTE.md` / `docs/DEPLOY.md` | Publicação dos ativos do cliente e da stack |
| `tests/verificar.mjs` | Gate de verificação (abaixo) |

## Comandos

```bash
npm run dev        # desenvolvimento
npm run build      # export estático em out/
npm run verificar  # gate: overflow em 4 viewports + DFS de TODOS os caminhos
                   # do quiz + E2E do form com payload validado (rodar após build)
```

`npm run verificar` precisa do Chromium do Playwright
(`npx playwright install chromium`, uma vez).

## Regra de ouro do conteúdo

Toda afirmação de elegibilidade tem fonte em `docs/pesquisa/` e entrada em
`docs/VALIDACOES.md`. Errar elegibilidade causa dano real a pessoas: na
dúvida, o resultado do quiz rebaixa para "análise individual", nunca promete.
