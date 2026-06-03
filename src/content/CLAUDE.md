[根目录](../../CLAUDE.md) > [src](../) > **content**

# Content 模块

## 模块职责

管理站点的所有内容数据，包括文档页面、i18n 翻译字符串和可复用页面区块。使用 Astro 内容集合（Content Collections）API 进行数据管理。

## 目录结构

```
content/
├── content.config.ts       # 内容集合配置（schema 定义）
├── docs/                   # 文档内容
│   ├── index.mdx           # 首页（splash 模板）
│   ├── 404.md              # 404 页面
│   ├── about.md            # 关于页面
│   ├── privacy-policy.md   # 隐私政策
│   ├── guide.md            # 使用指南（英文）
│   ├── features.md         # 功能特性
│   ├── faq.md              # 常见问题
│   ├── update.md           # 更新日志
│   ├── todo.md             # 开发计划
│   ├── eol.md              # 归档说明
│   ├── sponsor.md          # 赞助
│   ├── pay.md              # 付费支持
│   ├── tos.md              # 服务条款
│   ├── ula.md              # 用户协议
│   ├── submit-plugin.md    # 插件提交
│   └── zh-cn/              # 简体中文文档（镜像英文结构）
│       ├── index.mdx       # 中文首页
│       ├── guide.md        # 使用指南
│       ├── features.md     # 功能特性
│       ├── faq.md          # 常见问题
│       ├── update.md       # 更新日志
│       ├── todo.md         # 开发计划
│       ├── eol.md          # 归档说明
│       ├── sponsor.md      # 赞助
│       ├── pay.md          # 付费支持
│       ├── tos.md          # 服务条款
│       ├── ula.md          # 用户协议
│       ├── submit-plugin.md # 插件提交
│       └── advanced/       # 高级教程
│           ├── index.md
│           ├── gpu-passthrough.md
│           ├── gpu-virtualization.md
│           ├── cpu-optimization.md
│           ├── pve-upgrade.md
│           ├── storage-management.md
│           ├── nvidia-vgpu-driver-notes.md
│           ├── vm-backup-migration-cloudinit.md
│           ├── host-network-firewall-ipv6.md
│           ├── data-recovery-after-mistake.md
│           └── how-to-connect-ssh.md
├── i18n/                   # UI 翻译字符串
│   ├── en.json             # 英文翻译
│   └── zh-cn.json          # 中文翻译
└── sections/               # 可复用页面区块
    └── call-to-action.md   # CTA 区块
```

## 内容集合定义

### content.config.ts

```typescript
// 三个集合：
// 1. docs - 文档内容（Starlight 内置 docsLoader）
// 2. i18n - UI 翻译（Starlight 内置 i18nLoader）
// 3. ctaSection - CTA 区块（自定义 glob loader）

const ctaSection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/sections" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    enable: z.boolean().optional(),
    fill_button: z.object({ label, link, enable }),
    outline_button: z.object({ label, link, enable }),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
  ctaSection,
};
```

## 内容类型

### 文档页面 (docs)

使用 MD/MDX 格式，支持：
- Starlight frontmatter 配置（title, description, sidebar 等）
- 导入 Astro 组件
- Starlight 内置组件（Tabs, TabItem 等）

**特殊页面模板：**
- `index.mdx`: 使用 `template: splash` 创建首页
- `404.md`: 自定义 404 页面

**文档页面主要主题（PVE Tools Pro）：**
- 使用指南 (guide)
- 功能特性 (features)
- 常见问题 (faq)
- 更新日志 (update)
- 开发计划 (todo)
- 高级教程系列 (advanced/)：GPU 直通、GPU 虚拟化、CPU 优化、PVE 升级、存储管理、NVIDIA vGPU、VM 备份迁移、网络/防火墙/IPv6、数据恢复、SSH 连接

### i18n 翻译

UI 字符串翻译，当前支持的键：
```json
{
  "page.nextLink": "下一页",
  "page.previousLink": "上一页",
  "hero.popular": "热门",
  "footer.privacy": "隐私政策"
}
```

### CTA 区块

Call-to-Action 区块，通过 `CTA.astro` 组件消费，支持：
- 标题和描述
- 填充按钮和轮廓按钮
- `enable` 开关控制显示

## 关键依赖

- `@astrojs/starlight/loaders`: docsLoader, i18nLoader
- `@astrojs/starlight/schema`: docsSchema, i18nSchema
- `astro/loaders`: glob loader
- `astro/zod`: schema 验证

## 常见问题 (FAQ)

**Q: 如何添加新文档页面？**
A: 在 `src/content/docs/`（英文）或 `src/content/docs/zh-cn/`（中文）下创建 `.md` 或 `.mdx` 文件，添加 frontmatter（title, description），内容会自动出现在侧边栏（如果配置了 autogenerate）。

**Q: 如何添加新语言的文档？**
A: 在 `src/content/docs/{lang}/` 目录下创建对应文件，保持与英文版本相同的目录结构。同时需要更新 `locals.json` 和添加对应的 `menu.{lang}.json`。

**Q: CTA 区块如何工作？**
A: `call-to-action.md` 中的 frontmatter 配置 CTA 内容，`CTA.astro` 组件通过 `getEntry("ctaSection", ...)` 获取并渲染。

**Q: 高级教程放在哪里？**
A: 中文高级教程位于 `src/content/docs/zh-cn/advanced/` 目录，通过 `sidebar.json` 的 `autogenerate` 配置自动出现在侧边栏。英文版本暂无对应内容。

## 相关文件清单

- `src/content.config.ts` - 集合定义
- `src/content/docs/**/*.md,*.mdx` - 文档文件（英文 + 中文）
- `src/content/docs/zh-cn/advanced/*.md` - 10 篇高级教程
- `src/content/i18n/en.json` - 英文翻译
- `src/content/i18n/zh-cn.json` - 中文翻译
- `src/content/sections/call-to-action.md` - CTA 区块

## 变更记录 (Changelog)

- **2026-06-02**: 更新模块文档，修正语言支持为 zh-cn，补充中文文档目录结构
