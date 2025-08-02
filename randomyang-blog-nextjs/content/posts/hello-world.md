---
title: Hello World - 我的第一篇博客
date: 2024-08-02
tags:
  - Next.js
  - React
  - 博客
categories:
  - 技术
description: 使用 Next.js 重新构建的博客第一篇文章，测试各种功能
top: true
---

欢迎来到我使用 Next.js 重新构建的博客！这是第一篇测试文章，用来展示博客的各种功能。

## 功能特性

### 1. Markdown 渲染

支持标准的 Markdown 语法，包括：

- **粗体文本**
- *斜体文本*
- ~~删除线~~
- `行内代码`
- [链接](https://nextjs.org)

### 2. 代码高亮

```javascript
// Next.js 页面组件示例
export default function HomePage() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Welcome to my blog!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

```css
/* Paper 主题样式 */
.paper-curl {
  position: relative;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.paper-curl::before,
.paper-curl::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 50%;
  height: 20px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
  transform: rotate(-3deg);
  z-index: -1;
}
```

### 3. 数学公式

支持 LaTeX 数学公式渲染：

行内公式：$E = mc^2$

块级公式：

$$
\frac{1}{\Gamma(z)} = z e^{\gamma z} \prod_{n=1}^{\infty} \left(1 + \frac{z}{n}\right) e^{-z/n}
$$

### 4. 表格

| 功能 | 描述 | 状态 |
|------|------|------|
| Markdown 渲染 | 支持 GFM | ✅ |
| 代码高亮 | 使用 highlight.js | ✅ |
| 数学公式 | 使用 KaTeX | ✅ |
| 响应式设计 | 移动端优化 | ✅ |

### 5. 引用

> 设计不是它看起来怎样或感觉怎样。设计是它如何运作。
> 
> —— Steve Jobs

### 6. 列表

有序列表：
1. 首先，安装依赖
2. 然后，配置项目
3. 最后，启动开发服务器

无序列表：
- React 18+
- Next.js 14+
- TypeScript
- Tailwind CSS

### 7. 图片

图片会自动适应容器宽度，并保持原始比例。

---

## 技术栈

这个博客使用了以下技术：

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **Markdown 处理**: 
  - gray-matter (front matter 解析)
  - remark (Markdown 处理)
  - rehype (HTML 处理)
- **部署**: Vercel

## 总结

通过使用现代的前端技术栈，我成功地将原来的 Hexo 博客迁移到了 Next.js。新的博客不仅保留了原有的 Paper 主题风格，还获得了更好的性能和开发体验。

你可以通过修改 `content/posts` 目录下的 Markdown 文件来更新博客内容，系统会自动渲染并生成静态页面。

感谢阅读！🎉