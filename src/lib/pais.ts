/** Acentos visuais por país: cores da bandeira usadas como detalhe fino
 *  (chip no hero, filete no cartão do quiz). Nunca como fundo grande. */
export const CORES_PAIS: Record<string, string[]> = {
  "Lituânia": ["#FDB913", "#006A44", "#C1272D"],
  "Portugal": ["#046A38", "#DA291C"],
  "Itália": ["#008C45", "#F4F5F0", "#CD212A"],
};

/** gradiente em faixas duras (bandeira), pra usar em background */
export function faixaBandeira(pais: string): string {
  const cores = CORES_PAIS[pais] ?? ["#046A38"];
  const passo = 100 / cores.length;
  const paradas = cores
    .map((c, i) => `${c} ${i * passo}% ${(i + 1) * passo}%`)
    .join(", ");
  return `linear-gradient(90deg, ${paradas})`;
}
