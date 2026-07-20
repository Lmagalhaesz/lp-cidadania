import type { Metadata } from "next";
import Link from "next/link";
import { MARCA } from "@/lib/marca";
import s from "./index.module.css";

export const metadata: Metadata = {
  title: `${MARCA.nome} | Cidadania europeia conduzida por advogado`,
  alternates: { canonical: "/" },
};

/**
 * Sem home no MVP: o tráfego pago cai direto na variante. Esta rota existe
 * só como índice sóbrio (acesso direto ao domínio, QA, e link do rodapé).
 */
export default function Indice() {
  const rotas = [
    { href: "/cidadania-lituana", pais: "Lituânia", nome: "Cidadania lituana" },
    { href: "/cidadania-portuguesa", pais: "Portugal", nome: "Cidadania portuguesa" },
    { href: "/cidadania-italiana", pais: "Itália", nome: "Cidadania italiana" },
  ];
  return (
    <main className={s.pagina}>
      <div className={`wrap ${s.miolo}`}>
        <p className={s.wordmark}>{MARCA.nome}</p>
        <p className={s.descritor}>
          {MARCA.descritor} · {MARCA.oab}
        </p>
        <div className={s.lista}>
          {rotas.map((r) => (
            <Link key={r.href} className={s.item} href={r.href}>
              <span className={s.itemPais}>{r.pais}</span>
              <span className={s.itemNome}>{r.nome} ▸</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
