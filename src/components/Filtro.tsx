import type { Variante } from "@/variantes/tipos";
import s from "./Filtro.module.css";

/**
 * O filtro explícito ("isso não é pra quem…"): afasta o lead errado ANTES
 * do WhatsApp. Qualidade > volume — este bloco existe a pedido do funil,
 * não é retórica.
 */
export default function Filtro({ variante }: { variante: Variante }) {
  const { filtro } = variante;
  return (
    <section className={s.secao}>
      <div className={`wrap ${s.grade}`}>
        <h2 className={`titulo ${s.h2}`} data-reveal>
          {filtro.titulo}
        </h2>
        <ul className={s.lista} data-reveal="1">
          {filtro.itens.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
