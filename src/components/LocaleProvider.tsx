"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary, Locale, Shared } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  dir: "rtl" | "ltr";
  axis: 1 | -1;
  t: Dictionary;
  shared: Shared;
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ value, children }: { value: Ctx; children: ReactNode }) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleContext(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocaleContext must be used inside <LocaleProvider>");
  return ctx;
}
