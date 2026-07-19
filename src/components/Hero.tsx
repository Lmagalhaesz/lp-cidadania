import type { Variante } from "@/variantes/tipos";
import s from "./Hero.module.css";

/**
 * Dobra editorial: título serif com destaque em itálico, um concreto REAL
 * (dado de lei com fonte, no estilo de nota de certidão) e uma única ação:
 * verificar o direito no quiz logo abaixo.
 */
export default function Hero({ variante }: { variante: Variante }) {
  const { hero, pais } = variante;
  const [antes, depois] = hero.titulo.split("{destaque}");

  return (
    <section className={s.dobra}>
      <div className={`wrap ${s.grade}`}>
        <div className={s.colTexto}>
          <p className="etiqueta" data-reveal>
            {hero.etiqueta}
          </p>
          <h1 className={`titulo ${s.h1}`} data-reveal="1">
            {antes}
            <em className={s.destaque}>{hero.tituloDestaque}</em>
            {depois}
          </h1>
          <p className={s.sub} data-reveal="2">
            {hero.sub}
          </p>
          <div className={s.acoes} data-reveal="2">
            <a className="btn btn-lacre" href="#verificar">
              {hero.ctaQuiz}
            </a>
            <span className={s.acaoNota}>2 minutos · sem cadastro</span>
          </div>
        </div>

        <aside className={s.ficha} data-reveal="2" aria-label={`Base legal, ${pais}`}>
          <p className={s.fichaRotulo}>Base legal</p>
          <p className={s.fichaTexto}>{hero.fato.texto}</p>
          <hr className="ficha-linha" />
          <p className={s.fichaFonte}>{hero.fato.fonte}</p>
        </aside>
      </div>
    </section>
  );
}
