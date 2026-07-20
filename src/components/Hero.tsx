import Quiz from "@/components/Quiz";
import type { Variante } from "@/variantes/tipos";
import s from "./Hero.module.css";

/**
 * Dobra de conversão: manchete direta ("descubra se você tem direito") e o
 * QUIZ embutido, com a primeira pergunta visível já no carregamento. Sem
 * clique pra começar: o micro-compromisso abre a página. O dado de lei vira
 * nota de apoio sob a manchete, não manchete.
 */
export default function Hero({ variante }: { variante: Variante }) {
  const { hero } = variante;
  const [antes, depois] = hero.titulo.split("{destaque}");

  return (
    <section className={s.dobra}>
      {/* marca d'água tipográfica do país: cenografia de arquivo, não decoração */}
      <span aria-hidden="true" className={s.marcaDagua}>
        {variante.pais}
      </span>
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
          <ul className={s.provas} data-reveal="2">
            {hero.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <div className={s.colQuiz} data-reveal="1">
          <Quiz slug={variante.slug} />
        </div>

        <p className={s.fato} data-reveal="2">
          <span className={s.fatoRotulo}>Base legal</span> {hero.fato.texto}{" "}
          <span className={s.fatoFonte}>({hero.fato.fonte})</span>
        </p>
      </div>
    </section>
  );
}
