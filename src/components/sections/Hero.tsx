import { ArrowRight } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

export default function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__text">
            <Reveal className="hero__eyebrow">
              <span className="eyebrow">{t.hero.eyebrow}</span>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="hero__title">
                {t.hero.titleLead} <em>{t.hero.titleAccent}</em>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="lead hero__desc">{t.hero.description}</p>
            </Reveal>

            <Reveal delay={220} className="hero__actions">
              <a className="btn" href="#contact">
                {t.hero.primaryCta}
                <ArrowRight size={16} className="btn__arrow icon-arrow" aria-hidden="true" />
              </a>
              <a className="btn btn--ghost" href="#work">
                {t.hero.secondaryCta}
              </a>
            </Reveal>

            <Reveal delay={300} className="hero__meta">
              <span>{t.hero.scrollHint}</span>
              <i className="dot" aria-hidden="true" />
              <span>{t.about.facts[1].value}</span>
            </Reveal>
          </div>

          <Reveal from="x" delay={180}>
            <HeroVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
