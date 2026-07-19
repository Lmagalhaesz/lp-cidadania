import type { Variante } from "@/variantes/tipos";
import s from "./Metodo.module.css";

/** Como o processo funciona: etapas numeradas em ficha, sem promessa de prazo. */
export default function Metodo({ variante }: { variante: Variante }) {
  const { metodo } = variante;
  return (
    <section className={s.secao}>
      <div className="wrap">
        <p className="etiqueta" data-reveal>
          {metodo.etiqueta}
        </p>
        <h2 className={`titulo ${s.h2}`} data-reveal>
          {metodo.titulo}
        </h2>
        <ol className={s.etapas}>
          {metodo.etapas.map((etapa, i) => (
            <li key={etapa.titulo} className={s.etapa} data-reveal={i % 2 ? "1" : undefined}>
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={s.etapaTitulo}>{etapa.titulo}</h3>
                <p className={s.etapaTexto}>{etapa.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
