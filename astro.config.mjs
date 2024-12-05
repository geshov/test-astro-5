// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import { enhancedImages } from "@sveltejs/enhanced-img";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },

  integrations: [tailwind(), svelte()],

  vite: {
    plugins: [enhancedImages()],
  },
});
