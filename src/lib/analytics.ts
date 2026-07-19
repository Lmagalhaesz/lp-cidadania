/**
 * Rastreamento — Meta Pixel, Conversions API (CAPI), GA4 e Clarity.
 *
 * ATIVOS DO CLIENTE, não da Funnely: o Pixel/CAPI vivem na BM e na conta de
 * anúncios do advogado (decisão de arquitetura: risco isolado, dado é do
 * cliente). IDs públicos ficam aqui; o TOKEN do CAPI é secreto e vive SÓ no
 * Apps Script (Propriedades do script), nunca neste repositório.
 *
 * Vazio = o script correspondente não é injetado (deploy seguro sem configurar).
 */
export const META_PIXEL_ID = ""; // Pixel da BM do advogado (pendente — ver docs/SETUP-CLIENTE.md)
export const CLARITY_ID = ""; // opcional
export const GA4_ID = ""; // opcional

/**
 * id único por conversão. O MESMO valor vai no Pixel (navegador) e no CAPI
 * (servidor via Apps Script), pra o Meta deduplicar.
 */
export function novoEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return "ev-" + Date.now() + "-" + Math.random().toString(36).slice(2);
  }
}

/** lê um cookie (_fbp/_fbc melhoram o match do CAPI) */
export function lerCookie(nome: string): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match("(^|;)\\s*" + nome + "\\s*=\\s*([^;]+)");
  return m ? decodeURIComponent(m.pop() as string) : "";
}

type Fbq = (...args: unknown[]) => void;

export function pixelTrack(
  evento: string,
  dados: Record<string, unknown>,
  eventId: string
): void {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", evento, dados, { eventID: eventId });
}

type Gtag = (...args: unknown[]) => void;

export function ga4Event(evento: string, params: Record<string, unknown>): void {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", evento, params);
}
