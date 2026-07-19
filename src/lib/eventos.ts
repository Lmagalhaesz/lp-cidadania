/**
 * Comunicação entre client components desacoplados (mesmo padrão do
 * lp-inicial): o Quiz publica o resultado num CustomEvent; a seção do VSL
 * personaliza a chamada e o formulário anexa o resultado ao payload do lead.
 * sessionStorage guarda o último resultado pra sobreviver a reload.
 */

export const EVENTO_QUIZ = "cidadania:quiz";

export type RespostaQuiz = {
  pergunta: string;
  resposta: string;
};

export type ResultadoQuiz = {
  /** id estável do resultado (vai no payload do lead) */
  id: string;
  /** rótulo curto, ex. "Caminho administrativo provável" */
  titulo: string;
  respostas: RespostaQuiz[];
};

export function chaveQuiz(slug: string): string {
  return `quiz:${slug}`;
}

export function publicarResultado(slug: string, resultado: ResultadoQuiz): void {
  try {
    sessionStorage.setItem(chaveQuiz(slug), JSON.stringify(resultado));
  } catch {
    /* storage indisponível não pode travar o funil */
  }
  window.dispatchEvent(new CustomEvent<ResultadoQuiz>(EVENTO_QUIZ, { detail: resultado }));
}

export function lerResultado(slug: string): ResultadoQuiz | null {
  try {
    const bruto = sessionStorage.getItem(chaveQuiz(slug));
    return bruto ? (JSON.parse(bruto) as ResultadoQuiz) : null;
  } catch {
    return null;
  }
}
