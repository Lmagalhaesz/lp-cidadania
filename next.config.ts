import type { NextConfig } from "next";

// Export 100% estático: gera out/ e qualquer nginx/CDN serve.
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
