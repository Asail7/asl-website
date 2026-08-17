import Link from "next/link";
import "@/app/globals.css";

/**
 * Root-level 404. It sits outside the [locale] segment, so it carries its own
 * document shell and stays bilingual in the simplest possible way.
 */
export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main
          id="main"
          className="container"
          style={{
            minHeight: "100dvh",
            display: "grid",
            alignContent: "center",
            justifyItems: "start",
            gap: "1.25rem",
          }}
        >
          <span className="brand" style={{ fontSize: "1.6rem" }}>
            ASL
            <i className="brand__dot" />
          </span>
          <h1 style={{ fontSize: "var(--fs-h2)" }}>الصفحة غير موجودة.</h1>
          <p className="lead">
            الرابط الذي فتحته لم يعد متاحًا — لكن الصفحة الرئيسية في انتظارك.
            <br />
            <span lang="en" dir="ltr" style={{ display: "inline-block", marginBlockStart: ".5rem" }}>
              That page doesn&apos;t exist. The homepage is still here.
            </span>
          </p>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
            <Link className="btn" href="/ar">
              الصفحة الرئيسية
            </Link>
            <Link className="btn btn--ghost" href="/en" lang="en" dir="ltr">
              Homepage
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
