import type { MetadataRoute } from "next";
import { locales, shared } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = shared.siteUrl.replace(/\/$/, "");
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "ar" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}`])),
    },
  }));
}
