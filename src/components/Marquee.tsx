import type { Variante } from "@/variantes/tipos";
import s from "./Marquee.module.css";

/**
 * Faixa de fatos em movimento sob o hero: energia visual com dado REAL
 * (lei, corte, geração), nunca slogan. Conteúdo duplicado para o loop.
 */
export default function Marquee({ variante }: { variante: Variante }) {
  const itens = variante.marquee;
  return (
    <div className={s.faixa} aria-hidden="true">
      <div className={s.trilho}>
        {[0, 1].map((copia) => (
          <div key={copia} className={s.grupo}>
            {itens.map((item) => (
              <span key={`${copia}-${item}`} className={s.item}>
                {item}
                <i className={s.sep} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
