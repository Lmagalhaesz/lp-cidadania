import type { Variante } from "./tipos";

/**
 * NACIONALIDADE PORTUGUESA — pós Lei Orgânica 1/2026 (vigor 19/05/2026).
 * Base jurídica: docs/pesquisa/portuguesa.md. Flags em docs/VALIDACOES.md.
 * Ângulo: a lei mudou HÁ DOIS MESES; neto ganhou teste e crivo, sefardita
 * acabou, bisneto continua possível em duas etapas. Urgência real: cada
 * mudança recente veio para apertar, e processo protocolado garante a
 * regra do dia do protocolo.
 */
export const portuguesa: Variante = {
  slug: "cidadania-portuguesa",
  pais: "Portugal",
  cidadania: "nacionalidade portuguesa",
  idPayload: "portuguesa",

  seo: {
    titulo: "Nacionalidade portuguesa com a lei de 2026: verifique seu direito",
    descricao:
      "A Lei da Nacionalidade mudou em maio de 2026: netos com novos requisitos, sefarditas encerrado. Teste gratuito de elegibilidade e análise por advogado.",
  },

  hero: {
    etiqueta: "Descendentes de portugueses no Brasil",
    titulo: "Descubra se você ainda tem direito à {destaque}",
    tituloDestaque: "nacionalidade portuguesa.",
    sub: "A lei mudou em 19 de maio de 2026: neto ganhou teste e crivo, a via dos sefarditas acabou. Filho segue com via direta e bisneto tem rota em duas etapas. Responda até quatro perguntas e veja na hora qual regra vale pro seu caso.",
    bullets: [
      "Resultado na hora, já pela lei nova de 2026",
      "Sem cadastro e sem custo pra descobrir",
      "Quem analisa seu caso depois é advogado, não robô",
    ],
    fato: {
      texto:
        "Lei Orgânica nº 1/2026, em vigor desde 19/05/2026: filho de português segue com atribuição direta; neto passou a cumprir também os requisitos do art. 6.º (língua, cultura, idoneidade). Processos já protocolados seguem a lei antiga.",
      fonte: "Diário da República n.º 95/2026, 1.ª série · Lei 37/81 republicada",
    },
    ctaQuiz: "Descobrir meu direito",
  },

  marquee: [
    "Lei nova desde 19/05/2026",
    "Filho: via direta intacta",
    "Neto: régua nova",
    "Bisneto: rota em duas etapas",
    "Protocolo trava a regra do dia",
    "Emolumento oficial: 175 euros",
  ],

  quiz: {
    etiqueta: "Teste de elegibilidade · 2 minutos",
    perguntas: [
      {
        id: "ascendente",
        pergunta: "Quem na sua família nasceu em Portugal?",
        ajuda: "A pessoa mais próxima de você na linha direta. Cônjuge conta por outra regra da lei.",
        opcoes: [
          { valor: "pai", rotulo: "Meu pai ou minha mãe" },
          { valor: "avo", rotulo: "Meu avô ou minha avó" },
          { valor: "bisavo", rotulo: "Bisavô, bisavó ou mais distante" },
          {
            valor: "conjuge",
            rotulo: "Ninguém, mas sou casado(a) ou vivo em união com português(a)",
          },
          { valor: "ninguem", rotulo: "Ninguém que eu saiba" },
        ],
      },
      {
        id: "perda",
        pergunta:
          "Esse avô ou avó português se naturalizou brasileiro antes de 1981?",
        ajuda: "Até 1981, naturalizar-se fazia perder a nacionalidade portuguesa. Isso muda a estratégia do caso.",
        mostrarSe: (r) => r.ascendente === "avo",
        opcoes: [
          { valor: "nao", rotulo: "Não, seguiu português" },
          { valor: "sim", rotulo: "Sim, virou brasileiro" },
          { valor: "nao-sei", rotulo: "Não sei dizer" },
        ],
      },
      {
        id: "intermediario",
        pergunta:
          "Seu pai ou sua mãe (neto do português) está vivo e toparia tirar a nacionalidade primeiro?",
        ajuda: "Bisneto chega lá em duas etapas: o neto obtém a dele, e você entra como filho de português.",
        mostrarSe: (r) => r.ascendente === "bisavo",
        opcoes: [
          { valor: "sim", rotulo: "Sim, toparia" },
          { valor: "nao", rotulo: "Não, já faleceu ou não quer" },
          { valor: "nao-sei", rotulo: "Preciso conversar com a família" },
        ],
      },
      {
        id: "tempo-uniao",
        pergunta: "Há quanto tempo vocês estão casados ou em união?",
        mostrarSe: (r) => r.ascendente === "conjuge",
        opcoes: [
          { valor: "6-anos", rotulo: "Mais de 6 anos, ou temos filhos portugueses" },
          { valor: "3-6-anos", rotulo: "Entre 3 e 6 anos" },
          { valor: "menos-3", rotulo: "Menos de 3 anos" },
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
        id: "atribuicao-filho",
        titulo: "Atribuição direta provável",
        texto:
          "Filho de português nascido no estrangeiro tem o caminho mais direto da lei, e a reforma de 2026 não mexeu nele: transcrição do nascimento, sem teste de cultura, sem crivo criminal. O trabalho aqui é documental: achar o assento do seu pai ou mãe e montar o pedido sem erro de forma.",
        chamadaVsl: "Seu caso está na porta mais direta da lei. Veja como não desperdiçar isso na fila.",
        tom: "aberto",
        segueFunil: true,
      },
      {
        id: "atribuicao-neto",
        titulo: "Elegível pela via do neto, com a régua nova",
        texto:
          "A via do neto continua aberta, mas desde 19/05/2026 exige mais: além dos laços com a comunidade portuguesa, entra teste de língua e cultura e análise de idoneidade. O governo ainda nem publicou o regulamento do teste, o prazo dele corre até agosto. Seu direito existe; a forma de exercer está sendo desenhada agora, e quem protocola bem nesse intervalo protocola na regra do dia.",
        chamadaVsl: "Seu caso é a via do neto, a que mais mudou em 2026. Entenda a régua nova.",
        tom: "aberto",
        segueFunil: true,
      },
      {
        id: "analise-perda",
        titulo: "Depende da certidão de naturalização do seu avô",
        texto:
          "Se o seu avô se naturalizou brasileiro antes de 1981, a lei da época fazia perder a nacionalidade portuguesa, e isso muda o desenho do seu caso: pode haver caminho por reaquisição ou por outra pessoa da linha. Só a certidão de naturalização responde isso, e ela é a primeira coisa que a análise busca.",
        chamadaVsl: "Seu caso depende da certidão de naturalização do seu avô. Veja o que ela decide.",
        tom: "atencao",
        segueFunil: true,
      },
      {
        id: "duas-etapas",
        titulo: "Caminho em duas etapas",
        texto:
          "Bisneto não tem porta direta na lei, mas tem rota: seu pai ou mãe obtém a nacionalidade como neto, e aí você entra como filho de português, porque a atribuição vale desde o nascimento. Funciona, e exige planejamento: são dois processos em sequência e a fila conta duas vezes.",
        chamadaVsl: "Seu caso é o de duas etapas. Veja a ordem certa pra não perder anos.",
        tom: "atencao",
        segueFunil: true,
      },
      {
        id: "aquisicao-casamento",
        titulo: "Caminho pelo casamento ou união",
        texto:
          "Casamento ou união com português há mais de 3 anos dá direito a pedir a aquisição. Acima de 6 anos de relação, ou com filhos portugueses em comum, o processo fica mais protegido contra oposição do Ministério Público. União estável exige reconhecimento judicial antes.",
        chamadaVsl: "Seu caminho é pela relação com quem já é português. Veja o que a lei pede.",
        tom: "aberto",
        segueFunil: true,
      },
      {
        id: "casamento-recente",
        titulo: "Ainda não, pelo tempo de relação",
        texto:
          "A lei pede mais de 3 anos de casamento ou união para o pedido. Antes disso, não há o que protocolar, e quem disser o contrário está vendendo processo pra arquivar.",
        chamadaVsl: "Entenda o relógio da lei pra relação com português.",
        tom: "negativo",
        segueFunil: false,
        orientacao:
          "Guarde desde já as provas da vida em comum (certidão de casamento, documentos conjuntos). Completando 3 anos, o pedido pode ser montado. Se houver outra pessoa portuguesa na sua linha familiar, refaça o teste por ela.",
      },
      {
        id: "sem-direito",
        titulo: "A lei de 2026 não abre caminho pro seu caso",
        texto:
          "A resposta honesta: sem ascendente português na linha reta e sem relação com cidadão português, a lei atual não oferece caminho por descendência. A via que resta é a residência legal em Portugal, hoje 7 anos para brasileiros.",
        chamadaVsl: "Veja o que a lei de 2026 mudou e por que esse caminho fechou.",
        tom: "negativo",
        segueFunil: false,
        orientacao:
          "Se algum dia aparecer um registro português na família (assento de batismo, certidão antiga), o quadro muda: guarde qualquer papel antigo da família e refaça o teste. Para a via de residência, o processo começa por visto e autorização de residência, outro trabalho, com outro profissional.",
      },
      {
        id: "duas-etapas-travada",
        titulo: "Rota existe, mas depende da família",
        texto:
          "A rota do bisneto passa pelo seu pai ou mãe tirar a nacionalidade primeiro. Sem essa etapa, a lei de 2026 só oferece a naturalização morando legalmente em Portugal por 5 anos. Vale a conversa em família antes de qualquer contratação: é ela que define se existe processo.",
        chamadaVsl: "Seu caso depende de uma decisão da família. Veja o que está em jogo nela.",
        tom: "atencao",
        segueFunil: true,
      },
    ],
    avaliar: (r) => {
      if (r.ascendente === "pai") return "atribuicao-filho";
      if (r.ascendente === "avo") {
        if (r.perda === "nao") return "atribuicao-neto";
        return "analise-perda";
      }
      if (r.ascendente === "bisavo") {
        if (r.intermediario === "sim") return "duas-etapas";
        if (r.intermediario === "nao-sei") return "duas-etapas-travada";
        return "duas-etapas-travada";
      }
      if (r.ascendente === "conjuge") {
        if (r["tempo-uniao"] === "menos-3") return "casamento-recente";
        return "aquisicao-casamento";
      }
      return "sem-direito";
    },
  },

  vsl: {
    etiqueta: "A análise em vídeo",
    titulo: "A régua nova do neto e a rota do bisneto, explicadas por quem conduz processos",
    sub: "O que a lei de maio de 2026 mudou, o fim dos sefarditas, a fila de centenas de milhares de pedidos e o que um pedido bem montado exige de documento, tempo e investimento. No fim, o perfil de caso que a gente recusa.",
    idVideo: "",
  },

  metodo: {
    etiqueta: "Como o trabalho funciona",
    titulo: "Processo jurídico se conduz assim",
    etapas: [
      {
        titulo: "Análise da linha e dos documentos",
        texto:
          "Localizamos o assento do seu ascendente em Portugal (conservatória ou Registos Centrais) e amarramos as gerações com certidões brasileiras de inteiro teor, apostiladas.",
      },
      {
        titulo: "Definição da via certa",
        texto:
          "Filho, neto, duas etapas ou aquisição por casamento: cada via tem requisitos e riscos próprios na lei nova. A escolha é técnica, não comercial.",
      },
      {
        titulo: "Pedido montado e protocolado",
        texto:
          "Formulários, emolumentos, procurações e o protocolo no órgão certo. Pedido devolvido por erro de forma é ano perdido numa fila de centenas de milhares.",
      },
      {
        titulo: "Acompanhamento até o registo",
        texto:
          "A nacionalidade só existe de fato com o registo lavrado. Você recebe o andamento a cada fase, sem precisar caçar informação em consulado.",
      },
    ],
  },

  filtro: {
    titulo: "Esse trabalho não é pra você se",
    itens: [
      "Você quer promessa de nacionalidade garantida. Quem garante resultado de processo público está mentindo, com ou sem sotaque de anúncio.",
      "Você procura o menor preço, não o processo bem feito. Pedido devolvido por vício de forma volta pro fim da fila.",
      "Você não tem ascendência portuguesa nem relação com cidadão português. Sem vínculo, não há pedido que se sustente.",
      "Você precisa do documento em poucos meses. A fila oficial soma centenas de milhares de pedidos; quem promete driblar isso não está sendo honesto.",
    ],
  },

  faq: [
    {
      pergunta: "O que mudou com a lei de maio de 2026?",
      resposta:
        "A Lei Orgânica 1/2026 endureceu a via do neto (teste de língua e cultura, análise de idoneidade pelo Ministério Público), encerrou o regime dos sefarditas, subiu prazos de naturalização por residência e trouxe biometria e presença física no consulado. Filho de português segue com atribuição direta, sem essas exigências. Processos protocolados antes de 19/05/2026 continuam pela lei antiga.",
    },
    {
      pergunta: "Sou bisneto. Ainda tenho direito?",
      resposta:
        "Não pela via direta, e isso não é novidade de 2026. A rota real é em duas etapas: seu pai ou mãe (neto do português) obtém a nacionalidade primeiro e você entra na sequência como filho de português. A alternativa criada em 2026 exige morar legalmente em Portugal por 5 anos. O teste desta página identifica qual das duas faz sentido pra você.",
    },
    {
      pergunta: "Quanto custa o processo?",
      resposta:
        "Os emolumentos oficiais são públicos: 175 euros na atribuição de maior de idade, gratuito para menores, 250 euros na aquisição por casamento. O valor dos honorários depende do caso (quantas certidões, retificações, procurações) e é apresentado por escrito depois da análise, antes de qualquer contratação.",
    },
    {
      pergunta: "Quanto tempo leva?",
      resposta:
        "A fila oficial é longa: os registos centrais analisavam em 2026 processos protocolados em 2022. Transcrição de filho menor tem corrido em menos de um ano. O que estica um caso, quase sempre, é documento mal amarrado, e isso dá pra controlar. O resto é fila, e fila ninguém promete.",
    },
    {
      pergunta: "Como sei que isso não é golpe?",
      resposta:
        "Verifique antes de pagar, aqui e em qualquer lugar: o número da OAB desta página é consultável publicamente no site do Conselho Federal (cna.oab.org.br). Advogado responde pessoalmente pelo que assina, inclusive perante a OAB. Quem vende processo sem advogado identificável não responde perante ninguém.",
    },
    {
      pergunta: "Perco a cidadania brasileira?",
      resposta:
        "Não. Brasil e Portugal admitem a dupla nacionalidade neste tipo de caso. Você mantém as duas.",
    },
  ],

  form: {
    etiqueta: "Análise do caso",
    titulo: "Peça a análise do seu caso",
    sub: "Nome e WhatsApp. Quem responde é o próprio advogado, com o seu resultado do teste em mãos, para dizer o que seu caso exige de documento e qual porta da lei faz sentido.",
  },

  mensagemWhatsApp: (resultadoTitulo) =>
    resultadoTitulo
      ? `Olá, Dr. Gustavo. Fiz o teste de nacionalidade portuguesa no site e meu resultado foi: ${resultadoTitulo}. Quero a análise do meu caso.`
      : "Olá, Dr. Gustavo. Vim da página de nacionalidade portuguesa e quero a análise do meu caso.",
};
