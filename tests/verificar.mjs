/**
 * Verificação do funil (FASE 6): roda contra o export estático (out/).
 *
 *  1. VISUAL: screenshots de página inteira das 3 variantes em 4 viewports
 *     (320/390/768/1280) + detector de overflow horizontal (scrollWidth do
 *     documento e elementos que vazam da viewport).
 *  2. E2E: percorre TODOS os caminhos do quiz por força bruta (DFS sobre as
 *     opções renderizadas), confere que cada caminho chega num resultado, e
 *     para um caminho de cada variante submete o formulário contra um
 *     endpoint local de teste, validando o payload (quiz + urgência + UTMs).
 *
 * Uso: npm run build && npm run verificar
 */

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(RAIZ, "out");
const SHOTS = join(RAIZ, "tests/screenshots");

const VARIANTES = ["cidadania-lituana", "cidadania-portuguesa", "cidadania-italiana"];
const VIEWPORTS = [
  { nome: "320", width: 320, height: 720 },
  { nome: "390", width: 390, height: 844 },
  { nome: "768", width: 768, height: 1024 },
  { nome: "1280", width: 1280, height: 900 },
];

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".txt": "text/plain", ".xml": "application/xml", ".woff2": "font/woff2",
  ".json": "application/json", ".webmanifest": "application/manifest+json",
};

/* servidor estático com a mesma regra do nginx: /rota -> /rota.html */
function servirEstatico() {
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://x");
    let caminho = decodeURIComponent(url.pathname);
    if (caminho.endsWith("/")) caminho += "index.html";
    /* mesma semântica do try_files do nginx: precisa ser ARQUIVO
       (o export do Next cria diretórios homônimos com payloads RSC) */
    const ehArquivo = (p) => existsSync(p) && statSync(p).isFile();
    let arquivo = join(OUT, caminho);
    if (!ehArquivo(arquivo)) arquivo = join(OUT, caminho + ".html");
    if (!ehArquivo(arquivo)) {
      res.writeHead(404); res.end("404"); return;
    }
    try {
      const corpo = await readFile(arquivo);
      res.writeHead(200, { "Content-Type": MIME[extname(arquivo)] ?? "application/octet-stream" });
      res.end(corpo);
    } catch {
      res.writeHead(500); res.end();
    }
  });
}

/* endpoint de teste que recebe o POST do formulário */
function servirColetor(leads) {
  return createServer((req, res) => {
    let corpo = "";
    req.on("data", (c) => (corpo += c));
    req.on("end", () => {
      try { leads.push(JSON.parse(corpo)); } catch { leads.push({ erro: "json inválido", corpo }); }
      /* o Apps Script real responde com Access-Control-Allow-Origin: * */
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end('{"ok":true}');
    });
  });
}

const falhas = [];
function checar(cond, msg) {
  if (cond) {
    console.log(`  ok  ${msg}`);
  } else {
    falhas.push(msg);
    console.error(`  FALHA  ${msg}`);
  }
}

async function detectarOverflow(page) {
  return page.evaluate(() => {
    const problemas = [];
    const larguraDoc = document.documentElement.scrollWidth;
    if (larguraDoc > window.innerWidth + 1) {
      problemas.push(`documento com scroll horizontal: ${larguraDoc}px > ${window.innerWidth}px`);
    }
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1)) {
        const id = el.className && typeof el.className === "string"
          ? `${el.tagName.toLowerCase()}.${el.className.split(" ")[0]}`
          : el.tagName.toLowerCase();
        problemas.push(`${id} vaza a viewport (left ${Math.round(r.left)}, right ${Math.round(r.right)})`);
        if (problemas.length > 8) break;
      }
    }
    return problemas;
  });
}

/* percorre o quiz seguindo um caminho de índices; devolve o caminho tomado,
   o título do resultado e se existem mais opções a explorar */
async function percorrerQuiz(page, caminho) {
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  const ficha = page.locator("#verificar");
  /* o quiz fica abaixo da dobra com reveal por IntersectionObserver:
     sem scroll ele segue opacity 0 e o Playwright o trata como invisível */
  await ficha.scrollIntoViewIfNeeded();
  await page.waitForTimeout(650);
  const tomado = [];
  let passo = 0;
  const ramosRestantes = [];
  while (true) {
    const resultadoVisivel = await ficha.locator("[class*='resultado']").first().isVisible().catch(() => false);
    if (resultadoVisivel) break;
    const botoes = ficha.locator("button[class*='opcao']");
    await botoes.first().waitFor({ state: "visible", timeout: 5000 });
    const n = await botoes.count();
    const indice = caminho[passo] ?? 0;
    if (indice === 0 && n > 1) ramosRestantes.push({ passo, total: n });
    tomado.push(indice);
    await botoes.nth(indice).click();
    passo += 1;
    if (passo > 12) throw new Error("quiz não terminou em 12 passos");
  }
  const selo = await ficha.locator("[class*='selo']").first().innerText();
  return { tomado, selo: selo.trim(), ramosRestantes };
}

/* DFS: enumera todos os caminhos possíveis do quiz */
async function todosOsCaminhos(page) {
  const resultados = [];
  const pilha = [[]];
  const vistos = new Set();
  while (pilha.length) {
    const caminho = pilha.pop();
    const chave = caminho.join(",");
    if (vistos.has(chave)) continue;
    vistos.add(chave);
    const { tomado, selo, ramosRestantes } = await percorrerQuiz(page, caminho);
    resultados.push({ caminho: tomado, selo });
    for (const ramo of ramosRestantes) {
      for (let i = 1; i < ramo.total; i++) {
        pilha.push([...tomado.slice(0, ramo.passo), i]);
      }
    }
  }
  return resultados;
}

