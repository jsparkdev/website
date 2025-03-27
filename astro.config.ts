import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeNova from "starlight-theme-nova";

const sidebar = [
  createSidebarItem("튜토리얼", "tutorial"),
  createSidebarItem("가이드", "guides"),
  createSidebarItem("참조", "reference"),
] satisfies Array<SidebarItem>;

const social = {
  github: "https://github.com/jsparkdev",
  "x.com": "https://x.com/jsparkdev",
  blueSky: "https://bsky.app/profile/jspark.dev",
};

type SidebarItem = {
  label: string;
  autogenerate: { directory: string };
};

function createSidebarItem(label: string, directory: string): SidebarItem {
  return {
    label,
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
      locales: {
        root: {
          label: "한국어",
          lang: "ko-KR",
        },
      },
      pagination: false,
      social,
      sidebar,
      plugins: [starlightThemeNova()],
      customCss: [
        "@fontsource-variable/jetbrains-mono",
        "./src/styles/custom.css",
      ],
    }),
  ],
});
