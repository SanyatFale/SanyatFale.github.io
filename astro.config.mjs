import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind(),
    mdx(),
    react({
      experimentalReactChildren: true,
    })
  ],
  vite: {
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  },
});
