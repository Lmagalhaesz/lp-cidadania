"use client";

import { useEffect } from "react";

/**
 * Único client component que varre a página: liga o fade-up de [data-reveal]
 * via IntersectionObserver. As seções continuam Server Components, só marcam
 * o atributo. Sem JS ou com prefers-reduced-motion, tudo renderiza visível
 * (ver globals.css).
 */
export default function ScrollFx() {
  useEffect(() => {
    const alvos = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!("IntersectionObserver" in window) || alvos.length === 0) {
      alvos.forEach((el) => el.classList.add("on"));
      return;
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("on");
            obs.unobserve(entrada.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
