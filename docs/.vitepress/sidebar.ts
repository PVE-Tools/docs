import type { DefaultTheme } from "vitepress";

/**
 * 侧边栏
 * 按访问路径前缀分组，每组只呈现当前语境需要的内容，跨组跳转交给顶部导航
 */
export const sidebar: DefaultTheme.Sidebar = {
  "/guide/": [
    {
      text: "开始使用",
      items: [
        { text: "使用指南", link: "/guide/" },
        { text: "功能特性", link: "/guide/features" },
        { text: "常见问题", link: "/guide/faq" },
      ],
    },
    {
      text: "参与贡献",
      items: [{ text: "提交插件", link: "/guide/submit-plugin" }],
    },
    {
      text: "继续深入",
      items: [
        { text: "高级教程", link: "/tutorial/" },
        { text: "更新日志", link: "/changelog/" },
      ],
    },
  ],

  "/tutorial/": [
    { text: "教程总览", link: "/tutorial/" },
    {
      text: "GPU 与虚拟化",
      collapsed: false,
      items: [
        { text: "Intel 核显直通", link: "/tutorial/gpu-passthrough" },
        { text: "核显虚拟化 SR-IOV", link: "/tutorial/gpu-virtualization" },
        { text: "NVIDIA vGPU 驱动说明", link: "/tutorial/nvidia-vgpu-driver-notes" },
      ],
    },
    {
      text: "系统与存储",
      collapsed: false,
      items: [
        { text: "PVE 8 升级 PVE 9", link: "/tutorial/pve-upgrade" },
        { text: "存储管理", link: "/tutorial/storage-management" },
        { text: "CPU 性能调优", link: "/tutorial/cpu-optimization" },
      ],
    },
    {
      text: "网络与运维",
      collapsed: false,
      items: [
        { text: "宿主机网络 / 防火墙 / IPv6", link: "/tutorial/host-network-firewall-ipv6" },
        { text: "VM 备份 / 迁移 / Cloud-Init", link: "/tutorial/vm-backup-migration-cloudinit" },
        { text: "误操作后的数据恢复", link: "/tutorial/data-recovery-after-mistake" },
        { text: "如何连接 PVE SSH", link: "/tutorial/how-to-connect-ssh" },
      ],
    },
  ],

  "/support/": [
    {
      text: "赞助与支持",
      items: [
        { text: "赞助项目", link: "/support/sponsor" },
        { text: "付费技术支持", link: "/support/pay" },
      ],
    },
  ],

  "/legal/": [
    {
      text: "当前生效",
      items: [
        { text: "用户协议 (ULA/TOS)", link: "/legal/ula" },
        { text: "隐私政策", link: "/legal/privacy-policy" },
      ],
    },
    {
      text: "历史版本归档",
      collapsed: true,
      items: [
        { text: "用户协议 v3.0", link: "/legal/legacy-ula" },
        { text: "服务条款 v1.2", link: "/legal/legacy-tos" },
      ],
    },
  ],

  "/about/": [
    {
      text: "关于",
      items: [
        { text: "关于本站", link: "/about/" },
        { text: "项目现状说明", link: "/about/go-version-status" },
      ],
    },
    {
      text: "历史公告",
      collapsed: true,
      items: [{ text: "Shell 版归档说明", link: "/about/shell-archived" }],
    },
  ],

  "/changelog/": [
    { text: "版本记录", link: "/changelog/" },
    {
      text: "项目动态",
      items: [
        { text: "项目现状说明", link: "/about/go-version-status" },
        { text: "Shell 版归档说明", link: "/about/shell-archived" },
      ],
    },
  ],
};
