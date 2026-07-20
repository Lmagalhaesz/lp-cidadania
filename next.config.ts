import type { NextConfig } from "next";

// Export 100% estático: gera out/ e qualquer nginx/CDN serve.
// BASE_PATH: usado só no deploy de preview no GitHub Pages, que serve o
// site em /<repo>. Produção (domínio próprio) builda sem a variável.
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath: process.env.BASE_PATH || undefined,
};

export default nextConfig;
