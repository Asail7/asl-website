"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALE_COOKIE, otherLocale } from "@/lib/i18n";
import { useLocaleContext } from "@/components/LocaleProvider";

/**
 * Swaps the locale segment in the current path and remembers the choice
 * for a year, so a returning visitor lands in the language they chose.
 */
export default function LanguageSwitcher({ className = "lang" }: { className?: string }) {
  const { locale, t } = useLocaleContext();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const next = otherLocale(locale);

  function switchLanguage() {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    const target = pathname.replace(new RegExp(`^/${locale}`), `/${next}`) || `/${next}`;
    startTransition(() => {
      router.replace(target, { scroll: false });
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      className={className}
      onClick={switchLanguage}
      aria-label={t.nav.langLabel}
      lang={next}
      data-pending={pending || undefined}
    >
      {t.nav.switchTo}
    </button>
  );
}
