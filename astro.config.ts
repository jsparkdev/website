import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeNova from "starlight-theme-nova";

const sidebar = [
  createSidebarItem("튜토리얼", "tutorial", "Tutorials"),
  createSidebarItem("가이드", "guides", "Guides"),
  createSidebarItem("참조", "reference", "References"),
] satisfies Array<SidebarItem>;

const locales = {
  root: {
    label: "한국어",
    lang: "ko-KR",
  },
  en: {
    label: "English",
    lang: "en",
  },
};

const social = {
  github: "https://github.com/jsparkdev",
  "x.com": "https://x.com/jsparkdev",
  blueSky: "https://bsky.app/profile/jspark.dev",
};

type SidebarItem = {
  label: string;
  translations: Record<"en", string>;
  autogenerate: { directory: string };
};

function createSidebarItem(
  label: string,
  directory: string,
  englishLabel: string,
) {
  return {
    label,
    translations: {
      en: englishLabel,
    },
    autogenerate: { directory },
  };
}

export default defineConfig({
  site: "https://jspark.dev",
  vite: {
    build: {
      target: "esnext",
    },
  },
  integrations: [
    starlight({
      title: "Junseong Park",
      locales,
      social,
      sidebar,
      plugins: [starlightThemeNova()],
      pagination: false,
      customCss: ["./src/styles/custom.css"],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "preload",
            href: "/jetbrains-mono.woff2",
            as: "font",
            type: "font/woff2",
            crossorigin: "anonymous",
          },
        },
      ],
    }),
  ],
});
