import {
  articles,
  AUTHOR_URL,
  BOOK_URL,
  certifications,
  clientSites,
  CREDLY_URL,
  education,
  expertise,
  GLOSSARY_URL,
  jobs,
  nav,
  quotes,
  research,
  reviews,
  reviewSources,
  services,
  skills,
  socials,
  stats,
  timeline,
  ventures,
} from "~/content";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2025-08" to "Aug 2025" */
const monthYear = (ym: string) => `${MONTHS[Number(ym.slice(5)) - 1]} ${ym.slice(0, 4)}`;
import { Clock, Email, Heading, Mark, Out, Portrait, Section } from "./bits";
import { Kinetic } from "./Kinetic";

export function Header() {
  return (
    <header className="top wrap">
      <a className="brand" href="#hello" aria-label="Mladen Terzić, back to top">
        MT
      </a>
      <nav aria-label="Sections">
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <Out className="btn small" href={BOOK_URL}>
        Book a call
      </Out>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero wrap" id="hello">
      <div className="meta-row label">
        <span>Founder &amp; CEO, Codersy</span>
        <span>Shopify Plus partner since 2025</span>
        <span>Belgrade, Serbia</span>
      </div>
      <Kinetic
        as="h1"
        label="Mladen Terzić"
        lines={[
          { text: "Mladen", k: 25.4 },
          { text: "Terzić", k: 29.8, accent: true },
        ]}
      />
      <div className="hero-foot">
        <p className="thesis">
          builds Shopify stores <span className="mark hero-mark">that sell.</span>
        </p>
        <div className="hero-side">
          <p className="lede">
            I'm a full-stack developer, Shopify expert and the founder of{" "}
            <Out className="lnk" href="https://codersy.com">
              Codersy
            </Out>
            , a Shopify Plus partner agency. I have been building online stores since 2014.
          </p>
          <div className="actions">
            <Out className="btn" href={BOOK_URL}>
              Book a call <span aria-hidden="true">↗</span>
            </Out>
            <a className="btn line" href="#portfolio">
              See the work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <Section id="about" label="About" rail={<Portrait />}>
      <p className="big">
        I started building online stores in <Mark>2014</Mark> and freelanced for nine years. In 2023 I opened{" "}
        <Mark>Codersy</Mark>, and in 2025 it became a <Mark>Shopify Plus partner</Mark>. My mission is simple: help
        businesses scale and
        thrive in e-commerce.
      </p>
      <p className="body" data-rv>
        My main objective is to meet every client's requirements at the highest possible standard. One client described
        the way I work as a “nothing is impossible” approach.
      </p>
      <p className="body" data-rv>
        Today Codersy is a team of 16, rated 5.0 across 26 client reviews. I work on custom Shopify themes, Shopify Plus
        builds, headless Hydrogen storefronts and migrations, and we publish 7 apps on the Shopify App Store. I wrote
        the{" "}
        <Out className="lnk" href={research.href}>
          Shopify Speed Report 2026
        </Out>
        , a test of 537 stores, and I review every term in the{" "}
        <Out className="lnk" href={GLOSSARY_URL}>
          Codersy Shopify Glossary
        </Out>
        .
      </p>
      <ol className="timeline" data-rv>
        {timeline.map((t) => (
          <li key={t.year}>
            <time dateTime={t.year}>{t.year}</time>
            <span>{t.text}</span>
          </li>
        ))}
      </ol>
      <div className="anchor" id="skills" data-rv>
        <p className="label cap">Expertise</p>
        <ul className="svc">
          {expertise.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
      <div className="skills" data-rv>
        {skills.map((s) => (
          <div key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.items}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" label="Experience">
      <Heading>Shipping since 2014.</Heading>
      <ol className="jobs" data-rv>
        {jobs.map((j) => (
          <li className="job" key={j.role + j.org}>
            <span className="job-role">{j.role}</span>
            <span className="job-org">{j.org}</span>
            <span className="job-when">{j.when}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" label="Education">
      <Heading>Where I studied.</Heading>
      <ol className="jobs" data-rv>
        {education.map((e) => (
          <li className="job" key={e.school}>
            <span className="job-role">{e.degree}</span>
            <span className="job-org">
              <Out href={e.href}>{e.school}</Out>
            </span>
            <span className="job-when">{e.when}</span>
          </li>
        ))}
      </ol>
      <div className="anchor" id="certifications" data-rv>
        <p className="label cap">Certifications · issued by Shopify</p>
        <ol className="list">
          {certifications.map((c) => (
            <li key={c.href}>
              <Out href={c.href}>{c.name}</Out>
              <small>
                {monthYear(c.issued)}
                {c.expires ? ` · valid to ${monthYear(c.expires)}` : ""}
              </small>
            </li>
          ))}
        </ol>
        <p className="more">
          <Out className="lnk" href={CREDLY_URL}>
            All badges on Credly ↗
          </Out>
        </p>
      </div>
    </Section>
  );
}

export function Writing() {
  return (
    <Section id="writing" label="Writing">
      <Heading>Writing and research.</Heading>
      <ul className="rows" data-rv>
        <li>
          <Out className="row plain" href={research.href}>
            <span className="row-name">{research.title}</span>
            <span className="row-meta">{research.meta}</span>
            <span className="row-go" aria-hidden="true">
              ↗
            </span>
          </Out>
        </li>
      </ul>
      <p className="body" data-rv>
        {research.summary}
      </p>
      <div data-rv>
        <p className="label cap">Recent articles on the Codersy blog</p>
        <ol className="list">
          {articles.map((a) => (
            <li key={a.href}>
              <Out href={a.href}>{a.title}</Out>
              <small>{a.when}</small>
            </li>
          ))}
        </ol>
        <p className="more">
          <Out className="lnk" href={AUTHOR_URL}>
            All my articles on Codersy ↗
          </Out>
        </p>
      </div>
    </Section>
  );
}

export function Codersy() {
  return (
    <Section id="codersy" label="Codersy">
      <Heading>The agency I founded in 2023.</Heading>
      <p className="lede" data-rv>
        We design, build and optimize Shopify stores so they sell, and so AI assistants recommend them. Shoppers now ask
        ChatGPT what to buy. We make sure your products are the answer.
      </p>
      <div className="mega io">
        <b className="num" data-count="500" data-suffix="+">
          500+
        </b>
        <span>projects</span>
      </div>
      <div className="stats">
        {stats.map((s) => (
          <div className="stat io" key={s.text}>
            <b className="num" data-count={s.count} data-suffix={s.suffix}>
              {s.count}
              {s.suffix}
            </b>
            <span>{s.text}</span>
          </div>
        ))}
      </div>
      <ul className="svc" aria-label="What Codersy does" data-rv>
        {services.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="actions">
        <Out className="btn line" href="https://codersy.com">
          Visit codersy.com <span aria-hidden="true">↗</span>
        </Out>
      </div>
    </Section>
  );
}

export function Words() {
  return (
    <Section id="feedback" label="In their words">
      <figure className="quote-big">
        <blockquote>
          <p>
            “One thing that truly sticks out by Mladen is the <Mark>‘nothing is impossible’</Mark> approach, which goes
            without saying, is an incredibly good quality to have.”
          </p>
        </blockquote>
        <figcaption className="who">
          <b>Otso Kääriäinen</b>
          <span>
            CEO, <Out href="https://aavalabs.eu/">Aavalabs</Out>
          </span>
        </figcaption>
      </figure>
      <div className="quotes" data-rv>
        {quotes.map((q) => (
          <figure key={q.name}>
            <blockquote>“{q.text}”</blockquote>
            <figcaption className="who">
              <b>{q.name}</b>
              <span>
                {q.role}, {q.href ? <Out href={q.href}>{q.org}</Out> : q.org}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div data-rv>
        <p className="label cap">From Upwork and Storetasker</p>
        <div className="quotes">
          {reviews.map((r) => (
            <figure key={r.text}>
              <blockquote>“{r.text}”</blockquote>
              <figcaption className="who">
                <b>{r.client}</b>
                <span>{r.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="more links">
          {reviewSources.map((r) => (
            <a key={r.href} className="lnk" href={r.href} target="_blank" rel="noopener nofollow">
              {r.label} ↗
            </a>
          ))}
        </p>
      </div>
    </Section>
  );
}

export function Elsewhere() {
  return (
    <Section id="elsewhere" label="Elsewhere">
      <Heading>Also mine, also built.</Heading>
      <ul className="rows" data-rv>
        {ventures.map((v) => (
          <li key={v.href}>
            <Out className="row plain" href={v.href}>
              <span className="row-name">{v.name}</span>
              <span className="row-meta">{v.anchor === v.name ? new URL(v.href).host : v.anchor}</span>
              <span className="row-go" aria-hidden="true">
                ↗
              </span>
            </Out>
          </li>
        ))}
      </ul>
      <div data-rv>
        <p className="label cap">
          Client sites from earlier years
        </p>
        <ul className="sites">
          {clientSites.map((c) => (
            <li key={c.href}>
              <Out className="lnk" href={c.href}>
                {c.name}
              </Out>
              <small>{c.kind}</small>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Contact() {
  return (
    <section className="wrap" id="contact">
      <div className="end ruled">
        <Kinetic
          label="Let's talk"
          waitForView
          lines={[
            { text: "Let’s", k: 43 },
            { text: "Talk", k: 46 },
          ]}
        />
        <div className="end-side">
          <p className="label">Contact</p>
          <p className="lede">
            Have a store to build? Book a free 30-minute call and you'll talk to me directly. Codersy replies within one
            business day.
          </p>
          <div className="actions">
            <Out className="btn" href={BOOK_URL}>
              Book a free call <span aria-hidden="true">↗</span>
            </Out>
          </div>
          <Email />
          <div className="links">
            {socials.map((s) => (
              <a key={s.href} className="lnk" href={s.href} target="_blank" rel="noopener nofollow">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="wrap">
      <nav className="foot-links" aria-label="More from Mladen">
        {ventures.map((v) => (
          <Out key={v.href} href={v.href}>
            {v.anchor}
          </Out>
        ))}
      </nav>
      <div className="foot">
        <span>© {new Date().getFullYear()} Mladen Terzić</span>
        <span>
          Belgrade, Serbia
          <Clock />
        </span>
      </div>
    </footer>
  );
}
