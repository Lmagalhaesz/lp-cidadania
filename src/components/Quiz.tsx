"use client";

import { useMemo, useState } from "react";
import { ga4Event } from "@/lib/analytics";
import { publicarResultado, type RespostaQuiz } from "@/lib/eventos";
import { variantePorSlug } from "@/variantes/registro";
import type { ResultadoDef } from "@/variantes/tipos";
import s from "./Quiz.module.css";

type Fase = "perguntas" | "urgencia" | "resultado";

/**
 * Ficha de análise: uma pergunta por vez, resultado honesto no fim.
 * O resultado personaliza a seção do vídeo e viaja no payload do lead
 * (via CustomEvent + sessionStorage — ver src/lib/eventos.ts).
 * Quem cai em "provavelmente sem direito" NÃO é empurrado pro WhatsApp.
 * Recebe o slug (não o objeto) porque a variante carrega funções.
 */
export default function Quiz({ slug }: { slug: string }) {
  const variante = variantePorSlug(slug);
  const { quiz } = variante;
  const [fase, setFase] = useState<Fase>("perguntas");
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});

  /* perguntas visíveis dado o que já foi respondido (árvore condicional).
     Condições só olham respostas ANTERIORES, então a lista é estável para
     os índices já percorridos. */
  const visiveis = useMemo(
    () => quiz.perguntas.filter((p) => !p.mostrarSe || p.mostrarSe(respostas)),
    [quiz.perguntas, respostas]
  );

  const resultado: ResultadoDef | null = useMemo(() => {
    if (fase !== "resultado") return null;
    const id = quiz.avaliar(respostas);
    return quiz.resultados.find((r) => r.id === id) ?? null;
  }, [fase, quiz, respostas]);

  const total = visiveis.length + 1; // + urgência
  const passo = fase === "perguntas" ? indice + 1 : total;

  function responder(perguntaId: string, valor: string) {
    const proximas = { ...respostas, [perguntaId]: valor };
    setRespostas(proximas);
    const proximasVisiveis = quiz.perguntas.filter(
      (p) => !p.mostrarSe || p.mostrarSe(proximas)
    );
    if (indice + 1 < proximasVisiveis.length) {
      setIndice(indice + 1);
    } else {
      setFase("urgencia");
    }
  }

  function responderUrgencia(valor: string) {
    const id = quiz.avaliar(respostas);
    const def = quiz.resultados.find((r) => r.id === id);
    const detalhadas: RespostaQuiz[] = visiveis.map((p) => ({
      pergunta: p.id,
      resposta: respostas[p.id] ?? "",
    }));
    detalhadas.push({ pergunta: quiz.urgencia.id, resposta: valor });
    publicarResultado(slug, {
      id,
      titulo: def?.titulo ?? id,
      respostas: detalhadas,
    });
    ga4Event("quiz_resultado", { cidadania: variante.idPayload, resultado: id, urgencia: valor });
    setFase("resultado");
  }

  function voltar() {
    if (fase === "urgencia") {
      setFase("perguntas");
      setIndice(visiveis.length - 1);
    } else if (indice > 0) {
      setIndice(indice - 1);
    }
  }

  function refazer() {
    setRespostas({});
    setIndice(0);
    setFase("perguntas");
  }

  const pergunta = fase === "perguntas" ? visiveis[indice] : quiz.urgencia;

  return (
    <div id="verificar" className={s.ficha}>
      <div className={s.cabecalhoFicha}>
        <p className={s.rotuloFicha}>{quiz.etiqueta}</p>
      </div>
      {fase !== "resultado" ? (
            <>
              <div className={s.progresso}>
                <span className={s.progressoRotulo}>
                  Pergunta {passo} de {total}
                </span>
                <span className={s.progressoBarra} aria-hidden="true">
                  <i style={{ width: `${(passo / total) * 100}%` }} />
                </span>
              </div>

              <p className={s.pergunta}>{pergunta.pergunta}</p>
              {pergunta.ajuda && <p className={s.ajuda}>{pergunta.ajuda}</p>}

              <div className={s.opcoes}>
                {pergunta.opcoes.map((o) => (
                  <button
                    key={o.valor}
                    type="button"
                    className={s.opcao}
                    onClick={() =>
                      fase === "urgencia"
                        ? responderUrgencia(o.valor)
                        : responder(pergunta.id, o.valor)
                    }
                  >
                    <span>{o.rotulo}</span>
                    {o.ajuda && <small>{o.ajuda}</small>}
                  </button>
                ))}
              </div>

              {(indice > 0 || fase === "urgencia") && (
                <button type="button" className={s.voltar} onClick={voltar}>
                  ‹ voltar
                </button>
              )}
            </>
          ) : (
            resultado && (
              <div className={s.resultado}>
                <p
                  className={`${s.selo} ${
                    resultado.tom === "aberto"
                      ? s.seloAberto
                      : resultado.tom === "atencao"
                        ? s.seloAtencao
                        : s.seloNegativo
                  }`}
                >
                  {resultado.titulo}
                </p>
                <p className={s.resultadoTexto}>{resultado.texto}</p>

                {resultado.segueFunil ? (
                  <div className={s.resultadoAcoes}>
                    <a className="btn btn-lacre" href="#analise">
                      Assistir à análise do meu caso ▸
                    </a>
                    <p className={s.resultadoNota}>
                      Seu resultado segue junto quando você pedir a análise, sem
                      repetir nada.
                    </p>
                  </div>
                ) : (
                  resultado.orientacao && (
                    <p className={s.orientacao}>{resultado.orientacao}</p>
                  )
                )}

                <button type="button" className={s.voltar} onClick={refazer}>
                  refazer o teste
                </button>
              </div>
            )
          )}
    </div>
  );
}
