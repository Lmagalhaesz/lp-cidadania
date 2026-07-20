import { MARCA } from "@/lib/marca";
import type { Variante } from "@/variantes/tipos";
import s from "./Advogado.module.css";

/**
 * Quem conduz. Regra dura de conteúdo: só credencial VERDADEIRA da
 * entrevista. Sem número de casos inventado, sem "especialista nº 1".
 * A foto entra depois (placeholder com moldura de retrato de dossiê).
 */
export default function Advogado({ variante }: { variante: Variante }) {
  return (
    <section id="sobre" className={s.secao}>
      <div className={`wrap ${s.grade}`}>
        <figure className={s.retrato} data-reveal>
          {/* Foto real do advogado (a fornecer). O placeholder mantém a
              composição e é trocado por <img> sem mexer no layout. */}
          <div className={s.fotoPlaceholder} aria-hidden="true">
            <span>{iniciais(MARCA.nome)}</span>
          </div>
          <figcaption className={s.legenda}>
            {MARCA.tratamento} · {MARCA.oab}
          </figcaption>
        </figure>

        <div data-reveal="1">
          <p className="etiqueta">Quem conduz</p>
          <h2 className={`titulo ${s.h2}`}>
            Advogado no processo, do início ao fim.
          </h2>
          <div className={s.texto}>
            <p>
              Quem analisa seu caso é quem assina: {MARCA.tratamento},{" "}
              {MARCA.oab}, de {MARCA.cidade}. Processo de{" "}
              {variante.cidadania} é o dia a dia dele: cada caso que aceita, ele
              conduz pessoalmente, da análise do primeiro documento ao desfecho.
            </p>
            <p>
              Processo de cidadania não tem atalho honesto. Nos casos que ele
              conduz, há dossiê que fecha em 2 meses e há dossiê que leva 2
              anos. O que separa um do outro quase sempre se decide antes de
              começar: na análise de quem você é na linha da família e do que
              existe de papel para provar.
            </p>
            <p>
              Por isso esta página começa com um teste, e não com um botão de
              conversa. Se o seu caso não tiver base legal, você vai ouvir isso
              aqui mesmo, de graça, antes de gastar um real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function iniciais(nome: string): string {
  return nome
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}
