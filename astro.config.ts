import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  vite: {
    build: {
      target: "esnext",
    },
  },
  integrations: [
    starlight({
      title: "History",
      locales: {
        root: {
          label: "한국어",
          lang: "ko-KR",
        },
      },
      social: {
        github: "https://github.com/jsparkdev",
      },
      sidebar: [
        {
          label: "안드로이드 개발 공부",
          autogenerate: { directory: "android" },
        },
      ],
    }),
  ],
});
