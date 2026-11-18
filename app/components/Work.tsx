import { useEffect, useRef, useState } from "react";
import { work } from "~/content";
import { reducedMotion } from "~/lib/motion";
import { Heading } from "./bits";

/** Case studies. One row is always lit, and its number is shown at display size in the rail. */
export function Work() {
  const [active, setActive] = useState(0);
  const sec = useRef<HTMLElement>(null);
  const held = useRef(false);

  useEffect(() => {
    const el = sec.current;
    if (!el || reducedMotion()) return;
    let seen = false;
    const io = new IntersectionObserver((es) => (seen = es[0].isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const timer = window.setInterval(() => {
      if (held.current || !seen || document.hidden) return;
      setActive((i) => (i + 1) % work.length);
    }, 2800);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  const hold = (i: number) => {
    held.current = true;
    setActive(i);
  };
  const release = () => {
    held.current = false;
  };
  const current = work[active];

  return (
    <section className="wrap" id="portfolio" ref={sec}>
      <div className="sec ruled">
        <div className="rail">
          <div className="rail-in">
            <p className="label">Selected work</p>
            <p className="fig" aria-hidden="true">
              <span className="fig-clip">
                <b className="fig-num" key={active}>
                  {current.metric}
                </b>
              </span>
              <span className="fig-cap">
                {current.what}, {current.name}
              </span>
            </p>
          </div>
        </div>
        <div className="main">
          <Heading>Stores that moved the numbers.</Heading>
          <ul className="rows" data-rv>
            {work.map((w, i) => (
              <li key={w.name}>
                <a
                  className={i === active ? "row on" : "row"}
                  href={w.href}
                  target="_blank"
                  rel="noopener"
                  onPointerEnter={() => hold(i)}
                  onPointerLeave={release}
                  onFocus={() => hold(i)}
                  onBlur={release}
                >
                  <span className="row-name">{w.name}</span>
                  <span className="row-meta">{w.meta}</span>
                  <span className="row-res">
                    <b className="metric">{w.metric}</b>
                    {w.what}
                  </span>
                  <span className="row-go" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p>
            <a className="lnk" href="https://codersy.com/projects" target="_blank" rel="noopener">
              All case studies on codersy.com ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
