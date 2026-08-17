import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { Locale, dirOf, getDictionary, isLocale, locales, shared } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#f8f5f0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const base = shared.siteUrl.replace(/\/$/, "");

  return {
    metadataBase: new URL(base),
    title: {
      default: t.meta.title,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: "Asail Al Ati", url: "https://asail.is-a.dev/" }],
    creator: "Asail Al Ati",
    applicationName: "ASL",
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        ar: `${base}/ar`,
        en: `${base}/en`,
        "x-default": `${base}/ar`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "ASL",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
      url: `${base}/${locale}`,
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;
  const t = getDictionary(typed);
  const base = shared.siteUrl.replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${base}/#asl`,
        name: "ASL",
        description: t.meta.description,
        url: `${base}/${typed}`,
        image: `${base}/og.png`,
        email: shared.email,
        telephone: shared.phone,
        areaServed: "SA",
        knowsLanguage: ["ar", "en"],
        address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
        founder: {
          "@type": "Person",
          name: "Asail Al Ati",
          jobTitle: "Full Stack Web Developer",
          url: "https://asail.is-a.dev/",
          sameAs: shared.social.map((s) => s.href),
        },
        makesOffer: t.services.items.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.title, description: service.description },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/${typed}#faq`,
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <html lang={typed} dir={dirOf(typed)} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/thmanyahsans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/thmanyahserifdisplay-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {t.brand.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
