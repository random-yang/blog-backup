# RandomYang Blog (Next.js)

一个使用 Next.js 14 重新构建的个人博客，保留了原 Hexo Paper 主题的设计风格。

## 功能特性

- 📝 Markdown 文章支持
- 🎨 Paper 主题风格
- 📱 响应式设计
- 🔍 文章搜索（待实现）
- 🏷️ 标签和分类系统
- 📅 文章归档
- 💬 评论系统（待实现）
- 🔢 数学公式渲染（KaTeX）
- 🌈 代码高亮（highlight.js）
- ⚡ 静态站点生成

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **Markdown**: remark/rehype
- **部署**: Vercel

## 快速开始

### 安装依赖

```bash
cd randomyang-blog-nextjs
npm install
```

### 开发

```bash
npm run dev
```

访问 http://localhost:3000 查看博客。

### 构建

```bash
npm run build
```

### 预览生产版本

```bash
npm run start
```

## 内容管理

### 创建新文章

在 `content/posts/` 目录下创建新的 Markdown 文件：

```markdown
---
title: 文章标题
date: 2024-08-02
tags:
  - 标签1
  - 标签2
categories:
  - 分类名
description: 文章描述
top: false # 是否置顶
---

文章内容...
```

### 文章 Front Matter 字段

- `title`: 文章标题（必需）
- `date`: 发布日期（必需，格式：YYYY-MM-DD）
- `tags`: 标签数组
- `categories`: 分类数组
- `description`: 文章描述
- `top`: 是否置顶
- `author`: 作者名称
- `cover`: 封面图片

### 草稿

将文章放在 `content/drafts/` 目录下即可创建草稿，草稿不会在生产环境中显示。

## 目录结构

```
randomyang-blog-nextjs/
├── content/
│   ├── posts/          # 已发布文章
│   └── drafts/         # 草稿
├── src/
│   ├── app/            # Next.js 页面和路由
│   ├── components/     # React 组件
│   ├── lib/            # 工具函数
│   ├── styles/         # 全局样式
│   └── types/          # TypeScript 类型定义
├── public/             # 静态资源
└── package.json
```

## 自定义配置

### 修改博客信息

编辑 `src/app/layout.tsx` 中的 metadata：

```typescript
export const metadata: Metadata = {
  title: "你的博客名称",
  description: "你的博客描述",
  // ...
};
```

### 修改主题颜色

编辑 `tailwind.config.ts` 中的颜色配置：

```javascript
colors: {
  primary: {
    DEFAULT: '#ebc65a', // 默认主题色
    // 添加其他颜色变体
  }
}
```

### 修改社交链接

编辑 `src/components/Header.tsx` 中的 `socialLinks` 数组。

## 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 其他平台

由于配置了 `output: 'export'`，可以将生成的静态文件部署到任何静态站点托管服务。

## 开发计划

- [ ] 搜索功能
- [ ] 评论系统（Valine/Giscus）
- [ ] RSS 订阅
- [ ] 暗色模式
- [ ] 页面过渡动画
- [ ] SEO 优化
- [ ] 图片优化

## License

MIT