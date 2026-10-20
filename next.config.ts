import type { NextConfig } from "next";

// Static export: the landing site has no server features, so Netlify serves
// plain HTML from `out/`. Netlify Forms picks up the form in public/__forms.html.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
