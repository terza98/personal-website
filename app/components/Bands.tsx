import { useEffect, useRef } from "react";
import { bands } from "~/content";
import { clamp, onLayout, reducedMotion, subscribe } from "~/lib/motion";

function Names({ names, hidden }: { names: string[]; hidden?: boolean }) {
  return (
    <span aria-hidden={hidden || undefined}>
      {names.map((n) => (
        <span key={n} style={{ display: "contents" }}>
          <b>{n}</b>
          <i>/</i>
        </span>
      ))}
    </span>
  );
}

/** Two rows of client names that drift in opposite directions; scrolling speeds them up and leans them. */
export function Bands() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion()) return;
    const rows = [...root.querySelectorAll<HTMLElement>(".track")].map((tr, i) => ({
      tr,
      dir: i % 2 ? -1 : 1,
      pos: 0,
      half: 0,
    }));
    const stopLayout = onLayout(() => {
      for (const r of rows) r.half = (r.tr.firstElementChild as HTMLElement).offsetWidth;
    });
    let skew = 0;
    let visible = true;
    const io = new IntersectionObserver((es) => (visible = es[0].isIntersecting), { rootMargin: "120px" });
    io.observe(root);
    const stopLoop = subscribe((fr) => {
      skew += (clamp(fr.vel * 0.32, -9, 9) - skew) * 0.18;
      if (!visible) return;
      for (const r of rows) {
        if (!r.half) continue;
        const step = r.dir * fr.dir * (0.9 + Math.abs(fr.vel) * 0.6) * fr.f;
        r.pos = (((r.pos + step) % r.half) + r.half) % r.half;
        r.tr.style.transform = `translate3d(${(-r.pos).toFixed(2)}px,0,0) skewX(${(-skew * r.dir).toFixed(2)}deg)`;
      }
    });
    return () => {
      stopLayout();
      stopLoop();
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div className="wrap bands-label">
        <p className="label">Built with Codersy for</p>
      </div>
      <div className="bands" ref={ref}>
        {bands.map((names, i) => (
          <div key={i} className={i % 2 ? "band b" : "band a"}>
            <div className="track">
              <Names names={names} />
              <Names names={names} hidden />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
