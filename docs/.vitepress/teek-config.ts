import { defineTeekConfig } from "vitepress-theme-teek/config";

/**
 * Teek 主题配置
 *
 * 定位：文档站，不是博客。
 * 因此关闭 Teek 的博客形态（首页卡片、文章 Banner、作者/日期/字数信息、
 * 壁纸、公告、友链、评论），只保留对阅读体验有正向作用的增强：
 * 代码块、面包屑、回到顶部、页面过渡、页脚信息。
 */
export const teekConfig = defineTeekConfig({
  teekTheme: true,
  // 首页使用 VitePress 原生 home 布局，不启用 Teek 博客首页
  teekHome: false,
  vpHome: true,
  // 文章页保持 VitePress 原生风格，不套卡片
  pageStyle: "default",
  themeSize: "default",
  loading: false,

  author: { name: "Ciriu Networks", link: "https://github.com/PVE-Tools" },

  // ---------- 阅读体验增强 ----------
  // 深浅色切换的扩散动画
  viewTransition: { enabled: true, mode: "out-in", duration: 300 },
  windowTransition: true,
  anchorScroll: true,
  // 侧边栏折叠触发器会浮在正文左上角，与简约版式冲突
  sidebarTrigger: false,

  backTop: { enabled: true, content: "progress" },

  // 面包屑取的是 URL 路径段（tutorial / gpu-passthrough），中文站读起来反而是噪音，
  // 层级信息由侧边栏承担
  breadcrumb: { enabled: false },

  codeBlock: {
    enabled: true,
    collapseHeight: 900,
    overlay: false,
    langTextTransform: "lowercase",
    copiedDone: TkMessage => TkMessage.success("已复制到剪贴板"),
  },

  // ---------- 关闭博客形态 ----------
  // 分享按钮会挤占右侧目录栏顶部，文档站价值有限
  articleShare: { enabled: false },
  articleBanner: { enabled: false },
  articleAnalyze: { showInfo: false },
  articleUpdate: { enabled: false },
  wallpaper: { enabled: false },
  themeEnhance: { enabled: false },
  comment: { enabled: false },

  // ---------- 页脚 ----------
  social: [
    { icon: "mdi:github", name: "GitHub", link: "https://github.com/PVE-Tools/PVE-Tools-9" },
    { icon: "mdi:email-outline", name: "邮件联系", link: "mailto:Support@u3u.icu" },
  ],

  footerGroup: [
    {
      title: "文档",
      links: [
        { name: "使用指南", link: "/guide/" },
        { name: "功能特性", link: "/guide/features" },
        { name: "常见问题", link: "/guide/faq" },
        { name: "高级教程", link: "/tutorial/" },
      ],
    },
    {
      title: "社区",
      links: [
        { name: "问题反馈", link: "https://github.com/PVE-Tools/PVE-Tools-9/issues" },
        { name: "社区讨论", link: "https://github.com/PVE-Tools/PVE-Tools-9/discussions" },
        { name: "QQ 群", link: "https://qm.qq.com/q/pvetools" },
        { name: "Telegram", link: "https://t.me/pvetools233" },
      ],
    },
    {
      title: "支持",
      links: [
        { name: "赞助项目", link: "/support/sponsor" },
        { name: "付费技术支持", link: "/support/pay" },
        { name: "提交插件", link: "/guide/submit-plugin" },
      ],
    },
    {
      title: "法律与归档",
      links: [
        { name: "用户协议", link: "/legal/ula" },
        { name: "隐私政策", link: "/legal/privacy-policy" },
        { name: "项目现状说明", link: "/about/go-version-status" },
        { name: "关于本站", link: "/about/" },
      ],
    },
  ],

  footerInfo: {
    theme: { show: true },
    // 不设 createYear，页脚只显示当前年份，避免出现 "2026-2026"
    copyright: {
      show: true,
      suffix: "Ciriu Networks · PVE Tools Pro",
    },
  },

  // ---------- 构建插件 ----------
  vitePlugins: {
    // 侧边栏在 sidebar.ts 手写，语义比目录名推导更可控
    sidebar: false,
    // 不让插件回写 frontmatter / 永久链接，保持 Markdown 源文件干净
    autoFrontmatter: false,
    permalink: false,
    mdH1: false,
    docAnalysis: false,
  },
});
