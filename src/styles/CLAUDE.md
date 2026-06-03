[根目录](../../CLAUDE.md) > [src](../) > **styles**

# Styles 模块

## 模块职责

管理站点的全局样式和组件样式，基于 Tailwind CSS 4.x 构建，通过 CSS 分层（layer）系统组织样式优先级。

## 目录结构

```
styles/
├── global.css        # 全局样式入口（导入所有子样式 + CSS 变量定义）
├── base.css          # 基础样式（重置、排版、通用元素）
├── navigation.css    # 导航相关样式（侧边栏、顶部栏）
├── components.css    # 组件样式
└── button.css        # 按钮样式
```

## 样式架构

### CSS 分层系统

```css
@layer base, starlight, theme, components, utilities;
```

- `base`: 基础重置和排版
- `starlight`: Starlight 框架样式
- `theme`: Tailwind 主题变量
- `components`: 自定义组件样式
- `utilities`: Tailwind 工具类

### global.css 结构

1. **Layer 声明**: 定义样式优先级
2. **Tailwind 导入**: `@astrojs/starlight-tailwind`, `tailwindcss/theme.css`, `tailwindcss/utilities.css`
3. **自定义插件**: `tw-theme`（主题变量）, `tw-bs-grid`（网格系统）
4. **CSS 变量覆盖**: 将 Starlight 的 `--sl-color-*` 变量映射到自定义主题变量
5. **深色/浅色模式**: 通过 `[data-theme="light"]` 选择器切换
6. **子样式导入**: base, navigation, components, button

### 主题变量映射

Starlight CSS 变量通过 `color-mix()` 函数从 `theme.json` 定义的颜色动态生成：

```css
:root {
  --sl-color-accent: var(--color-primary);
  --sl-color-white: var(--color-light);
  --sl-color-black: var(--color-dark);
  --sl-color-gray-1 到 --sl-color-gray-6: 通过 color-mix 混合生成
}
```

## 关键依赖

- `@astrojs/starlight-tailwind`: Starlight 的 Tailwind 集成
- `tailwindcss`: Tailwind CSS 4.x
- `src/tailwind-plugin/tw-theme`: 主题变量生成插件
- `src/tailwind-plugin/tw-bs-grid`: Bootstrap 风格网格插件
- `src/config/theme.json`: 颜色和字体配置源

## 常见问题 (FAQ)

**Q: 如何修改主色调？**
A: 编辑 `src/config/theme.json` 中的 `colors.default.theme_color.primary`，样式会自动更新。

**Q: 如何添加自定义样式？**
A: 在对应的 CSS 文件中添加，注意使用正确的 `@layer` 分层。组件样式使用 `@layer starlight.components`。

**Q: 深色/浅色模式如何切换？**
A: 通过 `[data-theme="light"]` 和 `[data-theme="dark"]` 选择器控制，ThemeSwitch 组件负责切换 `data-theme` 属性。

## 相关文件清单

- `src/styles/global.css` - 全局样式入口
- `src/styles/base.css` - 基础样式
- `src/styles/navigation.css` - 导航样式
- `src/styles/components.css` - 组件样式
- `src/styles/button.css` - 按钮样式

## 变更记录 (Changelog)

- **2026-06-02**: 初始化模块文档
