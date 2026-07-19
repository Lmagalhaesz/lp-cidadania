import type { Variante } from "./tipos";

/**
 * CIDADANIA ITALIANA — pós Decreto Tajani (Lei 74/2025, art. 3-bis).
 * Base jurídica: docs/pesquisa/italiana.md. Afirmações de elegibilidade
 * flagadas em docs/VALIDACOES.md: nada vai ao ar sem o aval do advogado.
 * Ângulo: a lei mudou de verdade em 2025; a urgência aqui é da LEI, não
 * de contador regressivo.
 */
export const italiana: Variante = {
  slug: "cidadania-italiana",
  pais: "Itália",
  cidadania: "cidadania italiana",
  idPayload: "italiana",

  seo: {
    titulo: "Cidadania italiana depois da lei de 2025: verifique seu direito",
    descricao:
      "A Lei 74/2025 limitou o reconhecimento a filhos e netos. Teste de elegibilidade gratuito e análise por advogado: veja se o seu caso segue pela via administrativa ou judicial.",
  },

  hero: {
    etiqueta: "Cidadania italiana · análise de elegibilidade",
    titulo: "A lei da cidadania italiana mudou. {destaque}",
    tituloDestaque: "O seu direito pode ter sobrevivido.",
    sub: "Desde 2025, o reconhecimento automático parou nos filhos e netos de italiano. Bisneto virou, em regra, caso judicial. Muita assessoria segue vendendo o processo antigo como se nada tivesse acontecido. Antes de pagar qualquer coisa a alguém, veja em 2 minutos onde o seu caso caiu nesse novo mapa.",
    fato: {
      texto:
        "Lei nº 74, de 23 de maio de 2025 (art. 3-bis): pedidos novos, em regra, só para filho ou neto de cidadão exclusivamente italiano. Quem protocolou até 27/03/2025, 23h59 de Roma, mantém a regra antiga.",
      fonte:
        "Gazzetta Ufficiale n. 118/2025 · Corte Constitucional, Sentença 63/2026",
    },
    ctaQuiz: "Verificar meu direito",
  },

  quiz: {
    etiqueta: "Teste de elegibilidade",
    titulo: "Onde o seu caso caiu no novo mapa da lei",
    sub: "Cinco perguntas, respostas da sua história de família. O resultado sai na hora e é honesto: se não houver caminho, você fica sabendo aqui, de graça.",
    perguntas: [
      {
        id: "protocolo",
        pergunta:
          "Alguém da sua linha familiar chegou a protocolar pedido de cidadania (consulado ou comune) ou entrar com ação na Itália até 27 de março de 2025?",
        ajuda: "Vale pedido apresentado, agendamento já marcado pelo consulado ou processo judicial em andamento.",
        opcoes: [
          { valor: "protocolado", rotulo: "Sim, pedido ou ação protocolados a tempo" },
          {
            valor: "fila",
            rotulo: "Estávamos na fila do consulado, sem data confirmada",
            ajuda: "Cadastro ou lista de espera, mas sem agendamento comunicado",
          },
          { valor: "nao", rotulo: "Não, nunca protocolamos nada" },
        ],
      },
      {
        id: "ascendente",
        pergunta: "Quem é o seu ascendente italiano mais próximo?",
        ajuda: "A pessoa da sua linha que nasceu na Itália (ou era cidadã italiana).",
        mostrarSe: (r) => r.protocolo === "nao",
        opcoes: [
          { valor: "pai", rotulo: "Meu pai ou minha mãe" },
          { valor: "avo", rotulo: "Meu avô ou minha avó" },
          { valor: "bisavo", rotulo: "Bisavô, bisavó ou mais distante" },
        ],
      },
      {
        id: "naturalizacao",
        pergunta:
          "Esse seu pai, mãe, avô ou avó italiano chegou a se naturalizar brasileiro em algum momento da vida?",
        ajuda: "A lei nova exige que o ascendente tenha tido somente a cidadania italiana.",
        mostrarSe: (r) => r.protocolo === "nao" && (r.ascendente === "pai" || r.ascendente === "avo"),
        opcoes: [
          { valor: "nunca", rotulo: "Não, foi cidadão italiano a vida toda" },
          { valor: "naturalizou", rotulo: "Sim, virou brasileiro" },
          { valor: "nao-sei", rotulo: "Não sei dizer" },
        ],
      },
      {
        id: "residencia",
        pergunta:
          "Seu pai ou sua mãe morou na Itália por 2 anos seguidos ou mais, já como cidadão italiano, antes de você nascer?",
        ajuda: "É a outra porta que a lei de 2025 deixou aberta.",
        mostrarSe: (r) =>
          r.protocolo === "nao" &&
          ((r.ascendente === "avo" && r.naturalizacao !== "nunca") || r.ascendente === "bisavo"),
        opcoes: [
          { valor: "sim", rotulo: "Sim" },
          { valor: "nao", rotulo: "Não" },
          { valor: "nao-sei", rotulo: "Não sei dizer" },
        ],
      },
      {
        id: "linha1948",
        pergunta:
          "Na sua linha de descendência existe mulher italiana que teve filho antes de 1948?",
        ajuda: "Linha materna antiga é uma das teses discutidas na via judicial.",
        mostrarSe: (r) =>
          r.protocolo === "nao" && r.ascendente === "bisavo" && r.residencia !== "sim",
        opcoes: [
          { valor: "sim", rotulo: "Sim" },
          { valor: "nao", rotulo: "Não" },
          { valor: "nao-sei", rotulo: "Não sei dizer" },
        ],
      },
    ],
    urgencia: {
      id: "urgencia",
      pergunta: "Se houver caminho, quando você quer começar?",
      opcoes: [
        { valor: "agora", rotulo: "Agora, quero resolver isso" },
        { valor: "3-meses", rotulo: "Nos próximos 3 meses" },
        { valor: "pesquisando", rotulo: "Ainda estou pesquisando" },
      ],
    },
    resultados: [
      {
        id: "regra-antiga",
        titulo: "Regra antiga preservada",
        texto:
          "Pedido ou ação protocolados até 27/03/2025 seguem a lei anterior, sem limite de geração. O que importa agora é a condução: documentação completa e acompanhamento até a decisão.",
        chamadaVsl: "Seu caso ficou na regra antiga. Veja o que fazer com essa vantagem.",
        tom: "aberto",
        segueFunil: true,
      },
      {
        id: "judicial-fila",
        titulo: "Possível caso judicial",
        texto:
          "Quem estava na fila do consulado sem data confirmada ficou numa zona que os tribunais italianos ainda estão discutindo. Há decisões recentes favoráveis a quem prova que tentou e foi barrado pela espera. É tese de advogado, caso a caso.",
        chamadaVsl: "Seu caso está na zona que os tribunais discutem agora. Entenda a disputa.",
        tom: "atencao",
        segueFunil: true,
      },
      {
        id: "administrativa",
        titulo: "Caminho administrativo provável",
        texto:
          "Filho ou neto de italiano que nunca teve outra cidadania é exatamente o perfil que a lei de 2025 manteve. Com a documentação certa, seu caso tende à via administrativa, no consulado.",
        chamadaVsl: "Seu caso parece se encaixar na via administrativa. Veja como ela funciona hoje.",
        tom: "aberto",
        segueFunil: true,
      },
      {
        id: "analise-documental",
        titulo: "Depende de um documento",
        texto:
          "O seu caminho existe ou não conforme a data e o registro da naturalização do seu ascendente. Isso não se descobre em teste de site: se descobre em certidão. É a primeira coisa que a análise verifica.",
        chamadaVsl: "Seu caso depende de um documento específico. Saiba qual e onde ele mora.",
        tom: "atencao",
        segueFunil: true,
      },
      {
        id: "judicial",
        titulo: "Caso para a via judicial",
        texto:
          "Pela lei atual, bisnetos e gerações seguintes ficaram fora da via administrativa. Existem teses em disputa nos tribunais italianos para casos como o seu, algumas com decisões recentes favoráveis. É caminho real, mas é caminho de processo, com risco e prazo próprios.",
        chamadaVsl: "Seu caso hoje é judicial. Entenda as teses que estão vivas e o que elas exigem.",
        tom: "atencao",
        segueFunil: true,
      },
      {
        id: "sem-direito",
        titulo: "Provavelmente sem caminho hoje",
        texto:
          "Sendo direto com você: com as respostas que deu, a lei atual não oferece caminho administrativo e as teses judiciais conhecidas não se aplicam. Preferimos dizer isso agora a vender esperança.",
        chamadaVsl: "Veja por que a lei de 2025 fechou esse caminho e o que ainda pode mudar.",
        tom: "negativo",
        segueFunil: false,
        orientacao:
          "O cenário pode mudar: há questões pendentes na Corte Constitucional italiana e projetos em discussão. Guarde as certidões da família (nascimento, casamento, óbito do ascendente italiano). Se surgir novidade na lei, são elas que abrem a porta.",
      },
    ],
    avaliar: (r) => {
      if (r.protocolo === "protocolado") return "regra-antiga";
      if (r.protocolo === "fila") return "judicial-fila";
      if (r.ascendente === "pai" || r.ascendente === "avo") {
        if (r.naturalizacao === "nunca") return "administrativa";
        if (r.residencia === "sim") return "administrativa";
        if (r.naturalizacao === "nao-sei" || r.residencia === "nao-sei") return "analise-documental";
        return "judicial";
      }
      // bisavô ou mais distante
      if (r.residencia === "sim") return "administrativa";
      if (r.linha1948 === "sim" || r.linha1948 === "nao-sei") return "judicial";
      return "sem-direito";
    },
  },

  vsl: {
    etiqueta: "A análise em vídeo",
    titulo: "O que a lei de 2025 mudou de verdade, explicado por quem conduz processos",
    sub: "Sem rodeio: quem manteve o direito, quem foi pro judicial, o que um processo sério exige de documento, tempo e investimento, e pra quem esse trabalho não é.",
    idVideo: "",
  },

  metodo: {
    etiqueta: "Como o trabalho funciona",
    titulo: "Processo jurídico se conduz assim",
    etapas: [
      {
        titulo: "Análise da linha e dos documentos",
        texto:
          "Reconstruímos sua linha até o ascendente italiano: certidões brasileiras de inteiro teor, registro do comune na Itália, prova de que a naturalização não quebrou a corrente.",
      },
      {
        titulo: "Definição da via",
        texto:
          "Administrativa no consulado, quando a lei de 2025 mantém seu perfil. Judicial na Itália, quando o caso exige tese. A escolha é técnica, não comercial.",
      },
      {
        titulo: "Dossiê e protocolo",
        texto:
          "Tradução juramentada, apostilamento e protocolo no órgão certo. Documento devolvido por erro de forma é mês perdido na fila, então a montagem é conferida duas vezes.",
      },
      {
        titulo: "Acompanhamento até a decisão",
        texto:
          "Processo de cidadania leva de meses a anos, e a fila é real. Você recebe o andamento a cada movimentação, do protocolo ao reconhecimento.",
      },
    ],
  },

  filtro: {
    titulo: "Esse trabalho não é pra você se",
    itens: [
      "Você quer promessa de cidadania garantida. Nenhum advogado sério assina isso, e quem assina não é advogado.",
      "Você procura o menor preço, não o processo bem feito. Existe assessoria mais barata; refazer processo devolvido custa mais caro.",
      "Você não tem nenhum ascendente italiano na linha. Sem o vínculo de sangue, não há tese que invente o direito.",
      "Você precisa do passaporte em 90 dias. A fila do consulado e do tribunal não anda no prazo de ninguém.",
    ],
  },

  faq: [
    {
      pergunta: "A cidadania italiana acabou para bisnetos?",
      resposta:
        "A via administrativa, em regra, sim: a Lei 74/2025 limitou o reconhecimento a filhos e netos de cidadão exclusivamente italiano. Para bisnetos restou a via judicial, com teses que os tribunais ainda estão julgando, e exceções pontuais, como pai ou mãe que morou 2 anos na Itália. Por isso o teste desta página começa pela sua geração.",
    },
    {
      pergunta: "Protocolei antes de março de 2025. Perdi o direito?",
      resposta:
        "Não. Pedidos e ações protocolados até 27/03/2025, 23h59 de Roma, seguem a regra anterior, sem limite de geração. A Corte Constitucional confirmou esse corte em abril de 2026. Se esse é o seu caso, a prioridade é conduzir bem o processo que já existe.",
    },
    {
      pergunta: "Quanto custa o processo?",
      resposta:
        "Depende da via e do caso: número de certidões, retificações, tradução, taxa consular (hoje 600 euros por pedido) ou custas judiciais na Itália. Por isso o valor é apresentado depois da análise dos seus documentos, por escrito, antes de qualquer contratação. Desconfie de preço fechado antes de alguém olhar sua certidão.",
    },
    {
      pergunta: "Quanto tempo leva?",
      resposta:
        "Nos processos que o Dr. Gustavo conduz, já houve caso resolvido em poucos meses e caso que levou 2 anos, porque dependeu de certidão perdida e de fila de órgão público. Quem promete prazo fechado está prometendo o que não controla.",
    },
    {
      pergunta: "Como sei que isso não é golpe?",
      resposta:
        "Verificando, e você deveria verificar qualquer um antes de pagar: o número da OAB desta página é público e consultável no site do Conselho Federal (cna.oab.org.br). Advogado inscrito responde pessoalmente pelo que assina, inclusive perante a OAB. Assessoria sem advogado não responde perante ninguém.",
    },
    {
      pergunta: "Perco a cidadania brasileira?",
      resposta:
        "Não. O Brasil admite dupla nacionalidade nos casos de reconhecimento de origem, e a Itália também. Você mantém as duas.",
    },
  ],

  form: {
    etiqueta: "Análise do caso",
    titulo: "Peça a análise do seu caso",
    sub: "Nome e WhatsApp. Quem responde é o próprio advogado, com o seu resultado do teste em mãos, para dizer o que seu caso exige de documento e qual via faz sentido.",
  },

  mensagemWhatsApp: (resultadoTitulo) =>
    resultadoTitulo
      ? `Olá, Dr. Gustavo. Fiz o teste de cidadania italiana no site e meu resultado foi: ${resultadoTitulo}. Quero a análise do meu caso.`
      : "Olá, Dr. Gustavo. Vim da página de cidadania italiana e quero a análise do meu caso.",
};
