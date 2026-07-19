import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/cidadania-lituana",
    "/cidadania-portuguesa",
    "/cidadania-italiana",
    "/privacidade",
  ].map((rota) => ({
    url: `${SITE_URL}${rota}`,
    changeFrequency: "monthly",
    priority: rota === "/privacidade" ? 0.2 : 0.9,
  }));
}
