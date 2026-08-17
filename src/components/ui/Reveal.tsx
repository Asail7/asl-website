"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useLocaleContext } from "@/components/LocaleProvider";

type Tag = "div" | "section" | "article";

type Props = {
  children: ReactNode;
  /** "up" slides in vertically, "x" slides in along the reading direction. */
  from?: "up" | "x";
  delay?: number;
  className?: string;
  as?: Tag;
};

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
} as const;

/**
 * One reveal primitive for the whole site: short, eased, and direction-aware.
 * Honours prefers-reduced-motion by rendering the final state immediately.
 */
export default function Reveal({ children, from = "up", delay = 0, className, as = "div" }: Props) {
  const { axis } = useLocaleContext();
  const reduced = useReducedMotion();

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const MotionTag = TAGS[as];
  const hidden = from === "x" ? { opacity: 0, x: 28 * axis } : { opacity: 0, y: 22 };

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
