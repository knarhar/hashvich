// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/**
 * Static build for GitHub Pages (.github/workflows/deploy.yml).
 *   Build command:    npm run build
 *   Output directory: dist
 * No adapter: the site is fully static, so Pages serves dist/ directly.
 *
 * The workflow sets SITE_URL (origin) and BASE_PATH from the Pages settings:
 * "/hashvich" on the knarhar.github.io address, "" once a custom domain is
 * set. Without SITE_URL the build still succeeds, but canonical, hreflang
 * and sitemap URLs point at the placeholder below.
 */
const SITE = process.env.SITE_URL || "https://example.com";
const BASE = process.env.BASE_PATH || "/";

export default defineConfig({
  site: SITE,
  base: BASE,
  output: "static",
  trailingSlash: "always",

  i18n: {
    locales: ["ru", "hy", "en"],
    defaultLocale: "ru",
    routing: {
      // Every locale is prefixed: /ru/, /hy/, /en/.
      prefixDefaultLocale: true,
      // Off deliberately. Astro's built-in root redirect emits a 2-second
      // meta refresh, which is slow for readers and treated as a soft
      // redirect by search engines. src/pages/index.astro does the same job
      // with a 0-second refresh and a canonical. See docs/design-gaps.md.
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // Emits xhtml:link alternates for each page from the i18n map below.
      i18n: {
        defaultLocale: "ru",
        locales: { ru: "ru", hy: "hy", en: "en" },
      },
      // The root redirect is not a real page.
      filter: (page) => new URL(page).pathname !== "/",
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
