"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { useLocaleContext } from "@/components/LocaleProvider";

/**
 * Scroll-based storytelling, kept deliberately quiet: a hairline spine fills
 * as the reader moves down, and each step marks itself once it is in view.
 */
export default function Process() {
  const { t } = useLocaleContext();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const node = wrapRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const p = (window.innerHeight * 0.72 - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, p)));

      const steps = node.querySelectorAll<HTMLElement>("[data-pstep]");
      let count = 0;
      steps.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.7) count += 1;
      });
      setActiveCount(count);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="section" id="process">
      <div className="container">
        <div className="process__layout">
          <div className="process__aside">
            <SectionHead
              index={t.process.index}
              label={t.process.label}
              title={t.process.title}
              subtitle={t.process.subtitle}
            />
          </div>

          <div className="process__steps" ref={wrapRef}>
            <div
              className="process__spine"
              style={{ "--progress": progress.toFixed(3) } as CSSProperties}
              aria-hidden="true"
            />
            {t.process.steps.map((step, i) => (
              <Reveal
                key={step.num}
                className={`pstep${i < activeCount ? " is-active" : ""}`}
                delay={i * 40}
              >
                <div data-pstep>
                  <span className="pstep__bullet numeral" aria-hidden="true">
                    {step.num}
                  </span>
                  <h3 className="pstep__title">{step.title}</h3>
                  <p className="pstep__desc">{step.description}</p>
                  <p className="pstep__detail">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
