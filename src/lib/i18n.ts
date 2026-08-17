import content from "@/i18n/content.json";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";
export const LOCALE_COOKIE = "asl_locale";

/** The Arabic tree is the canonical shape; the English tree mirrors it exactly. */
export type Dictionary = (typeof content)["ar"];
export type Shared = (typeof content)["shared"];

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return content[locale] as Dictionary;
}

export const shared: Shared = content.shared;

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** +1 in LTR, -1 in RTL — used to mirror horizontal motion. */
export function axisOf(locale: Locale): 1 | -1 {
  return locale === "ar" ? -1 : 1;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}
