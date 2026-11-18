import { useEffect } from "react";
import { clamp, reducedMotion } from "~/lib/motion";

function countUp(el: HTMLElement) {
  const raw = el.dataset.count ?? "0";
  const to = parseFloat(raw);
  const dec = (raw.split(".")[1] || "").length;
  const suffix = el.dataset.suffix || "";
  const t0 = performance.now();
  const step = (now: number) => {
    const p = clamp((now - t0) / 1600, 0, 1);
    el.textContent = (to * (1 - Math.pow(1 - p, 4))).toFixed(dec) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Things that happen once, when an element first scrolls into view: marker
 * sweeps (.mark.io), number count-ups (.io with [data-count]) and rises ([data-rv]).
 * Nothing is hidden until this has run, so the page is complete without it.
 */
export function useArrivals() {
  useEffect(() => {
    const root = document.documentElement;
    const all = [...document.querySelectorAll<HTMLElement>(".io, [data-rv]")];
    const arrive = (el: HTMLElement, animate: boolean) => {
      el.classList.add("in");
      if (!animate) return;
      const num = el.querySelector<HTMLElement>("[data-count]");
      if (num) countUp(num);
    };

    if (reducedMotion() || !("IntersectionObserver" in window)) {
      all.forEach((el) => arrive(el, false));
      return;
    }

    // what is already on screen stays put; only what is below the fold rises in
    for (const el of all) {
      if (el.matches("[data-rv]") && el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
    }
    root.classList.add("ready");

    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (!e.isIntersecting) continue;
          arrive(e.target as HTMLElement, true);
          io.unobserve(e.target);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -6% 0px" },
    );
    all.filter((el) => !el.matches("[data-rv].in")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
