import { useEffect, useState, type ReactNode } from "react";
import { EMAIL, PHOTO } from "~/content";

/** Section heading whose words rise out of a mask when it scrolls into view. */
export function Heading({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <h2 className="h2" data-rv aria-label={children}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="w">
            <span style={{ "--wi": i } as React.CSSProperties}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}

/** Lime marker that sweeps across the text when it scrolls into view. */
export function Mark({ children }: { children: ReactNode }) {
  return <span className="mark io">{children}</span>;
}

export function Section({
  id,
  label,
  rail,
  children,
}: {
  id: string;
  label: string;
  /** Extra content for the narrow column, under the label. */
  rail?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="wrap" id={id}>
      <div className="sec ruled">
        <div className="rail">
          <div className="rail-in">
            <p className="label">{label}</p>
            {rail}
          </div>
        </div>
        <div className="main">{children}</div>
      </div>
    </section>
  );
}

/** The headshot. Black and white to sit with the page, in colour under the pointer. */
export function Portrait() {
  return (
    <figure className="portrait" data-rv>
      <picture>
        <source type="image/avif" srcSet={`${PHOTO}.avif`} />
        <img src={`${PHOTO}.jpg`} alt="Portrait of Mladen Terzić" width={800} height={800} loading="lazy" decoding="async" />
      </picture>
    </figure>
  );
}

/** External link that opens in a new tab and stays followed (no rel="nofollow"). */
export function Out({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

/**
 * The address is written in pieces so that mail-harvesting bots, and proxies
 * that rewrite addresses they find in HTML, leave the markup alone. The mailto
 * link is attached in the browser.
 */
export function Email() {
  const address = `${EMAIL.user}@${EMAIL.domain}`;
  const [href, setHref] = useState<string>();
  const [state, setState] = useState<"idle" | "copied">("idle");
  useEffect(() => setHref(`mailto:${address}`), [address]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setState("copied");
      window.setTimeout(() => setState("idle"), 1800);
    } catch {
      window.location.href = `mailto:${address}`;
    }
  };

  return (
    <div className="mail">
      <a href={href} id="email">
        <span>{EMAIL.user}</span>
        <span>@</span>
        <span>{EMAIL.domain}</span>
      </a>
      <button className="copy" type="button" onClick={copy} aria-live="polite">
        {state === "copied" ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/** Local time in Belgrade, filled in on the client so the prerendered page carries no stale time. */
export function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Belgrade" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = window.setInterval(tick, 15000);
    return () => clearInterval(t);
  }, []);
  return time ? <span> · {time} local time</span> : null;
}

/**
 * Shown only to visitors whose system asks for reduced motion (or who have used
 * this switch before). The system setting is the default; this overrides it.
 */
export function MotionSwitch() {
  const [view, setView] = useState<{ off: boolean; fromSystem: boolean } | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("motion");
    } catch {}
    const system = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!system && !stored) return;
    const off = document.documentElement.classList.contains("rm");
    setView({ off, fromSystem: system && stored !== "off" });
    document.documentElement.classList.add("has-pill");
  }, []);

  if (!view) return null;
  const toggle = () => {
    try {
      localStorage.setItem("motion", view.off ? "on" : "off");
    } catch {}
    window.location.reload();
  };
  return (
    <div className={view.off ? "motion" : "motion quiet"}>
      {view.off && <span>{view.fromSystem ? "Motion is off to match your system" : "Motion is off"}</span>}
      <button type="button" onClick={toggle}>
        {view.off ? "Turn motion on" : "Turn motion off"}
      </button>
    </div>
  );
}
