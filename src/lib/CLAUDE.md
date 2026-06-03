[根目录](../../CLAUDE.md) > [src](../) > **lib**

# Lib 模块

## 模块职责

提供项目所需的工具函数，包括多语言菜单加载和文本处理功能。

## 目录结构

```
lib/
└── utils/
    ├── languagePerser.ts    # 多语言菜单加载器（注意：文件名有拼写错误）
    └── textConverter.ts     # 文本转换工具函数
```

## 工具函数详情

### languagePerser.ts

```typescript
// 根据语言代码加载对应的菜单配置文件
export const getTranslations = async (lang: string) => {
  const normalizedLang = lang.toLowerCase();
  // 尝试加载 menu.{lang}.json，失败时回退到 menu.en.json
  let menu;
  try {
    menu = await import(`../../config/menu.${normalizedLang}.json`);
  } catch (error) {
    menu = await import(`../../config/menu.en.json`);
  }
  return { ...menu.default };
};
```

**使用场景：** Header.astro, Footer.astro 中加载导航菜单

### textConverter.ts

```typescript
// Markdown 内容渲染（使用 marked 库）
export const markdownify = (content: string, div?: boolean) => {
  return div ? marked.parse(content) : marked.parseInline(content);
};

// 移除标签中的图标标记 [icon-name]
export const plainLabel = (content: string) => {
  return content.replace(/\[.*?\]/g, "").trim();
};

// 从标签中提取图标名称
export const getIconFromLabel = (content: string) => {
  const match = content.match(/\[(.*?)\]/)?.[1];
  return match ? match : null;
};
```

**使用场景：**
- `markdownify`: Footer.astro 中渲染版权信息
- `plainLabel`: SidebarSublist.astro, Pagination.astro 中显示纯文本标签
- `getIconFromLabel`: SidebarSublist.astro 中提取侧边栏图标

## 关键依赖

- `marked`: Markdown 解析库（用于 `markdownify`）
- `src/config/menu.*.json`: 菜单配置文件（用于 `getTranslations`）

## 注意事项

- `languagePerser.ts` 文件名包含拼写错误（应为 `languageParser`），但这是项目现状，修改需谨慎
- `getTranslations` 使用动态 import，文件名必须精确匹配

## 相关文件清单

- `src/lib/utils/languagePerser.ts`
- `src/lib/utils/textConverter.ts`

## 变更记录 (Changelog)

- **2026-06-02**: 初始化模块文档
