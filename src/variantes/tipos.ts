/**
 * Contrato do template "cidadania": cada variante (lituana, portuguesa,
 * italiana) é UM arquivo que implementa este tipo. Os componentes de seção
 * são white-label e só conhecem este contrato — nunca um país específico.
 *
 * Regra de conteúdo herdada da pesquisa jurídica: toda afirmação de
 * elegibilidade que aparece aqui tem fonte e flag correspondente em
 * docs/VALIDACOES.md. Errar elegibilidade causa dano real a pessoas.
 */

export type OpcaoQuiz = {
  /** id estável (vai no payload do lead) */
  valor: string;
  rotulo: string;
  /** nota curta sob a opção, quando a dúvida for comum */
  ajuda?: string;
};

export type PerguntaQuiz = {
  id: string;
  pergunta: string;
  /** microcopy de apoio (ex.: "vale pai, mãe, avô ou bisavô") */
  ajuda?: string;
  opcoes: OpcaoQuiz[];
  /**
   * Pergunta condicional: só aparece se retornar true para as respostas já
   * dadas (as árvores de elegibilidade reais ramificam por geração).
   * Ausente = sempre aparece.
   */
  mostrarSe?: (respostas: Record<string, string>) => boolean;
};

export type TomResultado = "aberto" | "atencao" | "negativo";

export type ResultadoDef = {
  /** id estável (payload + personalização): ex. "administrativa" */
  id: string;
  /** rótulo curto exibido no selo do resultado */
  titulo: string;
  /** explicação honesta do que o resultado significa */
  texto: string;
  /** frase que personaliza a seção do vídeo ("seu caso parece ser…") */
  chamadaVsl: string;
  /** aberto = selo verde; atencao = tinta; negativo = sem selo */
  tom: TomResultado;
  /**
   * false = resultado "provavelmente sem direito": mostramos orientação
   * honesta e NÃO empurramos a pessoa para o formulário/WhatsApp.
   * Qualidade > volume: este é o filtro que protege o tempo do advogado.
   */
  segueFunil: boolean;
  /** para tom negativo: o que a pessoa pode fazer mesmo assim */
  orientacao?: string;
};

export type EtapaMetodo = {
  titulo: string;
  texto: string;
};

export type PerguntaFaq = {
  pergunta: string;
  resposta: string;
};

export type Variante = {
  /** rota: /cidadania-lituana */
  slug: string;
  /** "Lituânia" */
  pais: string;
  /** "cidadania lituana" (minúsculo, meio de frase) */
  cidadania: string;
  /** id curto no payload do lead: "lituana" */
  idPayload: string;

  seo: {
    titulo: string;
    descricao: string;
  };

  hero: {
    etiqueta: string;
    /** manchete DIRETA: a promessa é descobrir o direito, não a aula de lei */
    titulo: string;
    /** trecho do título destacado em itálico serif */
    tituloDestaque: string;
    sub: string;
    /** 3 provas curtas sob a manchete (na hora, grátis, advogado) */
    bullets: string[];
    /** o concreto REAL da dobra: dado de lei com fonte (vira nota de apoio) */
    fato: { texto: string; fonte: string };
    ctaQuiz: string;
  };

  /** fatos curtos da faixa em movimento sob o hero (5-6 itens) */
  marquee: string[];

  quiz: {
    /** rótulo no topo da ficha do teste (ex. "Teste de elegibilidade") */
    etiqueta: string;
    perguntas: PerguntaQuiz[];
    /** pergunta de urgência (não afeta elegibilidade; vai no payload) */
    urgencia: PerguntaQuiz;
    resultados: ResultadoDef[];
    /**
     * Regra de decisão: recebe {perguntaId: valor} e devolve o id do
     * resultado. Mantida na variante porque a lei de cada país é diferente.
     */
    avaliar: (respostas: Record<string, string>) => string;
  };

  vsl: {
    etiqueta: string;
    /** título padrão da seção quando não há resultado de quiz */
    titulo: string;
    sub: string;
    /** ID do vídeo (YouTube unlisted/Vimeo). Vazio = placeholder "em breve". */
    idVideo: string;
  };

  metodo: {
    etiqueta: string;
    titulo: string;
    etapas: EtapaMetodo[];
  };

  /** filtro explícito: pra quem este trabalho NÃO é */
  filtro: {
    titulo: string;
    itens: string[];
  };

  faq: PerguntaFaq[];

  form: {
    etiqueta: string;
    titulo: string;
    sub: string;
  };

  /** mensagem pré-preenchida do WhatsApp (recebe o título do resultado) */
  mensagemWhatsApp: (resultadoTitulo: string | null) => string;
};
