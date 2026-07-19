import type { Metadata } from "next";
import PaginaVariante from "@/components/PaginaVariante";
import { lituana } from "@/variantes/lituana";

export const metadata: Metadata = {
  title: lituana.seo.titulo,
  description: lituana.seo.descricao,
  alternates: { canonical: "/cidadania-lituana" },
  openGraph: {
    title: lituana.seo.titulo,
    description: lituana.seo.descricao,
    url: "/cidadania-lituana",
  },
};

export default function Pagina() {
  return <PaginaVariante variante={lituana} />;
}
