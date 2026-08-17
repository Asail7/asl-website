import { ArrowRight, Building2, Layers, RefreshCw, Rocket, Target, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import type { Dictionary } from "@/lib/i18n";

const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  rocket: Rocket,
  target: Target,
  user: UserRound,
  refresh: RefreshCw,
  puzzle: Layers,
};

export default function Services({ t }: { t: Dictionary }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead
          index={t.services.index}
          label={t.services.label}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="svc-grid">
          {t.services.items.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Layers;
            return (
              <Reveal className="svc" key={service.num} delay={i * 60}>
                <div className="svc__top">
                  <span className="svc__num">{service.num}</span>
                  <span className="svc__icon">
                    <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="svc__title">{service.title}</h3>
                <p className="svc__desc">{service.description}</p>
                <span className="svc__arrow" aria-hidden="true">
                  <ArrowRight size={18} className="icon-arrow" />
                </span>
                <a
                  className="svc__link"
                  href="#contact"
                  aria-label={`${service.title} — ${t.services.linkLabel}`}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
