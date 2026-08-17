"use client";

import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import { useLocaleContext } from "@/components/LocaleProvider";

type Errors = Partial<Record<"name" | "email" | "message" | "form", string>>;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export default function Contact() {
  const { t, shared, locale } = useLocaleContext();
  const c = t.contact;

  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = c.errors.name;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = c.errors.email;
    if (message.length < 8) next.message = c.errors.message;

    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>('[data-invalid="true"] input, [data-invalid="true"] textarea')?.focus();
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      // No key configured yet — fall back to the mail client so nothing is lost.
      const body = `${message}\n\n---\n${data.get("projectType") ?? ""}\n${data.get("budget") ?? ""}\n${name} · ${email}`;
      window.location.href = `mailto:${shared.email}?subject=${encodeURIComponent(`ASL — ${name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setSending(true);
    try {
      data.append("access_key", accessKey);
      data.append("subject", `ASL — ${name}`);
      data.append("from_name", "ASL Website");
      data.append("locale", locale);

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("submit failed");

      form.reset();
      setSent(true);
      window.setTimeout(() => successRef.current?.focus(), 60);
    } catch {
      setErrors({ form: c.errors.generic });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact__layout">
          <Reveal>
            <div className="section-head__meta" style={{ marginBottom: "1.75rem" }}>
              <span className="section-head__index">{c.index}</span>
              <span className="section-head__label">{c.label}</span>
            </div>
            <h2 className="about__title">{c.title}</h2>
            <p className="about__extra">{c.subtitle}</p>

            <div className="section-head__label" style={{ fontSize: ".75rem" }}>
              {c.directTitle}
            </div>
            <div className="contact__direct">
              <a className="contact__row" href={`mailto:${shared.email}`}>
                <Mail size={18} aria-hidden="true" />
                <div>
                  <b>{c.emailLabel}</b>
                  <span>{shared.email}</span>
                </div>
              </a>
              <a className="contact__row" href={`tel:${shared.phone}`}>
                <Phone size={18} aria-hidden="true" />
                <div>
                  <b>{c.phoneLabel}</b>
                  <span>{shared.phoneDisplay}</span>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal from="x" delay={120}>
            {sent ? (
              <div className="form form-success">
                <span className="form-success__mark" aria-hidden="true">
                  <Check size={24} />
                </span>
                <h3 ref={successRef} tabIndex={-1}>
                  {c.success.title}
                </h3>
                <p>{c.success.body}</p>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => {
                    setSent(false);
                    setErrors({});
                  }}
                >
                  {c.success.again}
                </button>
              </div>
            ) : (
              <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
                <div className="form__row">
                  <div className="field" data-invalid={Boolean(errors.name)}>
                    <label htmlFor="f-name">{c.fields.name.label}</label>
                    <input
                      id="f-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={c.fields.name.placeholder}
                      aria-describedby="e-name"
                      aria-invalid={Boolean(errors.name)}
                      required
                    />
                    <span className="field__error" id="e-name" role="alert">
                      {errors.name}
                    </span>
                  </div>

                  <div className="field" data-invalid={Boolean(errors.email)}>
                    <label htmlFor="f-email">{c.fields.email.label}</label>
                    <input
                      id="f-email"
                      name="email"
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      placeholder={c.fields.email.placeholder}
                      aria-describedby="e-email"
                      aria-invalid={Boolean(errors.email)}
                      required
                    />
                    <span className="field__error" id="e-email" role="alert">
                      {errors.email}
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="f-type">{c.fields.type.label}</label>
                  <select id="f-type" name="projectType" defaultValue="">
                    <option value="">{c.fields.type.placeholder}</option>
                    {c.types.map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field" data-invalid={Boolean(errors.message)}>
                  <label htmlFor="f-msg">{c.fields.message.label}</label>
                  <textarea
                    id="f-msg"
                    name="message"
                    placeholder={c.fields.message.placeholder}
                    aria-describedby="e-msg"
                    aria-invalid={Boolean(errors.message)}
                    required
                  />
                  <span className="field__error" id="e-msg" role="alert">
                    {errors.message}
                  </span>
                </div>

                <div className="field">
                  <label htmlFor="f-budget">
                    {c.fields.budget.label}
                    <span className="field__opt">— {c.fields.budget.optional}</span>
                  </label>
                  <select id="f-budget" name="budget" defaultValue={c.budgets[0]}>
                    {c.budgets.map((budget) => (
                      <option value={budget} key={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Honeypot — bots fill this, people never see it. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {errors.form ? (
                  <p className="field__error" role="alert">
                    {errors.form}
                  </p>
                ) : null}

                <div className="form__foot">
                  <span className="form__note">{c.responseNote}</span>
                  <button className="btn" type="submit" disabled={sending}>
                    {sending ? c.sending : c.submit}
                    <ArrowRight size={16} className="btn__arrow icon-arrow" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
