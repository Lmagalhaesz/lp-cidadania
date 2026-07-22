import PlayerVsl from "@/components/PlayerVsl";
import Skyline from "@/components/Skyline";
import { faixaBandeira } from "@/lib/pais";
import type { Variante } from "@/variantes/tipos";
import s from "./Hero.module.css";

/**
 * Hero split premium: promessa direta à esquerda, VSL à direita.
 * Pouquíssimo texto; dois CTAs; provas em uma linha.
 */
export default function Hero({ variante }: { variante: Variante }) {
  const { hero } = variante;
  const [antes, depois] = hero.titulo.split("{destaque}");

  return (
    <section id="topo" className={s.dobra}>
      {/* fundo: aurora verde respirando + rota de voo Brasil → país */}
      <div className={s.aurora} aria-hidden="true" />
      <svg className={s.rota} viewBox="0 0 600 520" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <path
          className={s.rotaLinha}
          d="M30 500 C 150 430, 210 240, 330 150 C 420 84, 490 66, 560 58"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        <circle cx="30" cy="500" r="3" fill="currentColor" opacity="0.5" />
        <circle className={s.rotaDestino} cx="560" cy="58" r="4" fill="var(--ink)" />
        <circle className={s.rotaPulso} cx="560" cy="58" r="4" stroke="var(--ink)" strokeWidth="1.5" />
      </svg>
      <div className={`wrap ${s.grade}`}>
        <div className={s.colTexto}>
          <p className={s.pilula} data-reveal>
            <i
              className={s.bandeira}
              style={{ background: faixaBandeira(variante.pais) }}
              aria-hidden="true"
            />
            {hero.etiqueta}
          </p>
          <h1 className={`titulo ${s.h1}`} data-reveal="1">
            {antes}
            <span className={s.destaque}>{hero.tituloDestaque}</span>
            {depois}
          </h1>
          <p className={s.sub} data-reveal="2">
            {hero.sub}
          </p>
          <div className={s.acoes} data-reveal="2">
            <a className="btn btn-acao" href="#quiz">
              {hero.ctaQuiz}
            </a>
            <a className="btn btn-fantasma" href="#como-funciona">
              Como funciona
            </a>
          </div>
          <ul className={s.provas} data-reveal="2">
            {hero.bullets.map((b) => (
              <li key={b}>
                <Check /> {b}
              </li>
            ))}
          </ul>
        </div>

        <div className={s.colArte} data-reveal="2">
          <PlayerVsl slug={variante.slug} />
        </div>
      </div>
      {/* skyline do país em traço fino, com animação de desenho */}
      <Skyline pais={variante.pais} />
    </section>
  );
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="var(--verde-suave)" />
      <path d="M4.5 8.2 7 10.6l4.5-5" stroke="var(--verde)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
