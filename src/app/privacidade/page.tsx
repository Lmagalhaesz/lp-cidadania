import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { MARCA } from "@/lib/marca";
import s from "./privacidade.module.css";

export const metadata: Metadata = {
  title: "Política de privacidade",
  alternates: { canonical: "/privacidade" },
  robots: { index: false, follow: true },
};

const ATUALIZADO = "18 de julho de 2026";

export default function Privacidade() {
  return (
    <>
      <main className={`wrap ${s.pagina}`}>
        <p className="etiqueta">Política de privacidade</p>
        <h1 className={`titulo ${s.h1}`}>Como cuidamos dos seus dados</h1>
        <p className={s.atualizado}>Atualizada em {ATUALIZADO}</p>

        <div className={s.corpo}>
          <h2>Quem trata os dados</h2>
          <p>
            Os dados enviados por este site são tratados por {MARCA.tratamento}{" "}
            ({MARCA.oab}), {MARCA.cidade}, responsável pelo atendimento dos
            contatos recebidos.
          </p>

          <h2>O que coletamos e para quê</h2>
          <p>
            <b>Dados que você digita:</b> nome, WhatsApp e a resposta sobre
            quando pretende começar. Usamos exclusivamente para analisar seu
            caso e responder pelo WhatsApp informado.
          </p>
          <p>
            <b>Respostas do teste de elegibilidade:</b> seguem junto com o seu
            contato para que a análise chegue com contexto. O teste pode ser
            feito sem informar nenhum dado pessoal.
          </p>
          <p>
            <b>Dados de navegação:</b> a página de origem e parâmetros de
            campanha (UTM) acompanham o envio do formulário, para sabermos por
            qual anúncio você chegou. Ferramentas de medição (Meta Pixel e,
            quando ativos, Google Analytics e Microsoft Clarity) usam cookies
            para estatística de audiência e otimização de anúncios.
          </p>

          <h2>Com quem os dados ficam</h2>
          <p>
            Os contatos são armazenados em planilha privada (Google Sheets) de
            acesso restrito ao advogado. Eventos de conversão são enviados à
            Meta (Facebook/Instagram) com o telefone protegido por hash
            criptográfico, apenas para medição de anúncios. Não vendemos nem
            repassamos seus dados a terceiros para outras finalidades.
          </p>

          <h2>Seus direitos (LGPD)</h2>
          <p>
            A Lei Geral de Proteção de Dados (Lei 13.709/2018) garante acesso,
            correção e exclusão dos seus dados a qualquer momento. Basta pedir
            pelo mesmo WhatsApp em que você foi atendido, ou pelo formulário do
            site, que a exclusão é feita e confirmada.
          </p>

          <h2>Cookies</h2>
          <p>
            Os cookies usados são os das ferramentas de medição citadas acima.
            Você pode bloqueá-los nas configurações do navegador sem perder
            acesso a nenhum conteúdo do site.
          </p>
        </div>

        <a className={s.voltar} href="/">
          ‹ voltar
        </a>
      </main>
      <Footer />
    </>
  );
}
