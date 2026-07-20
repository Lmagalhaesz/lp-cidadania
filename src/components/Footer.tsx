import Link from "next/link";
import { MARCA } from "@/lib/marca";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.rodape}>
      <div className={`wrap ${s.grade}`}>
        <div>
          <p className={s.wordmark}>{MARCA.nome}</p>
          <p className={s.descritor}>{MARCA.descritor}</p>
          <p className={s.meta}>
            {MARCA.oab} · {MARCA.cidade}
          </p>
        </div>
        <div className={s.colunaLegal}>
          <p className={s.aviso}>
            Conteúdo informativo sobre requisitos legais de nacionalidade.
            Cada caso depende de análise individual de documentos. Nenhum
            resultado de teste nesta página constitui parecer jurídico.
          </p>
          <Link className={s.link} href="/privacidade">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
