# PVE Tools Pro 官方文档

基于 **VitePress** + **[Teek](https://vp.teek.top/)** 主题构建的 PVE Tools Pro 文档站。

## 快速开始

```bash
pnpm install
pnpm dev        # 本地开发，默认 http://localhost:5173
pnpm build      # 构建到 docs/.vitepress/dist
pnpm preview    # 预览构建结果
```

> 只能用 pnpm 安装依赖。

## 目录结构

```
docs-next/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts            # VitePress 站点配置（标题、head、markdown、搜索）
│   │   ├── nav.ts               # 顶部导航
│   │   ├── sidebar.ts           # 侧边栏（按路径前缀分组，手写）
│   │   ├── teek-config.ts       # Teek 主题配置（页脚、代码块、关闭博客形态）
│   │   ├── data/sponsors.ts     # 赞助名单 / 档位 / 定价数据
│   │   └── theme/
│   │       ├── index.ts         # 主题入口，注册全局组件
│   │       ├── components/      # HomeInstall / SponsorList / SponsorTiers / PricingTable
│   │       └── styles/index.css # 品牌色与中文排版覆盖
│   ├── index.md                 # 首页（VitePress home 布局）
│   ├── guide/                   # 使用指南、功能特性、常见问题、提交插件
│   ├── tutorial/                # 高级教程（10 篇）
│   ├── changelog/               # 更新日志
│   ├── support/                 # 赞助、付费技术支持
│   ├── legal/                   # 用户协议、隐私政策 + 历史版本归档
│   ├── about/                   # 关于本站、项目现状说明、Shell 版归档说明
│   └── public/                  # 静态资源（Logo、二维码、PVE-Tools.sh、_headers）
├── wrangler.jsonc               # Cloudflare 部署配置
└── netlify.toml                 # Netlify 部署配置
```

## 常见维护任务

| 任务 | 做法 |
|:---|:---|
| 新增一篇教程 | 在 `docs/tutorial/` 添加 `.md`，然后在 `docs/.vitepress/sidebar.ts` 的对应分组登记 |
| 修改导航 | 编辑 `docs/.vitepress/nav.ts` |
| 更新赞助名单 | 编辑 `docs/.vitepress/data/sponsors.ts`，在 `sponsors` 数组开头追加 |
| 调整品牌色 | 编辑 `docs/.vitepress/theme/styles/index.css` 的 `--vp-c-brand-*` |
| 更新安装命令 | 编辑 `docs/.vitepress/theme/components/HomeInstall.vue` 的 `command` |

## 约定

- **单语中文**：站点只维护简体中文内容。
- **内部链接写 `.md` 后缀**（如 `[功能特性](./features.md)`），构建时会做死链检查，`ignoreDeadLinks: false`，有死链直接构建失败。
- **提示容器**用 VitePress 语法：`::: tip` / `::: warning` / `::: danger` / `::: info` / `::: details`。
- **Teek 的自动 frontmatter / 自动侧边栏插件已关闭**，Markdown 源文件不会被工具回写。

## 部署

**Cloudflare：**

```bash
pnpm build
npx wrangler deploy
```

**Netlify：** 推送后按 `netlify.toml` 自动构建。

缓存策略在 `docs/public/_headers` 中定义，会随构建产物一起发布。
