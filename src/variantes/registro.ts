import { italiana } from "./italiana";
import { lituana } from "./lituana";
import { portuguesa } from "./portuguesa";
import type { Variante } from "./tipos";

/**
 * Registro das variantes por slug. Os CLIENT components (Quiz, Vsl,
 * FormLead) recebem só o slug (string serializável) e resolvem a variante
 * aqui dentro do bundle do cliente, porque objetos com função (avaliar,
 * mostrarSe) não atravessam a fronteira server→client do React.
 */
export const VARIANTES: Record<string, Variante> = {
  [lituana.slug]: lituana,
  [portuguesa.slug]: portuguesa,
  [italiana.slug]: italiana,
};

export function variantePorSlug(slug: string): Variante {
  const v = VARIANTES[slug];
  if (!v) throw new Error(`variante desconhecida: ${slug}`);
  return v;
}
