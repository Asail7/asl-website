import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

export default function FinalCTA({ t }: { t: Dictionary }) {
  return (
    <section className="cta-band">
      <div className="container">
        <div className="cta-band__inner">
          <Reveal>
            <h2 className="cta-band__title">{t.finalCta.title}</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="cta-band__desc">{t.finalCta.description}</p>
          </Reveal>
          <Reveal delay={160}>
            <a className="btn btn--onDark" href="#contact">
              {t.finalCta.cta}
              <ArrowRight size={16} className="btn__arrow icon-arrow" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
