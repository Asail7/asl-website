"use client";

import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocaleContext } from "@/components/LocaleProvider";

export default function Navbar() {
  const { t } = useLocaleContext();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("top");

  const sectionIds = t.nav.items.map((item) => item.href.replace("#", ""));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // sectionIds is derived from static content and never changes at runtime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock the page behind the mobile sheet, and let Escape close it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="container nav__inner">
          <a className="brand" href="#top" aria-label="ASL">
            ASL
            <i className="brand__dot" aria-hidden="true" />
          </a>

          <nav aria-label={t.nav.menuTitle}>
            <ul className="nav__links">
              {t.nav.items.map((item) => (
                <li key={item.href}>
                  <a
                    className="nav__link"
                    href={item.href}
                    aria-current={active === item.href.replace("#", "") ? "true" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__end">
            <LanguageSwitcher />
            <a className="btn btn--sm nav__cta" href="#contact">
              {t.nav.cta}
              <ArrowRight size={14} className="btn__arrow icon-arrow" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="menu" id="mobile-menu" data-open={open} aria-hidden={!open}>
        <div className="container nav__inner">
          <a className="brand" href="#top" onClick={close}>
            ASL
            <i className="brand__dot" aria-hidden="true" />
          </a>
          <span />
          <div className="nav__end">
            <button
              type="button"
              className="burger"
              aria-expanded={open}
              aria-label={t.nav.closeMenu}
              onClick={close}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <nav className="container menu__body" aria-label={t.nav.menuTitle}>
          {t.nav.items.map((item, i) => (
            <a
              key={item.href}
              className="menu__link"
              href={item.href}
              onClick={close}
              style={{ transitionDelay: `${60 + i * 45}ms` }}
              tabIndex={open ? 0 : -1}
            >
              <span className="menu__num">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="container menu__foot">
          <a className="btn" href="#contact" onClick={close} tabIndex={open ? 0 : -1}>
            {t.nav.cta}
            <ArrowRight size={16} className="btn__arrow icon-arrow" aria-hidden="true" />
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}
