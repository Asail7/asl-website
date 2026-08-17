import type { Dictionary } from "@/lib/i18n";

export default function TrustStrip({ t }: { t: Dictionary }) {
  // Two identical groups make the marquee loop seamlessly at -50%.
  const group = [...t.trust.items, ...t.trust.items];

  return (
    <div className="trust" aria-label={t.trust.items.join(" · ")}>
      <div className="trust__track">
        {[0, 1].map((g) => (
          <div className="trust__group" key={g} aria-hidden="true">
            {group.map((item, i) => (
              <span className="trust__item" key={`${g}-${i}`}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
