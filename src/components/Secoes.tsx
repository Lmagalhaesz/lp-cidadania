import type { Variante } from "@/variantes/tipos";
import s from "./Secoes.module.css";

/**
 * Seções de conversão compartilhadas pelas 3 variantes.
 * Regra dura mantida: nenhum número de resultado inventado. A prova social
 * aqui é VERIFICÁVEL (OAB consultável, lei citada com fonte) até existirem
 * casos e depoimentos reais autorizados (ver docs/VALIDACOES.md).
 */

export function SocialProof() {
  const itens = [
    ["OAB", "Advogado inscrito, verificável no site do Conselho Federal"],
    ["3 nacionalidades", "Portuguesa, italiana e lituana, com a lei de cada uma"],
    ["Base legal citada", "Cada resultado aponta a lei e a fonte oficial"],
    ["Sem robô", "Quem analisa e responde é o próprio advogado"],
  ];
  return (
    <section className={s.prova}>
      <div className={`wrap ${s.provaGrade}`}>
        {itens.map(([t, d], i) => (
          <div key={t} className={s.provaItem} data-reveal={i % 2 ? "1" : undefined}>
            <p className={s.provaTitulo}>{t}</p>
            <p className={s.provaTexto}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Problema({ variante }: { variante: Variante }) {
  const cards = [
    {
      titulo: "“Acho que não tenho direito”",
      texto: "É a frase mais comum, e quase sempre dita por quem nunca verificou. O direito depende da lei e da sua linha familiar, não de impressão.",
    },
    {
      titulo: "A lei mudou há pouco",
      texto: `As regras de ${variante.cidadania} mudaram recentemente. Quem decide com informação velha desiste cedo demais ou protocola errado.`,
    },
    {
      titulo: "Informação espalhada",
      texto: "Fórum, grupo de família e achismo não substituem análise. Uma verificação estruturada leva 2 minutos.",
    },
  ];
  return (
    <section className={s.secao}>
      <div className="wrap">
        <p className="etiqueta" data-reveal>
          Por que verificar agora
        </p>
        <h2 className={`titulo ${s.h2}`} data-reveal>
          A maioria nunca fez a análise. Só herdou uma opinião.
        </h2>
        <div className={s.tresCol}>
          {cards.map((c, i) => (
            <div
              key={c.titulo}
              className={`cartao ${s.card}`}
              data-reveal={i === 0 ? "" : String(i)}
            >
              <h3 className={s.cardTitulo}>{c.titulo}</h3>
              <p className={s.cardTexto}>{c.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Beneficios() {
  const itens = [
    ["Morar na Europa", "Residência legal em qualquer país da União Europeia, sem visto."],
    ["Trabalhar legalmente", "Mercado de trabalho europeu aberto, com direitos de cidadão."],
    ["Estudar pagando como local", "Universidades europeias com custo de cidadão, não de estrangeiro."],
    ["Transmitir aos filhos", "Cidadania reconhecida passa adiante. É patrimônio de família."],
    ["Passaporte europeu", "Entre os documentos de viagem mais fortes do mundo."],
    ["Direito, não favor", "Reconhecimento de algo que já é seu por descendência."],
  ];
  return (
    <section id="beneficios" className={`${s.secao} ${s.secaoCinza}`}>
      <div className="wrap">
        <p className="etiqueta" data-reveal>
          O que muda com a cidadania
        </p>
        <h2 className={`titulo ${s.h2}`} data-reveal>
          Um documento. Uma vida inteira de opções.
        </h2>
        <div className={s.seisCol}>
          {itens.map(([t, d], i) => (
            <div key={t} className={`cartao ${s.card}`} data-reveal={i % 3 === 1 ? "1" : i % 3 === 2 ? "2" : undefined}>
              <h3 className={s.cardTitulo}>{t}</h3>
              <p className={s.cardTexto}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComoFunciona() {
  const etapas = [
    ["Descubra", "Teste de 2 minutos, agora, nesta página."],
    ["Análise", "O advogado revisa seu resultado e seus documentos."],
    ["Documentos", "Certidões localizadas, traduzidas e apostiladas."],
    ["Processo", "Protocolo no órgão oficial do país, do jeito certo."],
    ["Cidadania", "Acompanhamento até o reconhecimento."],
  ];
  return (
    <section id="como-funciona" className={s.secao}>
      <div className="wrap">
        <p className="etiqueta" data-reveal>
          Como funciona
        </p>
        <h2 className={`titulo ${s.h2}`} data-reveal>
          Do teste ao reconhecimento, em cinco etapas.
        </h2>
        <ol className={s.timeline}>
          {etapas.map(([t, d], i) => (
            <li key={t} className={s.etapa} data-reveal={i % 2 ? "1" : undefined}>
              <span className={s.etapaNum}>{i + 1}</span>
              <h3 className={s.cardTitulo}>{t}</h3>
              <p className={s.cardTexto}>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CtaFinal({ variante }: { variante: Variante }) {
  return (
    <section className={`${s.secao} ${s.final}`}>
      <div className={`wrap ${s.finalMiolo}`}>
        <h2 className={`titulo ${s.finalTitulo}`} data-reveal>
          Você pode ter um direito parado na sua árvore genealógica.
        </h2>
        <p className={s.finalSub} data-reveal="1">
          Descobrir é gratuito e leva 2 minutos. {variante.pais} pode estar a
          um teste de distância.
        </p>
        <a className={`btn btn-acao ${s.finalBtn}`} href="#contato" data-reveal="1">
          {variante.hero.ctaQuiz}
        </a>
      </div>
    </section>
  );
}
