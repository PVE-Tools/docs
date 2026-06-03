[根目录](../../CLAUDE.md) > [src](../) > **tailwind-plugin**

# Tailwind Plugin 模块

## 模块职责

提供自定义 Tailwind CSS 插件，将 `theme.json` 配置转换为 CSS 变量和工具类，实现主题系统的动态化。

## 目录结构

```
tailwind-plugin/
├── tw-theme.js       # 主题变量插件（颜色、字体、渐变）
└── tw-bs-grid.js     # Bootstrap 风格网格系统插件
```

## 插件详情

### tw-theme.js - 主题变量插件

**功能：**
1. 从 `src/config/theme.json` 读取颜色和字体配置
2. 生成 CSS 自定义变量（`--color-*`, `--font-*`, `--text-*`）
3. 注册 Tailwind 工具类（`bg-*`, `text-*`, `border-*` 等）
4. 支持深色/浅色模式变量切换

**生成的 CSS 变量：**
```css
:root {
  /* 颜色变量 */
  --color-primary: #D76D77;
  --color-body: #0d0d0d;
  --color-light: #f6f6f6;
  --color-dark: #151515;
  --color-lightmode-primary: #D76D77;
  --color-lightmode-body: #fff;
  /* ... */

  /* 字体变量 */
  --font-primary: "Inter", sans-serif;
  --text-base: 16px;
  --text-h1: 1.15rem;
  --text-h2: 1.3225rem;
  /* ... 通过 scale 递推计算 */
}
```

**注册的工具类：**
- 颜色: `bg-primary`, `text-light`, `border-dark`, `fill-*`, `stroke-*`
- 渐变: `from-*`, `to-*`, `via-*`
- 字体: `font-primary`, `text-h1` 到 `text-h6`, `text-base`

**字体大小计算逻辑：**
```javascript
// base = 16, scale = 1.15
// h6 = scale * 1rem = 1.15rem
// h5 = h6 * scale = 1.3225rem
// h4 = h5 * scale = 1.520875rem
// ... 递推到 h1
```

### tw-bs-grid.js - 网格系统插件

Bootstrap 风格的响应式网格系统，提供 `.container`, `.row`, `.col-*` 等工具类。

## 关键依赖

- `tailwindcss/plugin`: Tailwind 插件 API
- `src/config/theme.json`: 主题配置源

## 使用方式

在 `src/styles/global.css` 中导入：
```css
@plugin "../tailwind-plugin/tw-theme";
@plugin "../tailwind-plugin/tw-bs-grid";
```

## 常见问题 (FAQ)

**Q: 如何添加新的主题颜色？**
A: 在 `theme.json` 的 `colors.default.theme_color` 中添加新颜色键，插件会自动生成对应的 CSS 变量和工具类。

**Q: 字体大小如何计算？**
A: 从 `font_size.scale` 值开始，h6 = scale * 1rem，每个级别乘以 scale 递推。可通过修改 `font_size.scale` 调整整体比例。

**Q: 如何在组件中使用主题颜色？**
A: 使用 Tailwind 工具类如 `bg-primary`, `text-light`，或直接使用 CSS 变量 `var(--color-primary)`。

## 相关文件清单

- `src/tailwind-plugin/tw-theme.js`
- `src/tailwind-plugin/tw-bs-grid.js`
- `src/config/theme.json` - 配置源
- `src/styles/global.css` - 导入位置

## 变更记录 (Changelog)

- **2026-06-02**: 初始化模块文档
