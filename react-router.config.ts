import type { Config } from "@react-router/dev/config";

// The site is one page of static content, so it is rendered to HTML at build
// time. Every link is in the markup crawlers receive; no server runs in production.
export default {
  ssr: false,
  prerender: true,
} satisfies Config;
