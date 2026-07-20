import type { Variante } from "./tipos";

/**
 * CIDADANIA LITUANA — a variante que DEFINE a categoria no Brasil (quase
 * não há concorrência). Base jurídica: docs/pesquisa/lituana.md; flags em
 * docs/VALIDACOES.md. Ângulo: o direito que quase ninguém sabe que tem,
 * com dupla cidadania preservada pra quem descende da emigração pré-1990.
 */
export const lituana: Variante = {
  slug: "cidadania-lituana",
  pais: "Lituânia",
  cidadania: "cidadania lituana",
  idPayload: "lituana",

  seo: {
    titulo: "Cidadania lituana por descendência: verifique seu direito",
    descricao:
      "Filho, neto e bisneto de lituano podem restaurar a cidadania, mantendo a brasileira na maior parte dos casos. Teste de elegibilidade gratuito e análise por advogado.",
  },

  hero: {
    etiqueta: "Cidadania lituana · análise de elegibilidade",
    titulo: "Sua família saiu da Lituânia. {destaque}",
    tituloDestaque: "O direito de voltar continua no seu nome.",
    sub: "A lei lituana permite restaurar a cidadania de quem era cidadão antes de 1940, até a geração dos bisnetos. Na emigração clássica ao Brasil, você mantém a cidadania brasileira. É um direito registrado em certidões dos anos 1930, e quase nenhuma família brasileira sabe que tem. Veja em 2 minutos se a sua linha se encaixa.",
    fato: {
      texto:
        "Lei da Cidadania da Lituânia (XI-1196, art. 9): cidadão de antes de 15/06/1940 e seus filhos, netos e bisnetos podem restaurar a cidadania. Quem saiu do país antes de 11/03/1990, e seus descendentes, não precisa renunciar à brasileira.",
      fonte: "e-seimas.lrs.lt (lei consolidada) · migracija.lt, Departamento de Migração",
    },
    ctaQuiz: "Verificar meu direito",
  },

  quiz: {
    etiqueta: "Teste de elegibilidade",
    titulo: "Sua linha familiar chega na cidadania?",
    sub: "Três perguntas sobre a história da sua família. Resultado na hora, honesto: se a linha não alcançar, você fica sabendo aqui, de graça.",
    perguntas: [
      {
        id: "ascendente",
        pergunta: "Quem na sua família veio da Lituânia?",
        ajuda: "A pessoa mais próxima de você na linha direta que nasceu lá ou era cidadã lituana.",
        opcoes: [
          { valor: "pai", rotulo: "Meu pai ou minha mãe" },
          { valor: "avo", rotulo: "Meu avô ou minha avó" },
          { valor: "bisavo", rotulo: "Meu bisavô ou minha bisavó" },
          {
            valor: "trisavo",
            rotulo: "Trisavô(ó) ou mais distante",
            ajuda: "A lei alcança até bisneto; aqui a estratégia muda de figura",
          },
          { valor: "ninguem", rotulo: "Ninguém que eu saiba" },
        ],
      },
      {
        id: "saida",
        pergunta: "Como esse antepassado deixou a Lituânia?",
        ajuda: "A forma e a época da saída definem se você mantém a cidadania brasileira.",
        mostrarSe: (r) => r.ascendente !== "ninguem" && r.ascendente !== "trisavo",
        opcoes: [
          {
            valor: "emigrou",
            rotulo: "Emigrou pro Brasil (ou outro país fora da União Soviética) antes de 1990",
            ajuda: "O caso clássico: a vinda pro Brasil nos anos 1920 e 1930",
          },
          { valor: "deportado", rotulo: "Foi deportado ou exilado à força" },
          { valor: "urss", rotulo: "Saiu para outra região da antiga União Soviética" },
          { valor: "nao-sei", rotulo: "Não sei contar essa história" },
        ],
      },
      {
        id: "documentos",
        pergunta: "O que a família guarda desse antepassado?",
        ajuda: "Não elimina ninguém: o que faltar se busca nos arquivos da Lituânia.",
        mostrarSe: (r) => r.ascendente !== "ninguem" && r.ascendente !== "trisavo",
        opcoes: [
          { valor: "lituanos", rotulo: "Documento lituano (passaporte, certidão, registro antigo)" },
          { valor: "brasileiros", rotulo: "Só documentos brasileiros que citam a Lituânia" },
          { valor: "nada", rotulo: "Quase nada, mas sei nomes e datas" },
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
        id: "restauracao-dupla",
        titulo: "Restauração com dupla cidadania provável",
        texto:
          "Sua linha se encaixa no desenho clássico da lei: descendente até bisneto de cidadão pré-1940 que emigrou antes de 1990. Nesse perfil, a lei dispensa a renúncia: você restaura a cidadania lituana e segue brasileiro. O trabalho é documental: provar a cidadania do antepassado e amarrar as gerações até você, com apoio dos arquivos lituanos quando faltar papel no Brasil.",
        chamadaVsl: "Sua linha parece alcançar a restauração. Veja como o processo funciona de verdade.",
        tom: "aberto",
        segueFunil: true,
      },
      {
        id: "restauracao-analise",
        titulo: "Restauração possível, com uma trava",
        texto:
          "Sua linha alcança a restauração, mas a saída do seu antepassado para território da antiga União Soviética muda uma peça importante: a lei, nesse caso, não dispensa a renúncia à outra cidadania. Existe caminho, e ele exige decisão informada. É exatamente o tipo de caso que se resolve em análise, não em teste.",
        chamadaVsl: "Seu caso tem uma trava específica na lei. Entenda o que ela significa.",
        tom: "atencao",
        segueFunil: true,
      },
      {
        id: "pesquisa-arquivo",
        titulo: "Caso de pesquisa em arquivo",
        texto:
          "A história da saída da sua família é a peça que falta, e ela não está perdida: a Lituânia mantém arquivos do período entre as guerras com registros de passaporte, residência e emigração. Reconstruir essa história é a primeira etapa formal do processo, e há previsão legal até para provar o fato na Justiça quando o papel não basta.",
        chamadaVsl: "Seu caso começa nos arquivos lituanos. Veja como essa busca funciona.",
        tom: "atencao",
        segueFunil: true,
      },
      {
        id: "familia",
        titulo: "Caminho pela família",
        texto:
          "A lei alcança até o bisneto do cidadão pré-1940, e trineto fica fora por direito próprio. Mas há uma rota real: se o seu pai ou sua mãe (bisneto) restaurar a cidadania, os filhos nascidos depois disso já nascem lituanos, e a família inteira muda de situação. É uma decisão de planejamento familiar, e vale a conversa.",
        chamadaVsl: "Seu caso é um planejamento de família. Veja a ordem certa das etapas.",
        tom: "atencao",
        segueFunil: true,
      },
      {
        id: "sem-direito",
        titulo: "A lei lituana não te alcança hoje",
        texto:
          "Sem rodeio: sem um antepassado lituano identificado na linha direta, a via da descendência não existe. Preferimos dizer isso agora a cobrar pra descobrir depois.",
        chamadaVsl: "Veja como a lei lituana desenha o direito e por que ele não alcança este caso.",
        tom: "negativo",
        segueFunil: false,
        orientacao:
          "Sobrenome de origem lituana na família é pista, não prova, mas é pista: certidões antigas de cartório e registros de imigração (como os do porto de Santos) às vezes revelam origem que a memória da família perdeu. Se encontrar qualquer documento nessa direção, refaça o teste.",
      },
    ],
    avaliar: (r) => {
      if (r.ascendente === "ninguem") return "sem-direito";
      if (r.ascendente === "trisavo") return "familia";
      if (r.saida === "emigrou" || r.saida === "deportado") return "restauracao-dupla";
      if (r.saida === "urss") return "restauracao-analise";
      return "pesquisa-arquivo";
    },
  },

  vsl: {
    etiqueta: "A análise em vídeo",
    titulo: "O direito que a sua família nem sabe que guarda, explicado por quem conduz processos",
    sub: "Por que a lei lituana devolve a cidadania até o bisneto, quando a brasileira fica intacta, o que os arquivos de Vilnius guardam sobre a sua família, e o que um processo sério exige. E pra quem esse trabalho não é.",
    idVideo: "",
  },

  metodo: {
    etiqueta: "Como o trabalho funciona",
    titulo: "Processo jurídico se conduz assim",
    etapas: [
      {
        titulo: "Análise da linha e dos documentos",
        texto:
          "Identificamos o antepassado lituano e o que existe de prova: documento da época, certidão brasileira citando a origem, registro de imigração. O que faltar, buscamos nos arquivos estatais da Lituânia.",
      },
      {
        titulo: "Prova da cidadania pré-1940",
        texto:
          "A lei aceita passaporte da época, registros de serviço e residência e até prova subsidiária. Quando o papel não basta, existe caminho judicial para estabelecer o fato. Essa peça define o processo.",
      },
      {
        titulo: "Dossiê e protocolo no MIGRIS",
        texto:
          "Certidões apostiladas, tradução juramentada para o lituano e protocolo eletrônico no sistema oficial de migração, com entrega de originais pelo consulado.",
      },
      {
        titulo: "Acompanhamento até a decisão",
        texto:
          "O órgão de migração lituano examina o pedido em até 12 meses. Você recebe o andamento a cada fase, sem caçar informação em site estrangeiro.",
      },
    ],
  },

  filtro: {
    titulo: "Esse trabalho não é pra você se",
    itens: [
      "Você quer promessa de cidadania garantida. A decisão é de órgão público lituano; quem garante resultado está inventando.",
      "Você procura o menor preço, não o processo bem feito. Dossiê devolvido por tradução ou apostila errada é um ano de fila perdido.",
      "Você não tem nenhum vínculo lituano na família. Sem o antepassado, não há o que restaurar.",
      "Você precisa do passaporte em poucos meses. Só o exame oficial leva até 12 meses, fora a fase de documentos.",
    ],
  },

  faq: [
    {
      pergunta: "Bisneto tem direito mesmo?",
      resposta:
        "Tem, e isso está no texto da lei: a definição legal de descendente inclui filho, neto e bisneto de quem era cidadão lituano antes de 15/06/1940. Trineto fica fora por direito próprio, mas a família pode planejar em etapas: o bisneto restaura, e os filhos que nascerem depois já nascem lituanos.",
    },
    {
      pergunta: "Vou ter que abrir mão da cidadania brasileira?",
      resposta:
        "Na maior parte dos casos de descendência, não. A lei dispensa a renúncia para quem saiu da Lituânia antes de 11/03/1990 e seus descendentes, o que cobre a emigração clássica ao Brasil dos anos 1920 e 1930. A exceção relevante é a linha que saiu para território da antiga União Soviética depois de 1940. O teste desta página já separa os dois casos.",
    },
    {
      pergunta: "Minha família não guardou nenhum documento lituano. Acabou?",
      resposta:
        "Não. A Lituânia mantém arquivos estatais do período entre as guerras: registros de passaporte, residência, serviço militar e emigração. Boa parte dos processos começa exatamente com essa busca. E quando o documento não basta, a própria lei prevê estabelecer o fato pela via judicial.",
    },
    {
      pergunta: "Quanto custa o processo?",
      resposta:
        "A taxa oficial do pedido de restauração é de 120 euros. O custo total depende do caso: busca em arquivo, certidões, apostilamento, tradução juramentada para o lituano e os honorários, apresentados por escrito depois da análise dos documentos, antes de qualquer contratação.",
    },
    {
      pergunta: "Quanto tempo leva?",
      resposta:
        "O exame oficial do pedido leva até 12 meses. Antes vem a fase documental, e é ela quem manda no calendário: o que estica um processo é certidão que ninguém sabia onde estava ou resposta de arquivo no exterior. Prazo fechado, ninguém sério promete.",
    },
    {
      pergunta: "Como sei que isso não é golpe?",
      resposta:
        "Verifique antes de pagar, aqui e em qualquer lugar: o número da OAB desta página é consultável publicamente no site do Conselho Federal (cna.oab.org.br). Advogado inscrito responde pessoalmente pelo que assina. E desconfie de quem promete passaporte europeu com prazo e resultado garantidos: órgão público não assina contrato com assessoria.",
    },
  ],

  form: {
    etiqueta: "Análise do caso",
    titulo: "Peça a análise do seu caso",
    sub: "Nome e WhatsApp. Quem responde é o próprio advogado, com o seu resultado do teste em mãos, para dizer o que a sua linha exige de documento e por onde começar.",
  },

  mensagemWhatsApp: (resultadoTitulo) =>
    resultadoTitulo
      ? `Olá, Dr. Gustavo. Fiz o teste de cidadania lituana no site e meu resultado foi: ${resultadoTitulo}. Quero a análise do meu caso.`
      : "Olá, Dr. Gustavo. Vim da página de cidadania lituana e quero a análise do meu caso.",
};
