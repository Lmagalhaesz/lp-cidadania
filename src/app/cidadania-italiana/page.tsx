import type { Metadata } from "next";
import PaginaVariante from "@/components/PaginaVariante";
import { italiana } from "@/variantes/italiana";

export const metadata: Metadata = {
  title: italiana.seo.titulo,
  description: italiana.seo.descricao,
  alternates: { canonical: "/cidadania-italiana" },
  openGraph: {
    title: italiana.seo.titulo,
    description: italiana.seo.descricao,
    url: "/cidadania-italiana",
  },
};

export default function Pagina() {
  return <PaginaVariante variante={italiana} />;
}
