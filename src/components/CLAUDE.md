[根目录](../../CLAUDE.md) > [src](../) > **components**

# Components 模块

## 模块职责

UI 组件集合，分为三大类：
1. **override-components**: Starlight 内置组件的自定义覆盖，用于修改默认 UI 行为和样式
2. **user-components**: 用户可复用的自定义文档组件，供 MDX 内容页面导入使用
3. **通用组件**: 手风琴、面包屑、Hero 标签页、CTA 等独立组件

## 目录结构

```
components/
├── override-components/          # Starlight 组件覆盖（18 个 + 1 子目录）
│   ├── Head.astro                # 页面 <head> 标签覆盖（字体加载）
│   ├── Header.astro              # 顶部导航栏（含菜单、搜索、主题切换）
│   ├── Hero.astro                # 首页 Hero 区域（搜索框、Logo 动画）
│   ├── SiteTitle.astro           # 站点标题/Logo
│   ├── PageFrame.astro           # 页面整体框架（侧边栏 + 内容区布局）
│   ├── Sidebar.astro             # 左侧导航侧边栏
│   ├── SidebarSublist.astro      # 侧边栏递归列表渲染（含图标支持）
│   ├── SidebarRestorePoint.astro # 侧边栏状态恢复
│   ├── TwoColumnContent.astro    # 双栏内容布局（内容 + TOC）
│   ├── ContentPanel.astro        # 内容面板容器
│   ├── Pagination.astro          # 上一页/下一页导航
│   ├── PageSidebar.astro         # 页面侧边栏
│   ├── Search.astro              # 搜索组件（Pagefind 集成）
│   ├── ThemeSwitch.astro         # 深色/浅色模式切换按钮
│   ├── MobileMenuToggle.astro    # 移动端菜单切换按钮
│   ├── MobileTableOfContents.astro # 移动端目录导航
│   ├── Footer.astro              # 页脚组件
│   └── TableOfContents/          # 目录组件
│       ├── TableOfContents.astro
│       ├── TableOfContentsList.astro
│       └── starlight-toc.ts
├── user-components/              # 用户自定义组件（5 个）
│   ├── Button.astro              # 按钮组件（primary/outline-primary/text 变体）
│   ├── Grid.astro                # 响应式网格布局
│   ├── NewCard.astro             # 渐变卡片组件（含图标、标题、内容）
│   ├── ListCard.astro            # 列表卡片（含图标、计数器）
│   └── TerminalCode.astro        # 终端风格代码块组件
├── Accordion.astro               # 手风琴折叠面板
├── AccordionContainer.astro      # 手风琴容器（标签页切换）
├── Breadcrumb.astro              # 面包屑导航
├── CTA.astro                     # Call-to-Action 区块
├── HeroTabs.astro                # Hero 区域标签页
├── HeroTabsItem.astro            # Hero 标签页项
├── ImageMod.astro                # 图片组件（优化处理）
├── LinkButton.astro              # 链接按钮
├── Section.astro                 # 页面区块容器
├── SidebarNav.astro              # 侧边栏导航
└── ThemeDemo.astro               # 主题演示组件
```

## 对外接口

### 用户组件 (user-components)

**Button.astro**
```typescript
interface Props {
  label: string;        // 按钮文本
  link: string;         // 链接地址
  variant?: "primary" | "outline-primary" | "text";  // 样式变体
  className?: string;   // 额外 CSS 类
}
```

**Grid.astro**
```typescript
interface Props {
  columns?: number;     // 列数，默认 2
}
```

**NewCard.astro**
```typescript
interface Props {
  icon?: string;        // Starlight 图标名称
  title: string;        // 卡片标题（支持 HTML）
  iconColor?: string;   // 图标颜色
  size?: "large" | "sm"; // 尺寸，默认 "large"
}
// slot: 卡片内容
```

**ListCard.astro**
```typescript
interface Props {
  title: string;        // 标题
  imageIcon?: string;   // 图标图片路径
  number?: string;      // 计数器数字
  image?: string;       // 可选图片
}
// slot: 列表内容
```

### Starlight 覆盖组件

覆盖组件通过 `astro.config.mjs` 的 `components` 配置注册，需保持与原组件相同的 props 接口。主要访问 `Astro.locals.starlightRoute` 获取路由数据。

**Header.astro 特性：**
- 动态加载多语言菜单（通过 `languagePerser.ts`）
- 支持下拉子菜单（`hasChildren` + `children`）
- 导航按钮支持多语言翻译
- 滚动时添加背景色（`navbar-scrolled`）
- 移动端汉堡菜单

**Hero.astro 特性：**
- 动态加载 Logo（深色/浅色模式）
- Logo 弹跳动画
- 搜索框集成
- 404 页面检测

## 关键依赖与配置

- `@astrojs/starlight`: Starlight 核心框架
- `@astrojs/starlight/components`: Icon, Badge, LanguageSelect 等内置组件
- `astro:content`: 内容集合 API
- `@/lib/utils/textConverter`: 文本工具函数（plainLabel, getIconFromLabel, markdownify）
- `@/lib/utils/languagePerser`: 多语言菜单加载（getTranslations）
- `@/config/config.json`: 站点配置
- `@pagefind/default-ui`: 搜索 UI 组件

## 测试与质量

- 无自动化测试
- 使用 `astro check` 进行类型检查
- 组件样式通过 `@layer starlight.core` 和 `@layer starlight.components` 分层管理

## 常见问题 (FAQ)

**Q: 如何添加新的 Starlight 组件覆盖？**
A: 在 `override-components/` 目录创建同名 `.astro` 文件，然后在 `astro.config.mjs` 的 `components` 对象中添加映射。

**Q: 侧边栏图标是如何工作的？**
A: 侧边栏标签文本中的 `[icon-name]` 语法通过 `textConverter.ts` 的 `getIconFromLabel()` 解析提取，`plainLabel()` 移除图标标记后显示纯文本。

**Q: 搜索功能使用什么技术？**
A: 使用 Pagefind 进行客户端搜索，仅在生产构建中启用，开发模式显示提示信息。

**Q: Header 组件如何加载菜单？**
A: 通过 `languagePerser.ts` 的 `getTranslations(locale)` 函数动态导入 `menu.{locale}.json` 文件，支持下拉子菜单和多语言翻译。

## 相关文件清单

- `src/components/override-components/*.astro` - 18 个覆盖组件
- `src/components/override-components/TableOfContents/` - 目录组件子目录（3 个文件）
- `src/components/user-components/*.astro` - 5 个用户组件
- `src/components/*.astro` - 11 个通用组件
- `astro.config.mjs` - 组件覆盖注册配置

## 变更记录 (Changelog)

- **2026-06-02**: 更新模块文档，修正组件数量（18+5+11），补充 Header/Hero 特性说明，添加 LinkButton/Section/CTA 到通用组件列表
