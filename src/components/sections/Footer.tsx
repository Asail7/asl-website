"use client";

import { ArrowUp, Github, Linkedin } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocaleContext } from "@/components/LocaleProvider";

const SOCIAL_ICON = { GitHub: Github, LinkedIn: Linkedin } as const;

export default function Footer() {
  const { t, shared } = useLocaleContext();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="brand">
              ASL
              <i className="brand__dot" aria-hidden="true" />
            </span>
            <p className="footer__tagline">{t.footer.tagline}</p>
          </div>

          <div className="footer__col">
            <h4>{t.footer.navTitle}</h4>
            <ul>
              {t.footer.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>{t.footer.contactTitle}</h4>
            <ul>
              <li>
                <a href={`mailto:${shared.email}`} dir="ltr">
                  {shared.email}
                </a>
              </li>
              <li>
                <a href={`tel:${shared.phone}`} dir="ltr">
                  {shared.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>{t.footer.socialTitle}</h4>
            <ul>
              {shared.social.map((item) => {
                const Icon = SOCIAL_ICON[item.label as keyof typeof SOCIAL_ICON];
                return (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {Icon ? <Icon size={15} aria-hidden="true" /> : null}
                      <span style={{ marginInlineStart: ".45rem" }}>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{t.footer.rights}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <LanguageSwitcher />
            <a className="to-top" href="#top">
              {t.footer.backToTop}
              <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
