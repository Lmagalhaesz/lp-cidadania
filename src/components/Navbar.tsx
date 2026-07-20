"use client";

import { useEffect, useState } from "react";
import { MARCA } from "@/lib/marca";
import s from "./Navbar.module.css";

const MENU = [
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#beneficios", rotulo: "Benefícios" },
  { href: "#perguntas", rotulo: "Perguntas" },
  { href: "#sobre", rotulo: "Sobre" },
];

/**
 * Header transparente que ganha blur + borda ao rolar (padrão Linear/Vercel).
 * Um CTA fixo, sempre o mesmo verbo do funil.
 */
export default function Navbar({ ctaRotulo }: { ctaRotulo: string }) {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header className={`${s.topo} ${rolou ? s.rolou : ""}`}>
      <div className={`wrap ${s.linha}`}>
        <a className={s.marca} href="#topo">
          <span className={s.simbolo} aria-hidden="true" />
          {MARCA.nome}
        </a>
        <div className={s.direita}>
          <nav className={s.menu} aria-label="Seções da página">
            {MENU.map((item) => (
              <a key={item.href} href={item.href}>
                {item.rotulo}
              </a>
            ))}
          </nav>
          <a className={`btn btn-verde ${s.cta}`} href="#quiz">
            {ctaRotulo}
          </a>
        </div>
      </div>
    </header>
  );
}
