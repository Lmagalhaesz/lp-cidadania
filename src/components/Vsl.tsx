"use client";

import { useEffect, useState } from "react";
import { EVENTO_QUIZ, lerResultado, type ResultadoQuiz } from "@/lib/eventos";
import { variantePorSlug } from "@/variantes/registro";
import s from "./Vsl.module.css";

/**
 * Seção do vídeo. A chamada é personalizada pelo resultado do quiz
 * ("seu caso parece ser X"). Sem ID de vídeo configurado, mostra um
 * placeholder de player honesto ("análise em vídeo desta cidadania") —
 * a página funciona antes da gravação, e o embed real entra trocando
 * UMA string na variante.
 */
export default function Vsl({ slug }: { slug: string }) {
  const variante = variantePorSlug(slug);
  const { vsl, quiz } = variante;
  const [resultado, setResultado] = useState<ResultadoQuiz | null>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    setResultado(lerResultado(slug));
    const ouvir = (e: Event) => {
      setResultado((e as CustomEvent<ResultadoQuiz>).detail);
    };
    window.addEventListener(EVENTO_QUIZ, ouvir);
    return () => window.removeEventListener(EVENTO_QUIZ, ouvir);
  }, [slug]);

  const chamada = resultado
    ? quiz.resultados.find((r) => r.id === resultado.id)?.chamadaVsl
    : null;

  return (
    <section id="analise" className={s.secao}>
      <div className={`wrap ${s.grade}`}>
        <div className={s.cabeca} data-reveal>
          <p className={`etiqueta ${s.etiqueta}`}>{vsl.etiqueta}</p>
          {resultado && (
            <p className={s.chipResultado}>
              Seu resultado: <b>{resultado.titulo}</b>
            </p>
          )}
          <h2 className={`titulo ${s.h2}`}>{chamada ?? vsl.titulo}</h2>
          <p className={s.sub}>{vsl.sub}</p>
        </div>

        <div className={s.player} data-reveal="1">
          {vsl.idVideo ? (
            tocando ? (
              <iframe
                className={s.iframe}
                src={`https://www.youtube-nocookie.com/embed/${vsl.idVideo}?autoplay=1&rel=0`}
                title="Análise em vídeo"
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className={s.capa}
                onClick={() => setTocando(true)}
                aria-label="Assistir análise em vídeo"
              >
                <span className={s.play} aria-hidden="true" />
                <span className={s.capaTexto}>Assistir a análise</span>
              </button>
            )
          ) : (
            <div className={s.capa} data-placeholder>
              <span className={`${s.play} ${s.playInativo}`} aria-hidden="true" />
              <span className={s.capaTexto}>
                Análise em vídeo desta cidadania: em gravação
              </span>
              <span className={s.capaNota}>
                Enquanto isso, o teste acima e o formulário abaixo já funcionam.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
