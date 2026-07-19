import type { Variante } from "@/variantes/tipos";
import s from "./Faq.module.css";

/** FAQ nativo (details/summary): zero JS, acessível, padrão do nicho. */
export default function Faq({ variante }: { variante: Variante }) {
  if (variante.faq.length === 0) return null;
  return (
    <section className={s.secao}>
      <div className={`wrap ${s.grade}`}>
        <h2 className={`titulo ${s.h2}`} data-reveal>
          Perguntas que chegam antes do processo
        </h2>
        <div className={s.lista} data-reveal="1">
          {variante.faq.map((item) => (
            <details key={item.pergunta} className={s.item}>
              <summary className={s.pergunta}>{item.pergunta}</summary>
              <p className={s.resposta}>{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
