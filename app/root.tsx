import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import archivoLatin from "@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url";
import archivoLatinExt from "@fontsource-variable/archivo/files/archivo-latin-ext-wdth-normal.woff2?url";
import "./styles/app.css";

import type { Route } from "./+types/root";

// The name in the hero is the first thing painted, so its font is fetched early.
// The second file holds the Ć.
export const links: Route.LinksFunction = () => [
  { rel: "preload", as: "font", type: "font/woff2", href: archivoLatin, crossOrigin: "anonymous" },
  { rel: "preload", as: "font", type: "font/woff2", href: archivoLatinExt, crossOrigin: "anonymous" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "alternate icon", href: "/favicon.ico" },
];

// Runs before the first paint: marks that scripting works, and whether motion is
// off (the system setting, unless the visitor chose otherwise on this site).
const BOOT = `(function(){var d=document.documentElement,s=null;try{s=localStorage.getItem("motion")}catch(e){}var rm=s==="on"||s==="off"?s==="off":matchMedia("(prefers-reduced-motion: reduce)").matches;d.classList.add("js");if(rm)d.classList.add("rm")})()`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="wrap oops">
      <p className="label">{notFound ? "404" : "Error"}</p>
      <h1 className="h2">{notFound ? "This page does not exist." : "Something went wrong."}</h1>
      <p>
        <a className="btn" href="/">
          Back to the start
        </a>
      </p>
    </main>
  );
}
