import Advogado from "@/components/Advogado";
import Faq from "@/components/Faq";
import Filtro from "@/components/Filtro";
import FormLead from "@/components/FormLead";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Metodo from "@/components/Metodo";
import Navbar from "@/components/Navbar";
import Quiz from "@/components/Quiz";
import ScrollFx from "@/components/ScrollFx";
import Vsl from "@/components/Vsl";
import type { Variante } from "@/variantes/tipos";

/**
 * A página inteira de uma variante, na ordem do funil:
 * gancho (Hero) → micro-compromisso (Quiz) → educação/ancoragem (VSL) →
 * confiança (Advogado, Método) → filtro → objeções (FAQ) → conversão (Form).
 */
export default function PaginaVariante({ variante }: { variante: Variante }) {
  return (
    <>
      <Navbar ctaRotulo={variante.hero.ctaQuiz} />
      <main>
        <Hero variante={variante} />
        {/* client components recebem o slug: a variante tem funções e não
            atravessa a fronteira server→client */}
        <Quiz slug={variante.slug} />
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
