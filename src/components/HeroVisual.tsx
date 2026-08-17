"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useLocaleContext } from "@/components/LocaleProvider";

/**
 * Idea → Design → Code → Website, as a composition rather than a stock photo:
 * a browser frame with a miniature site inside, two spec chips, and a step
 * ribbon that advances on its own. Layers drift slightly with the pointer.
 */
export default function HeroVisual() {
  const { t } = useLocaleContext();
  const v = t.hero.visual;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % v.steps.length), 1800);
    return () => window.clearInterval(id);
  }, [reduced, v.steps.length]);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    const layers = Array.from(node.querySelectorAll<HTMLElement>(".hv__layer"));

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      for (const layer of layers) {
        const depth = Number(layer.dataset.depth ?? 1);
        layer.style.transform = `translate3d(${(-x * 10 * depth).toFixed(2)}px, ${(-y * 10 * depth).toFixed(2)}px, 0)`;
      }
    };
    const onLeave = () => layers.forEach((l) => (l.style.transform = ""));

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div className="hv" ref={ref} aria-hidden="true">
      <div className="hv__layer" data-depth="0.4">
        <div className="hv__grid" />
        <div className="hv__ring" />
      </div>

      <div className="hv__layer" data-depth="1.1">
        <div className="hv__win">
          <div className="hv__winbar">
            <div className="hv__dots">
              <i />
              <i />
              <i />
            </div>
            <div className="hv__url">{v.browserLabel}</div>
          </div>
          <div className="hv__winbody">
            <div className="hv__hl">{v.previewHeadline}</div>
            <div className="hv__bars">
              <span />
              <span />
            </div>
            <div className="hv__cards">
              <i />
              <i />
              <i />
            </div>
            <div className="hv__btn">{v.previewCta}</div>
          </div>
        </div>
        <svg className="hv__cursor" viewBox="0 0 24 24">
          <path d="m4 4 7.07 17 2.51-7.39L21 11.07z" fill="currentColor" />
        </svg>
      </div>

      <div className="hv__layer" data-depth="2.2">
        <div className="hv__chip hv__chip--type">
          <b>{v.cardTypeTitle}</b>
          <strong>{v.cardTypeValue}</strong>
        </div>
        <div className="hv__chip hv__chip--color">
          <b>{v.cardColorTitle}</b>
          <div className="hv__swatches">
            <i />
            <i />
            <i />
          </div>
          <strong style={{ fontSize: ".72rem" }}>{v.cardColorValue}</strong>
        </div>
      </div>

      <div className="hv__steps">
        {v.steps.map((label, i) => (
          <Fragment key={label}>
            <span className={i === step ? "is-active" : undefined}>{label}</span>
            {i < v.steps.length - 1 ? <em /> : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
