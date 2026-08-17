import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import type { Dictionary } from "@/lib/i18n";

export default function ValueProps({ t }: { t: Dictionary }) {
  return (
    <section className="section value">
      <div className="container">
        <SectionHead
          index={t.value.index}
          label={t.value.label}
          title={t.value.title}
          subtitle={t.value.subtitle}
        />
      </div>

      <div className="container">
        <div className="value-grid">
          {t.value.items.map((item, i) => (
            <Reveal className="value-item" key={item.num} delay={i * 70}>
              <span className="value-item__num numeral" aria-hidden="true">
                {item.num}
              </span>
              <h3 className="value-item__title">{item.title}</h3>
              <p className="value-item__desc">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
