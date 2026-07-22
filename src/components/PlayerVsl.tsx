"use client";

import { useEffect, useState } from "react";
import { EVENTO_QUIZ, lerResultado, type ResultadoQuiz } from "@/lib/eventos";
import { variantePorSlug } from "@/variantes/registro";
import s from "./PlayerVsl.module.css";

/**
 * Player do VSL que vive DENTRO do hero, ao lado da headline. Sem ID de
 * vídeo configurado, mostra placeholder honesto. Quando o quiz é concluído,
 * a legenda personaliza ("Seu resultado: X") ligando o teste ao vídeo.
 */
export default function PlayerVsl({ slug }: { slug: string }) {
  const variante = variantePorSlug(slug);
  const { vsl } = variante;
  const [resultado, setResultado] = useState<ResultadoQuiz | null>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    setResultado(lerResultado(slug));
    const ouvir = (e: Event) => setResultado((e as CustomEvent<ResultadoQuiz>).detail);
    window.addEventListener(EVENTO_QUIZ, ouvir);
    return () => window.removeEventListener(EVENTO_QUIZ, ouvir);
  }, [slug]);

  return (
    <div id="analise" className={s.bloco}>
      <div className={s.moldura}>
        <div className={s.player}>
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
              <span className={s.capaTexto}>Assista: {vsl.titulo}</span>
            </button>
          )
        ) : (
          <div className={s.capa} data-placeholder>
            <span className={`${s.play} ${s.playInativo}`} aria-hidden="true" />
            <span className={s.capaTexto}>Análise em vídeo: em gravação</span>
            <span className={s.capaNota}>O teste abaixo já funciona.</span>
          </div>
        )}
        </div>
      </div>
      <p className={s.legenda}>
        {resultado ? (
          <>
            Seu resultado: <b>{resultado.titulo}</b>
          </>
        ) : (
          vsl.sub
        )}
      </p>
    </div>
  );
}
