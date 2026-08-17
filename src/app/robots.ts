import type { MetadataRoute } from "next";
import { shared } from "@/lib/i18n";

export default function robots(): MetadataRoute.Robots {
  const base = shared.siteUrl.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
