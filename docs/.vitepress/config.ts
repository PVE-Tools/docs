import { defineConfig } from "vitepress";

import { teekConfig } from "./teek-config";
import { nav } from "./nav";
import { sidebar } from "./sidebar";

const description =
  "PVE Tools Pro 官方文档 — 面向 Proxmox VE 9.x 的一键运维脚本，覆盖换源、系统维护、虚拟机生命周期、宿主机网络、防火墙、IPv6、GPU 与 PCI 直通。";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,

  title: "PVE Tools Pro",
  titleTemplate: ":title | PVE Tools Pro",
  description,
  lang: "zh-CN",
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,
  // 死链会直接让构建失败，避免迁移过程中漏改链接
  ignoreDeadLinks: false,

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["meta", { name: "author", content: "Ciriu Networks" }],
    ["meta", { name: "keywords", content: "PVE,Proxmox VE,PVE Tools,运维脚本,GPU 直通,虚拟化" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh_CN" }],
    ["meta", { property: "og:site_name", content: "PVE Tools Pro" }],
    ["meta", { property: "og:description", content: description }],
  ],

  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true },
    container: {
      tipLabel: "提示",
      warningLabel: "注意",
      dangerLabel: "危险",
      infoLabel: "说明",
      detailsLabel: "详细信息",
    },
  },

  sitemap: {
    hostname: "https://pve.u3u.icu",
  },

  themeConfig: {
    logo: { light: "/pve-logo.svg", dark: "/pve-logo-dark.svg" },
    siteTitle: "PVE Tools Pro",

    nav,
    sidebar,

    socialLinks: [{ icon: "github", link: "https://github.com/PVE-Tools/PVE-Tools-9" }],

    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" },
          modal: {
            displayDetails: "显示详细列表",
            resetButtonTitle: "清除查询条件",
            backButtonTitle: "关闭搜索",
            noResultsText: "无法找到相关结果",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },

    outline: { level: [2, 3], label: "本页目录" },
    docFooter: { prev: "上一页", next: "下一页" },
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    externalLinkIcon: true,
    lastUpdated: {
      text: "最后更新于",
      formatOptions: { dateStyle: "short", timeStyle: "short" },
    },

    editLink: {
      pattern: "https://github.com/PVE-Tools/PVE-Tools-9/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页",
    },

    notFound: {
      title: "页面不存在",
      quote: "这里没有你要找的内容，可以从下面的入口回到正轨。",
      linkText: "返回首页",
    },
  },
});