async function main() {
  if (!existsSync(OUT)) {
    console.error("out/ não existe. Rode npm run build antes.");
    process.exit(1);
  }
  mkdirSync(SHOTS, { recursive: true });

  const estatico = servirEstatico();
  await new Promise((r) => estatico.listen(0, r));
  const portaSite = estatico.address().port;

  const leads = [];
  const coletor = servirColetor(leads);
  await new Promise((r) => coletor.listen(0, r));
  const portaColetor = coletor.address().port;

  const browser = await chromium.launch();

  /* ---------- 1. visual: screenshots + overflow ---------- */
  console.log("\n== VISUAL: overflow + screenshots ==");
  for (const variante of VARIANTES) {
    for (const vp of VIEWPORTS) {
      /* reducedMotion: o CSS mostra tudo sem animação de reveal, senão o
         screenshot fullPage sai com as seções abaixo da dobra invisíveis */
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        reducedMotion: "reduce",
      });
      await page.goto(`http://localhost:${portaSite}/${variante}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      const problemas = await detectarOverflow(page);
      checar(problemas.length === 0, `${variante} @${vp.nome}: sem overflow${problemas.length ? ` (${problemas[0]})` : ""}`);
      await page.screenshot({ path: join(SHOTS, `${variante}-${vp.nome}.png`), fullPage: true });
      await page.close();
    }
  }
  console.log(`  screenshots em tests/screenshots/`);

  /* ---------- 2. E2E: todos os caminhos do quiz ---------- */
  console.log("\n== E2E: caminhos do quiz ==");
  for (const variante of VARIANTES) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`http://localhost:${portaSite}/${variante}`, { waitUntil: "networkidle" });
    const caminhos = await todosOsCaminhos(page);
    checar(caminhos.length > 0, `${variante}: ${caminhos.length} caminhos percorridos`);
    const selos = new Set(caminhos.map((c) => c.selo));
    console.log(`     resultados vistos: ${[...selos].join(" | ")}`);
    checar(caminhos.every((c) => c.selo.length > 0), `${variante}: todo caminho chega a um resultado`);
    await page.close();
  }

  /* ---------- 3. E2E: submissão do formulário com payload ---------- */
  console.log("\n== E2E: formulário -> payload ==");
  for (const variante of VARIANTES) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const utm = "utm_source=teste&utm_campaign=verificacao";
    await page.goto(`http://localhost:${portaSite}/${variante}?${utm}`, { waitUntil: "networkidle" });
    await page.evaluate((porta) => {
      window.__FORM_ENDPOINT__ = `http://localhost:${porta}/lead`;
    }, portaColetor);

    // caminho default do quiz (primeira opção em tudo)
    await percorrerQuizSimples(page);

    const antes = leads.length;
    await page.locator("#contato").scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    await page.fill("#lead-nome", "Teste Verificação");
    await page.fill("#lead-whatsapp", "(19) 99999-0000");
    const urgenciaJaPreenchida = await page.locator("#lead-urgencia").inputValue();
    checar(urgenciaJaPreenchida !== "", `${variante}: urgência pré-preenchida pelo quiz`);
    await page.click("#contato button[type=submit]");
    await page.waitForFunction(() => document.querySelector("#contato form") === null, null, { timeout: 8000 });

    checar(leads.length === antes + 1, `${variante}: payload chegou no endpoint de teste`);
    const lead = leads[leads.length - 1] ?? {};
    checar(lead.nome === "Teste Verificação", `${variante}: payload.nome`);
    checar(String(lead.cidadania) === variante.replace("cidadania-", ""), `${variante}: payload.cidadania`);
    checar(Boolean(lead.quiz_resultado), `${variante}: payload.quiz_resultado (${lead.quiz_resultado})`);
    checar(Boolean(lead.urgencia), `${variante}: payload.urgencia (${lead.urgencia})`);
    checar(lead.utm_source === "teste", `${variante}: payload.utm_source`);
    checar(lead.utm_campaign === "verificacao", `${variante}: payload.utm_campaign`);
    checar(String(lead.pagina || "").includes(variante), `${variante}: payload.pagina`);
    checar(Boolean(lead.event_id), `${variante}: payload.event_id (dedup CAPI)`);

    const btnWhats = page.locator("#contato a[href*='wa.me']");
    checar(await btnWhats.isVisible(), `${variante}: CTA de WhatsApp visível no sucesso`);
    const href = (await btnWhats.getAttribute("href")) || "";
    checar(href.includes("5519981351969"), `${variante}: WhatsApp aponta pro número do cliente`);
    await page.close();
  }

  async function percorrerQuizSimples(page) {
    const ficha = page.locator("#verificar");
    await ficha.scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    for (let i = 0; i < 12; i++) {
      const resultadoVisivel = await ficha.locator("[class*='resultado']").first().isVisible().catch(() => false);
      if (resultadoVisivel) return;
      const botoes = ficha.locator("button[class*='opcao']");
      await botoes.first().waitFor({ state: "visible", timeout: 5000 });
      await botoes.first().click();
    }
  }

  await browser.close();
  estatico.close();
  coletor.close();

  console.log("\n== RESUMO ==");
  if (falhas.length) {
    console.error(`${falhas.length} falha(s):`);
    for (const f of falhas) console.error(` - ${f}`);
    process.exit(1);
  }
  console.log("tudo verde.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
