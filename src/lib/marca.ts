/**
 * MARCA — fonte única de verdade do white-label.
 *
 * Este arquivo (junto com os tokens de cor/fonte em src/app/globals.css) é o
 * contrato do template "cidadania" da Funnely: para vender a mesma estrutura
 * a outro advogado, troca-se ESTE arquivo, os tokens do globals.css e os
 * arquivos de variante em src/variantes/. Nenhum componente conhece o nome
 * do advogado diretamente.
 */

export const MARCA = {
  /** nome como aparece no wordmark do topo */
  nome: "Gustavo Ribeiro",
  /** forma de tratamento usada na copy ("o Dr. Gustavo te responde") */
  tratamento: "Dr. Gustavo Ribeiro",
  tratamentoCurto: "Dr. Gustavo",
  /**
   * ⚠️ PLACEHOLDER — número real pendente. Vai ao ar SOMENTE depois de
   * substituído (bloqueador registrado em docs/VALIDACOES.md).
   */
  oab: "OAB/SP 000.000",
  cidade: "Campinas, SP",
  /** linha de assinatura sob o wordmark */
  descritor: "Advocacia de nacionalidade e cidadania europeia",

  /** WhatsApp que recebe os leads (só dígitos, com DDI) */
  whatsapp: "5519981351969",
} as const;

/**
 * Monta o link de WhatsApp com a mensagem pré-preenchida que dá contexto ao
 * advogado: qual cidadania e qual resultado do teste a pessoa teve.
 */
export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${MARCA.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
