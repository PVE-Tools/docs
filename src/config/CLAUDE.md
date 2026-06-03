[根目录](../../CLAUDE.md) > [src](../) > **config**

# Config 模块

## 模块职责

集中管理站点的所有配置文件，包括站点信息、主题样式、导航结构、国际化设置和社交链接。

## 目录结构

```
config/
├── config.json        # 站点核心配置（标题、Logo、搜索、主题切换等）
├── theme.json         # 主题颜色和字体配置
├── sidebar.json       # 侧边栏导航结构
├── locals.json        # 国际化 locale 配置
├── social.json        # 社交媒体链接
├── menu.en.json       # 英文菜单和页脚配置
└── menu.zh-cn.json    # 中文菜单和页脚配置
```

## 配置文件详情

### config.json - 站点配置

```json
{
  "site": {
    "title": "PVE Tools Pro",
    "logo": "/src/assets/pve-logo.svg",
    "logo_darkmode": "/src/assets/pve-logo-dark.svg",
    "logo_width": "36",
    "logo_height": "36",
    "logo_text": "PVE Tools Pro"
  },
  "settings": {
    "search": true,
    "theme_switcher": true
  },
  "params": {
    "footer_contact": { "enable": false, "action": "#" },
    "copyright": "Copyright ... Ciriu Networks ..."
  },
  "navigation_button": {
    "enable": true,
    "label": "快速开始",
    "translations": { "zh-cn": "快速开始" },
    "link": "/zh-cn/guide/"
  }
}
```

### theme.json - 主题配置

```json
{
  "colors": {
    "default": {
      "theme_color": { "primary": "#4F46E5", "body": "#0a0a0f", "light": "#e2e8f0", "dark": "#0f172a" },
      "text_color": { "text": "#94a3b8" }
    },
    "lightmode": {
      "theme_color": { "primary": "#4F46E5", "body": "#ffffff", "light": "#334155", "dark": "#f1f5f9" },
      "text_color": { "text": "#1e293b" }
    }
  },
  "fonts": {
    "font_family": { "primary": "MiSans Latin", "primary_type": "sans-serif" },
    "font_size": { "base": "16", "scale": "1.15" }
  }
}
```

主题颜色通过 `tw-theme.js` 插件转换为 CSS 变量：
- `--color-primary`, `--color-body`, `--color-light`, `--color-dark`
- `--color-lightmode-primary`, `--color-lightmode-body` 等
- 渐变色: `--color-primary-gradient` (定义在 global.css 的 `@theme` 块中)

### sidebar.json - 侧边栏配置

当前侧边栏结构分为 5 个区域：
1. **开始使用**: 使用指南、功能特性、提交插件、常见问题、归档说明
2. **高级教程**: 从 `zh-cn/advanced` 目录自动生成
3. **更新与计划**: 更新日志、开发计划
4. **法律条款**: 服务条款 TOS、用户协议 ULA
5. **赞助与支持**: 赞助、付费支持

支持的结构：
- `label`: 显示文本（支持 `[icon-name]` 图标语法和 `translations` 翻译）
- `slug`: 内部页面引用
- `items`: 子项数组
- `autogenerate`: 从目录自动生成（`directory` 属性）

### locals.json - 国际化配置

```json
{
  "root": { "label": "English", "lang": "en" },
  "zh-cn": { "label": "简体中文", "lang": "zh-CN" }
}
```

根 locale (root) 的内容不需要语言前缀路径。中文内容路径前缀为 `/zh-cn/`。

### menu.*.json - 菜单配置

每个语言文件包含：
- `main`: 顶部导航菜单项（支持 `hasChildren` + `children` 下拉菜单）
- `footer`: 页脚链接（community, help_links, company 三个区域）

**中文菜单 (menu.zh-cn.json) 特有**：
- 社区区域包含 QQ 群和 Telegram 链接
- 法律区域包含归档说明和开发计划

## 关键依赖

- `astro.config.mjs` 导入 config, social, locals, sidebar 配置
- `tw-theme.js` 读取 theme.json 生成 CSS 变量
- `languagePerser.ts` 动态导入 menu.*.json
- `Header.astro` 和 `Footer.astro` 消费菜单配置

## 常见问题 (FAQ)

**Q: 如何添加新语言？**
A: 1) 在 `locals.json` 添加 locale 配置；2) 创建 `menu.{lang}.json`；3) 在 `src/content/i18n/` 添加翻译文件；4) 在 `src/content/docs/{lang}/` 添加文档内容。

**Q: 如何修改主题颜色？**
A: 编辑 `theme.json` 中的 `colors` 部分，颜色会通过 Tailwind 插件自动应用。

**Q: 侧边栏图标支持哪些？**
A: 支持 Starlight 内置图标（document, setting, pencil 等）和 Seti UI 图标（seti:vite, seti:typescript 等）。

**Q: 如何修改顶部导航的"快速开始"按钮？**
A: 编辑 `config.json` 的 `navigation_button` 字段，支持 `translations` 对象按语言覆盖按钮文本。

## 相关文件清单

- `src/config/config.json` - 站点核心配置
- `src/config/theme.json` - 主题颜色和字体配置
- `src/config/sidebar.json` - 侧边栏导航结构
- `src/config/locals.json` - 国际化 locale 配置
- `src/config/social.json` - 社交媒体链接
- `src/config/menu.en.json` - 英文菜单和页脚
- `src/config/menu.zh-cn.json` - 中文菜单和页脚

## 变更记录 (Changelog)

- **2026-06-02**: 更新模块文档，修正语言支持为 zh-CN，补充 config.json 和 theme.json 实际值
