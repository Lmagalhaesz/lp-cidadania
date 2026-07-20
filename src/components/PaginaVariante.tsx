import Advogado from "@/components/Advogado";
import Faq from "@/components/Faq";
import Filtro from "@/components/Filtro";
import FormLead from "@/components/FormLead";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Metodo from "@/components/Metodo";
import Navbar from "@/components/Navbar";
import ScrollFx from "@/components/ScrollFx";
import Vsl from "@/components/Vsl";
import type { Variante } from "@/variantes/tipos";

/**
 * A página inteira de uma variante, na ordem do funil:
 * promessa + quiz na PRIMEIRA dobra (Hero embute o teste) → educação e
 * ancoragem (VSL) → confiança (Advogado, Método) → filtro → objeções (FAQ)
 * → conversão (Form).
 */
export default function PaginaVariante({ variante }: { variante: Variante }) {
  return (
    <>
      <Navbar ctaRotulo={variante.hero.ctaQuiz} />
      <main>
        <Hero variante={variante} />
        <Marquee variante={variante} />
        {/* client components recebem o slug: a variante tem funções e não
            atravessa a fronteira server→client */}
        <Vsl slug={variante.slug} />
        <Advogado variante={variante} />
        <Metodo variante={variante} />
        <Filtro variante={variante} />
        <Faq variante={variante} />
        <FormLead slug={variante.slug} />
      </main>
      <Footer />
      <ScrollFx />
    </>
  );
}
