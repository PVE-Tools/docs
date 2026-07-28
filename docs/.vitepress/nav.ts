import type { DefaultTheme } from "vitepress";

/**
 * 顶部导航
 * 保持在 5 项以内，二级内容收进下拉，避免导航栏拥挤
 */
export const nav: DefaultTheme.NavItem[] = [
  { text: "指南", link: "/guide/", activeMatch: "/guide/" },
  { text: "高级教程", link: "/tutorial/", activeMatch: "/tutorial/" },
  { text: "更新日志", link: "/changelog/", activeMatch: "/changelog/" },
  {
    text: "支持",
    activeMatch: "/support/",
    items: [
      { text: "赞助项目", link: "/support/sponsor" },
      { text: "付费技术支持", link: "/support/pay" },
      { text: "提交插件", link: "/guide/submit-plugin" },
    ],
  },
  {
    text: "关于",
    activeMatch: "^/(about|legal)/",
    items: [
      {
        text: "项目",
        items: [
          { text: "关于本站", link: "/about/" },
          { text: "项目现状说明", link: "/about/go-version-status" },
        ],
      },
      {
        text: "法律条款",
        items: [
          { text: "用户协议 ULA/TOS", link: "/legal/ula" },
          { text: "隐私政策", link: "/legal/privacy-policy" },
        ],
      },
    ],
  },
];
