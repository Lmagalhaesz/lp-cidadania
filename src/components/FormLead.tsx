"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ga4Event, lerCookie, novoEventId, pixelTrack } from "@/lib/analytics";
import { EVENTO_QUIZ, lerResultado, type ResultadoQuiz } from "@/lib/eventos";
import { linkWhatsApp, MARCA } from "@/lib/marca";
import { variantePorSlug } from "@/variantes/registro";
import s from "./FormLead.module.css";

/* ▼ CONECTE O FORMULÁRIO AQUI ▼
   URL /exec do Google Apps Script publicado NA CONTA DO CLIENTE
   (apps-script/leads-cidadania.gs + docs/SETUP-CLIENTE.md).
   Vazio = marca sucesso local e avisa no console que o lead não persistiu. */
const FORM_ENDPOINT = "";

type Estado = "inicial" | "enviando" | "enviado" | "erro";

/**
 * Formulário de qualificação: nome + WhatsApp + urgência. A urgência chega
 * pré-preenchida do quiz (a pessoa pode ajustar). O resultado do quiz viaja
 * no payload e na mensagem pré-preenchida do WhatsApp, então o advogado
 * recebe o lead JÁ com contexto. Sem pergunta financeira: o vídeo ancora a
 * seriedade do investimento.
 */
export default function FormLead({ slug }: { slug: string }) {
  const variante = variantePorSlug(slug);
  const { form, quiz, idPayload } = variante;
  const [estado, setEstado] = useState<Estado>("inicial");
  const [resultado, setResultado] = useState<ResultadoQuiz | null>(null);
  const [urgencia, setUrgencia] = useState("");

  useEffect(() => {
    const guardado = lerResultado(slug);
    if (guardado) aplicar(guardado);
    const ouvir = (e: Event) => aplicar((e as CustomEvent<ResultadoQuiz>).detail);
    window.addEventListener(EVENTO_QUIZ, ouvir);
    return () => window.removeEventListener(EVENTO_QUIZ, ouvir);

    function aplicar(r: ResultadoQuiz) {
      setResultado(r);
      const u = r.respostas.find((x) => x.pergunta === quiz.urgencia.id);
      if (u) setUrgencia(u.resposta);
    }
  }, [slug, quiz.urgencia.id]);

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);

    const query = new URLSearchParams(window.location.search);
    const utms = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
        .filter((k) => query.has(k))
        .map((k) => [k, query.get(k)])
    );

    /* mesmo event_id no Pixel (navegador) e no CAPI (Apps Script) → dedup */
    const eventId = novoEventId();
    pixelTrack(
      "Lead",
      { content_name: `cidadania-${idPayload}`, content_category: resultado?.id ?? "sem-quiz" },
      eventId
    );
    ga4Event("generate_lead", {
      cidadania: idPayload,
      quiz_resultado: resultado?.id ?? "sem-quiz",
      origem: "lp-cidadania",
    });

    const payload = {
      nome: dados.get("nome"),
      whatsapp: dados.get("whatsapp"),
      urgencia: dados.get("urgencia"),
      cidadania: idPayload,
      quiz_resultado: resultado?.id ?? "",
      quiz_resultado_titulo: resultado?.titulo ?? "",
      quiz_respostas: (resultado?.respostas ?? [])
        .map((r) => `${r.pergunta}=${r.resposta}`)
        .join("; "),
      origem: "lp-cidadania",
      pagina: window.location.pathname + window.location.search,
      ...utms,
      event_id: eventId,
      event_source_url: window.location.href,
      user_agent: navigator.userAgent,
      fbp: lerCookie("_fbp"),
      fbc: lerCookie("_fbc"),
    };

    /* override usado pelo E2E (tests/) pra apontar a um endpoint de teste */
    const endpoint =
      (window as unknown as { __FORM_ENDPOINT__?: string }).__FORM_ENDPOINT__ ??
      FORM_ENDPOINT;

    if (!endpoint) {
      console.warn("FORM_ENDPOINT vazio — lead NÃO persistido:", payload);
      setEstado("enviado");
      return;
    }

    setEstado("enviando");
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        /* text/plain = "simple request": sem preflight OPTIONS, que o
           Google Apps Script não sabe responder. O corpo segue JSON. */
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setEstado(resp.ok ? "enviado" : "erro");
    } catch {
      setEstado("erro");
    }
  };

  const urlWhatsApp = linkWhatsApp(
    variante.mensagemWhatsApp(resultado?.titulo ?? null)
  );

  return (
    <section id="contato" className={s.secao}>
      <div className={`wrap ${s.grade}`}>
        <div className={s.cabeca}>
          <p className="etiqueta" data-reveal>
            {form.etiqueta}
          </p>
          <h2 className={`titulo ${s.h2}`} data-reveal>
            {form.titulo}
          </h2>
          <p className={s.sub} data-reveal>
            {form.sub}
          </p>
          {resultado && (
            <p className={s.contexto} data-reveal>
              Seu teste: <b>{resultado.titulo}</b>. Esse resultado vai junto,
              você não repete nada.
            </p>
          )}
        </div>

        <div className={s.ficha} data-reveal="1">
          {estado === "enviado" ? (
            <div className={s.ok}>
              <p className={s.okSelo}>Recebido</p>
              <p className={s.okTitulo}>
                Agora é com o {MARCA.tratamentoCurto}.
              </p>
              <p className={s.okTexto}>
                Ele mesmo responde, no WhatsApp que você informou. Se preferir
                não esperar, chame agora com seu resultado já anexado:
              </p>
              <a
                className={`btn btn-lacre ${s.okBotao}`}
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chamar no WhatsApp ▸
              </a>
            </div>
          ) : (
            <form onSubmit={enviar}>
              <div className={s.campo}>
                <label htmlFor="lead-nome">Nome</label>
                <input id="lead-nome" name="nome" type="text" autoComplete="name" required />
              </div>
              <div className={s.campo}>
                <label htmlFor="lead-whatsapp">WhatsApp com DDD</label>
                <input
                  id="lead-whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="tel"
                  placeholder="(19) 9…"
                  required
                />
              </div>
              <div className={s.campo}>
                <label htmlFor="lead-urgencia">Quando você quer começar?</label>
                <select
                  id="lead-urgencia"
                  name="urgencia"
                  required
                  value={urgencia}
                  onChange={(e) => setUrgencia(e.target.value)}
                >
                  <option value="" disabled>
                    Escolha…
                  </option>
                  {quiz.urgencia.opcoes.map((o) => (
                    <option key={o.valor} value={o.valor}>
                      {o.rotulo}
                    </option>
                  ))}
                </select>
              </div>
              <button className={`btn btn-lacre ${s.enviarBtn}`} type="submit" disabled={estado === "enviando"}>
                {estado === "enviando" ? "Enviando…" : "Pedir análise do meu caso ▸"}
              </button>
              {estado === "erro" && (
                <p className={s.erro} role="alert">
                  Não deu pra enviar agora. Tente de novo em instantes.
                </p>
              )}
              <p className={s.lgpd}>
                Seus dados vão direto para o {MARCA.tratamentoCurto} e servem só
                para responder seu caso.{" "}
                <Link href="/privacidade">Política de privacidade</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
