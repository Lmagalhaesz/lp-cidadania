import type { Metadata } from "next";
import PaginaVariante from "@/components/PaginaVariante";
import { portuguesa } from "@/variantes/portuguesa";

export const metadata: Metadata = {
  title: portuguesa.seo.titulo,
  description: portuguesa.seo.descricao,
  alternates: { canonical: "/cidadania-portuguesa" },
  openGraph: {
    title: portuguesa.seo.titulo,
    description: portuguesa.seo.descricao,
    url: "/cidadania-portuguesa",
  },
};

export default function Pagina() {
  return <PaginaVariante variante={portuguesa} />;
}
