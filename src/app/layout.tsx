import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import Analytics from "@/components/Analytics";
import { MARCA } from "@/lib/marca";
import { GOOGLE_SITE_VERIFICATION, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/* Identidade tipográfica "dossiê de arquivo":
   Newsreader (serif editorial, títulos) + Archivo (texto e interface). */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Cidadania europeia conduzida por advogado`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: MARCA.nome }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  category: "law",
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#F6F2EA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${newsreader.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Progressive enhancement: efeitos de entrada só com JS presente */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Analytics />
        {/* Entidade: escritório de advocacia individual (todas as páginas) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Attorney",
                  "@id": `${SITE_URL}/#advogado`,
                  name: SITE_NAME,
                  url: `${SITE_URL}/`,
                  description: SITE_DESCRIPTION,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Campinas",
                    addressRegion: "SP",
                    addressCountry: "BR",
                  },
                  areaServed: { "@type": "Country", name: "Brasil" },
                  knowsLanguage: "pt-BR",
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#site`,
                  name: SITE_NAME,
                  url: `${SITE_URL}/`,
                  inLanguage: "pt-BR",
                  publisher: { "@id": `${SITE_URL}/#advogado` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
