import { h } from "vue";
import type { Theme } from "vitepress";
import Teek from "vitepress-theme-teek";

import "vitepress-theme-teek/index.css";
import "./styles/index.css";

import HeroInstall from "./components/HeroInstall.vue";
import HomeNext from "./components/HomeNext.vue";
import SponsorList from "./components/SponsorList.vue";
import SponsorTiers from "./components/SponsorTiers.vue";
import PricingTable from "./components/PricingTable.vue";

export default {
  extends: Teek,
  // 安装命令是首页的主 CTA，直接放进 Hero 的 tagline 与按钮之间，
  // 用户不必滚动就能拿到脚本。Teek 会把未知插槽透传给 VitePress 默认布局。
  Layout: () => h(Teek.Layout!, null, { "home-hero-info-after": () => h(HeroInstall) }),
  enhanceApp({ app }) {
    app.component("HomeNext", HomeNext);
    app.component("SponsorList", SponsorList);
    app.component("SponsorTiers", SponsorTiers);
    app.component("PricingTable", PricingTable);
  },
} satisfies Theme;
