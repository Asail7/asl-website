import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

export default function About({ t }: { t: Dictionary }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about__layout">
          <Reveal>
            <div className="section-head__meta" style={{ marginBottom: "1.75rem" }}>
              <span className="section-head__index">{t.about.index}</span>
              <span className="section-head__label">{t.about.label}</span>
            </div>
            <h2 className="about__title">{t.about.title}</h2>
            <p className="about__body">{t.about.body}</p>
            <p className="about__extra">{t.about.extra}</p>
            <a className="tlink" href={t.about.linkHref} target="_blank" rel="noopener noreferrer">
              {t.about.link}
              <ArrowRight size={15} className="icon-arrow" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal from="x" delay={120} className="about__facts">
            {t.about.facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <b>{fact.label}</b>
                <span>{fact.value}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
