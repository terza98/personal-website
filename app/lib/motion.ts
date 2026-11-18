// One animation loop for the whole page. Components subscribe to it and get the
// time, the smoothed scroll velocity and the pointer position on every frame.

export type Frame = {
  now: number;
  /** frame length relative to 60fps, clamped */
  f: number;
  /** smoothed scroll velocity in px per frame */
  vel: number;
  /** last meaningful scroll direction, 1 or -1 */
  dir: number;
  px: number;
  py: number;
  /** 0..1, how much the pointer currently drives the type */
  pointer: number;
};

type Sub = (frame: Frame) => void;

const subs = new Set<Sub>();
const frame: Frame = { now: 0, f: 1, vel: 0, dir: 1, px: -9999, py: -9999, pointer: 0 };
let raf = 0;
let last = 0;
let lastY = 0;
let lastMove = -1e9;
let listening = false;

export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

/** True when motion is off, either from the system setting or the visitor's own choice. */
export function reducedMotion() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("rm");
}

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      frame.px = e.clientX;
      frame.py = e.clientY;
      lastMove = performance.now();
    },
    { passive: true },
  );
  document.addEventListener("pointerleave", () => (lastMove = -1e9));
  window.addEventListener("pointercancel", () => (lastMove = -1e9));
}

function tick(now: number) {
  frame.f = last ? clamp((now - last) / 16.67, 0.4, 2.5) : 1;
  last = now;
  frame.now = now;
  const y = window.scrollY;
  const dy = y - lastY;
  lastY = y;
  frame.vel += (dy - frame.vel) * 0.14;
  if (Math.abs(frame.vel) > 0.6) frame.dir = frame.vel > 0 ? 1 : -1;
  frame.pointer += ((now - lastMove < 3500 ? 1 : 0) - frame.pointer) * 0.06;
  for (const fn of subs) fn(frame);
  raf = subs.size ? requestAnimationFrame(tick) : 0;
}

export function subscribe(fn: Sub) {
  subs.add(fn);
  if (!raf) {
    listen();
    last = 0;
    lastY = window.scrollY;
    raf = requestAnimationFrame(tick);
  }
  return () => {
    subs.delete(fn);
  };
}

/** Run `fn` now and again whenever the fonts finish loading or the window is resized. */
export function onLayout(fn: () => void) {
  let t = 0;
  let alive = true;
  const run = () => alive && fn();
  const resize = () => {
    clearTimeout(t);
    t = window.setTimeout(run, 80);
  };
  window.addEventListener("resize", resize);
  run();
  document.fonts?.ready.then(run);
  document.fonts?.load('800 100px "Archivo Variable"').then(run, () => {});
  return () => {
    alive = false;
    clearTimeout(t);
    window.removeEventListener("resize", resize);
  };
}
