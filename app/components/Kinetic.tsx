import { useEffect, useRef } from "react";
import { clamp, onLayout, reducedMotion, subscribe, type Frame } from "~/lib/motion";

type Line = {
  text: string;
  /** font size as a percentage of the column width, before any height cap */
  k: number;
  /** the line carries an accent above the capitals and needs room for it */
  accent?: boolean;
};

type Props = {
  as?: "h1" | "h2";
  label: string;
  lines: Line[];
  /** hold the letters back until the heading scrolls into view */
  waitForView?: boolean;
};

const WD_MIN = 62;
const WD_MAX = 125;
const WG_MIN = 180;
const WG_MAX = 900;

type Letter = { el: HTMLElement; e: number; last: string; cx: number; cy: number };
type LineState = { el: HTMLElement; letters: Letter[]; W: number; ow: number; mean: number; amp: number };

/**
 * A heading whose every letter rides the typeface's width and weight axes: a
 * slow wave when idle, and the letters nearest the pointer swell when it moves.
 * Each line is always exactly as wide as its column.
 */
export function Kinetic({ as: Tag = "h2", label, lines, waitForView }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const rm = reducedMotion();
    let total = 0;
    const state: LineState[] = [...root.querySelectorAll<HTMLElement>(".kl")].map((el) => {
      const letters = [...el.querySelectorAll<HTMLElement>(".kc")].map((c) => {
        total++;
        return { el: c, e: 0, last: "", cx: 0, cy: 0 };
      });
      return { el, letters, W: 0, ow: 1, mean: 93, amp: 63 };
    });

    const setVar = (L: Letter, wg: number, wd: number) => {
      const v = `"wght" ${Math.round(wg)}, "wdth" ${wd.toFixed(1)}`;
      if (v !== L.last) {
        L.last = v;
        L.el.style.fontVariationSettings = v;
      }
    };

    let visible = true;
    let started = !waitForView || rm;
    let t0 = 0;

    const pose = (fr: Pick<Frame, "now" | "px" | "py" | "pointer">, force: boolean) => {
      const t = fr.now / 1000;
      const R = Math.max(230, window.innerWidth * 0.3);
      const usePointer = fr.pointer > 0.001 && !rm;
      for (const ln of state) {
        ln.ow = ln.el.offsetWidth || 1;
        if (!usePointer) continue;
        const r = ln.el.getBoundingClientRect();
        const k = r.width / ln.ow;
        for (const L of ln.letters) {
          L.cx = r.left + (L.el.offsetLeft + L.el.offsetWidth / 2) * k;
          L.cy = r.top + r.height / 2;
        }
      }
      let gi = 0;
      for (const ln of state) {
        let sum = 0;
        for (const L of ln.letters) {
          let tgt: number;
          if (rm) {
            tgt = gi / Math.max(1, total - 1);
          } else {
            // letters start thin and bloom into the wave one after another
            const bloom = started ? clamp((fr.now - t0 - gi * 46) / 1300, 0, 1) : 0;
            const wave = 0.5 + 0.5 * Math.sin(t * 1.05 - gi * 0.62);
            tgt = wave * bloom * bloom * (3 - 2 * bloom);
            if (usePointer) {
              const q = clamp(1 - Math.hypot(L.cx - fr.px, L.cy - fr.py) / R, 0, 1);
              tgt += (q * q * (3 - 2 * q) - tgt) * fr.pointer;
            }
          }
          L.e += (tgt - L.e) * (force ? 1 : 0.14);
          sum += L.e;
          gi++;
        }
        const avg = sum / ln.letters.length;
        for (const L of ln.letters) {
          setVar(L, WG_MIN + (WG_MAX - WG_MIN) * L.e, clamp(ln.mean + ln.amp * (L.e - avg), WD_MIN, WD_MAX));
        }
        if (ln.W) ln.el.style.transform = `scaleX(${clamp(ln.W / ln.ow, 0.6, 1.5).toFixed(4)})`;
      }
    };

    // Find, for each line, the width-axis value at which it fills the column.
    const fit = () => {
      const W = root.clientWidth;
      if (!W) return;
      for (const ln of state) {
        ln.el.style.transform = "none";
        const widthAt = (wd: number) => {
          for (const L of ln.letters) setVar(L, 520, wd);
          return ln.el.offsetWidth || 1;
        };
        const lo = widthAt(WD_MIN);
        const mid = widthAt(93);
        const hi = widthAt(WD_MAX);
        let mean: number;
        if (W <= lo) mean = WD_MIN;
        else if (W >= hi) mean = WD_MAX;
        else if (W <= mid) mean = WD_MIN + ((93 - WD_MIN) * (W - lo)) / (mid - lo);
        else mean = 93 + ((WD_MAX - 93) * (W - mid)) / (hi - mid);
        ln.mean = mean;
        // the letters swing around the mean, less when it sits near an end of the axis
        ln.amp = clamp(2 * Math.min(mean - WD_MIN, WD_MAX - mean), 18, WD_MAX - WD_MIN);
        ln.W = W;
        for (const L of ln.letters) L.last = "";
      }
      const now = performance.now();
      const still = { now, px: 0, py: 0, pointer: 0 };
      pose(still, true);
      pose(still, true);
    };

    const stopLayout = onLayout(fit);

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) => {
          for (const e of es) {
            visible = e.isIntersecting;
            if (visible && !started) {
              started = true;
              t0 = performance.now();
              root.classList.remove("wait");
            }
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(root);
    } else {
      started = true;
    }
    if (!started) root.classList.add("wait");
    else t0 = performance.now();

    const stopLoop = rm ? undefined : subscribe((fr) => visible && pose(fr, false));

    return () => {
      stopLayout();
      stopLoop?.();
      io?.disconnect();
    };
  }, [waitForView]);

  return (
    <Tag className="kin" aria-label={label} ref={ref}>
      {lines.map((line) => (
        <span
          key={line.text}
          className={line.accent ? "kl accent" : "kl"}
          aria-hidden="true"
          style={{ "--k": line.k } as React.CSSProperties}
        >
          {[...line.text].map((ch, i) => (
            <span key={i} className="kc">
              {ch}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
