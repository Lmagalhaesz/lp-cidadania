import Advogado from "@/components/Advogado";
import Faq from "@/components/Faq";
import Filtro from "@/components/Filtro";
import FormLead from "@/components/FormLead";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Quiz from "@/components/Quiz";
import ScrollFx from "@/components/ScrollFx";
import { Beneficios, ComoFunciona, CtaFinal, Problema, SocialProof } from "@/components/Secoes";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";
import type { Variante } from "@/variantes/tipos";

/**
 * A página de uma variante, na ordem de conversão:
 * Hero (promessa) → prova factual → problema → benefícios → como funciona →
 * QUIZ (elemento principal) → VSL → filtro honesto → FAQ → sobre o advogado
 * → CTA final → formulário → footer.
 */
export default function PaginaVariante({ variante }: { variante: Variante }) {
  return (
    <>
      <Navbar ctaRotulo={variante.hero.ctaQuiz} />
      <main>
        <Hero variante={variante} />
        <SocialProof />
        <Problema variante={variante} />
        <Beneficios />
        <ComoFunciona />
        {/* client components recebem o slug: a variante tem funções e não
            atravessa a fronteira server→client */}
        <Quiz slug={variante.slug} />
        <Filtro variante={variante} />
        <Faq variante={variante} />
        <Advogado variante={variante} />
        <CtaFinal variante={variante} />
        <FormLead slug={variante.slug} />
      </main>
      <Footer />
      <WhatsAppFlutuante slug={variante.slug} />
      <ScrollFx />
    </>
  );
}
