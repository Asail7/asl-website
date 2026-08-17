import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

/** Deliberately secondary: clients buy the outcome, not the toolchain. */
export default function TechStack({ t }: { t: Dictionary }) {
  return (
    <section className="section tech" style={{ paddingBlock: "clamp(2.5rem, 4vw, 4rem)" }}>
      <div className="container">
        <Reveal className="tech__layout">
          <div>
            <h2 className="tech__title">{t.tech.title}</h2>
            <p className="tech__note">{t.tech.note}</p>
          </div>
          <ul className="tech__list">
            {t.tech.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
