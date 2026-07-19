import { MARCA } from "@/lib/marca";
import s from "./Navbar.module.css";

/** Topo enxuto: wordmark serif + OAB + uma ação. Nada compete com o funil. */
export default function Navbar({ ctaRotulo }: { ctaRotulo: string }) {
  return (
    <header className={s.topo}>
      <div className={`wrap ${s.linha}`}>
        <div className={s.marca}>
          <span className={s.wordmark}>{MARCA.nome}</span>
          <span className={s.oab}>{MARCA.oab}</span>
        </div>
        <a className={`btn btn-contorno ${s.cta}`} href="#verificar">
          {ctaRotulo}
        </a>
      </div>
    </header>
  );
}
