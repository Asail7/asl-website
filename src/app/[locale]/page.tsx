import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/LocaleProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import ValueProps from "@/components/sections/ValueProps";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { axisOf, dirOf, getDictionary, isLocale, shared, type Locale } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;
  const t = getDictionary(typed);

  return (
    <LocaleProvider value={{ locale: typed, dir: dirOf(typed), axis: axisOf(typed), t, shared }}>
      <Navbar />
      <main id="main">
        <Hero t={t} />
        <TrustStrip t={t} />
        <Services t={t} />
        <ValueProps t={t} />
        <Process />
        <Projects t={t} />
        <About t={t} />
        <TechStack t={t} />
        <FAQ />
        <FinalCTA t={t} />
        <Contact />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
