"use client";

import { useState } from "react";
import SectionHead from "@/components/ui/SectionHead";
import { useLocaleContext } from "@/components/LocaleProvider";

export default function FAQ() {
  const { t } = useLocaleContext();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section" id="faq">
      <div className="container">
        <SectionHead
          index={t.faq.index}
          label={t.faq.label}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />

        <div className="faq__list">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className="faq__item" key={item.q}>
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-p-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq__sign" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="faq__panel"
                  id={`faq-p-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  data-open={isOpen}
                >
                  <div>
                    <p className="faq__a">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
