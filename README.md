# PVE Tools Pro’s Official Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

基于 **Astro Starlight** 构建的 PVE Tools 官方文档站点，提供丰富的自定义组件、增强的 UI 体验和中英文双语支持。

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/PVE-Tools/PVE-Tools-9.git
cd PVE-Tools-9

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 `http://localhost:4321` 即可预览。

## 项目结构

```
.
├── public/                          # 静态资源（favicon、manifest 等）
├── src/
│   ├── assets/                      # 图片和媒体资源
│   ├── components/
│   │   ├── override-components/     # Starlight 组件覆盖（18 个）
│   │   └── user-components/         # 自定义文档组件（5 个）
│   ├── config/                      # 站点配置（主题、导航、国际化）
│   │   ├── config.json              # 核心站点配置
│   │   ├── theme.json               # 主题颜色与字体
│   │   ├── sidebar.json             # 侧边栏导航
│   │   ├── menu.en.json             # 英文菜单
│   │   ├── menu.zh-cn.json          # 中文菜单
│   │   ├── locals.json              # 语言设置
│   │   └── social.json              # 社交媒体链接
│   ├── content/
│   │   ├── docs/                    # 英文文档（根路径）
│   │   │   └── zh-cn/               # 简体中文文档
│   │   │       └── advanced/        # 高级教程（10 篇）
│   │   ├── i18n/                    # UI 翻译字符串
│   │   └── sections/                # 可复用页面区块
│   ├── lib/                         # 工具函数
│   ├── styles/                      # 全局样式（CSS 分层系统）
│   └── tailwind-plugin/             # 自定义 Tailwind 插件
├── astro.config.mjs                 # Astro 配置
├── wrangler.jsonc                   # Cloudflare Workers 配置
├── netlify.toml                     # Netlify 部署配置
└── package.json
```

## 技术栈

| 技术 | 说明 |
|:---|:---|
| Astro 6 | 静态站点生成框架 |
| Starlight | Astro 官方文档主题 |
| Tailwind CSS 4 | 原子化 CSS 工具类 |
| Vite 7 | 前端构建工具 |
| TypeScript | 类型安全开发 |
| Cloudflare Pages | 全球边缘网络静态托管 |

## 常用命令

| 命令 | 说明 |
|:---|:---|
| `npm install` | 安装依赖 |
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 构建生产版本到 `dist/` |
| `npm run preview` | 预览构建结果 |
| `npm run check` | 运行 Astro 类型检查 |
| `npm run deploy:cf-workers` | 构建并部署到 Cloudflare Workers |

## 自定义组件

| 组件 | 说明 |
|:---|:---|
| `Button.astro` | 多风格按钮 |
| `Grid.astro` | 响应式网格布局 |
| `NewCard.astro` | 现代渐变卡片 |
| `ListCard.astro` | 图标列表卡片 |
| `TerminalCode.astro` | 终端风格代码块 |

## 多语言支持

- **English** (`en`) — 默认语言，文档根路径
- **简体中文** (`zh-cn`) — 中文文档与 UI 翻译

## 部署

**Cloudflare Workers（主要）：**
```bash
npm run deploy:cf-workers
```

**Netlify：**
```bash
npm run build
# 自动部署（netlify.toml 已配置）
```

## 了解更多

- [Starlight 文档](https://starlight.astro.build/)
- [Astro 文档](https://docs.astro.build/)
- [PVE Tools Pro 在线文档](https://docs.pvetools.pro/)
