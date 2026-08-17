import { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE, defaultLocale, isLocale, locales } from "@/lib/i18n";

/**
 * Sends every un-prefixed request to a locale route.
 * Preference order: saved cookie → Accept-Language → Arabic.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const alreadyLocalised = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (alreadyLocalised) return NextResponse.next();

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";

  const locale = isLocale(saved) ? saved : accept.startsWith("en") ? "en" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|fonts|images|.*\\.[\\w]+$).*)"],
};
