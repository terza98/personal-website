# mladenterzic.com

Personal site of Mladen Terzić. One page, built with React Router (framework mode) and prerendered to static HTML at build time, so there is no server in production.

## Commands

```sh
npm install
npm run dev         # local development
npm run build       # writes the static site to build/client
npm test            # checks the built HTML: backlinks, search metadata, section anchors
npm run test:e2e    # drives the built site in Chrome (needs Google Chrome installed)
```

`BASE_URL=https://www.mladenterzic.com npm run test:e2e` runs the browser checks against a deployed copy.

## Where things are

- `app/content.ts` holds every word and link on the page.
- `app/components/Kinetic.tsx` is the animated name: each letter rides the width and weight axes of the Archivo variable font.
- `app/lib/motion.ts` is the single animation loop the components subscribe to.
- `app/styles/app.css` is all of the styling.

## Backlinks

The page carries followed links to other sites (Codersy, Shopify Expert Developers, Planine Srbija, ML Butik and client sites). They are listed in `app/content.ts` and again in `tests/site.test.mjs`. `npm test` fails if one disappears or gains `rel="nofollow"`, so run it before every deploy.

## Deploying

The site is hosted on Vercel (project `mladenterzic`). `vercel.json` tells Vercel to run `npm run build` and serve `build/client`.

```sh
vercel deploy          # preview
vercel deploy --prod   # production
```

## Motion

Visitors whose system asks for reduced motion get a still page and a small switch to turn motion on. Their choice is remembered in `localStorage`.
