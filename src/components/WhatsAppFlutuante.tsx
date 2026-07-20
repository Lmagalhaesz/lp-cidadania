"use client";

import { useEffect, useState } from "react";
import { EVENTO_QUIZ, lerResultado, type ResultadoQuiz } from "@/lib/eventos";
import { linkWhatsApp } from "@/lib/marca";
import { variantePorSlug } from "@/variantes/registro";
import s from "./WhatsAppFlutuante.module.css";

/**
 * WhatsApp sempre à mão (padrão que o nicho inteiro usa porque funciona).
 * Leva o resultado do quiz na mensagem quando existir. Aparece depois de um
 * scroll mínimo pra não competir com a primeira dobra.
 */
export default function WhatsAppFlutuante({ slug }: { slug: string }) {
  const variante = variantePorSlug(slug);
  const [resultado, setResultado] = useState<ResultadoQuiz | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    setResultado(lerResultado(slug));
    const ouvir = (e: Event) => setResultado((e as CustomEvent<ResultadoQuiz>).detail);
    window.addEventListener(EVENTO_QUIZ, ouvir);
    const aoRolar = () => setVisivel(window.scrollY > 420);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener(EVENTO_QUIZ, ouvir);
      window.removeEventListener("scroll", aoRolar);
    };
  }, [slug]);

  const url = linkWhatsApp(variante.mensagemWhatsApp(resultado?.titulo ?? null));

  return (
    <a
      className={`${s.pilula} ${visivel ? s.on : ""}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.2Z" />
      </svg>
      Chamar no WhatsApp
    </a>
  );
}
