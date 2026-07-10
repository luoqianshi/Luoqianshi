# 个人作品集网站设计方案

## 概述

为骆锟宏（骆谦实）设计开发的个人作品集与基本资料展示网站，采用纸质感极简主义风格，参考 luliangsi.github.io 的设计美学。

## 技术栈

- React + TypeScript + Vite
- Tailwind CSS v3
- React Router（为未来工具站/博文站扩展预留）

## 页面结构

单页滚动结构，首页包含所有内容。导航栏顶部固定，包含"首页""工具站""博文站"三个入口。工具站和博文站为"建设中"占位页，未来扩展。

### 首页区块（从上到下）

1. 个人信息区——姓名、网名、身份、社交链接
2. 作品集区——项目卡片（缩略图 + 名称 + 简介 + 链接）
3. 获奖情况区——奖项列表
4. 页脚——版权与更新时间

## 数据模型

内容通过 JSON 文件驱动：

- `src/data/profile.json` — 个人信息
- `src/data/portfolio.json` — 作品集
- `src/data/awards.json` — 获奖情况

## 设计系统

### 配色

- 背景：`#faf8f5`（微暖纸张色）
- 正文：`#2b2b2b`（深炭灰）
- 链接：`#3d5a80`（低调深蓝灰）
- 分割线：`#e8e4df`（极浅暖灰）

### 字体

- 标题：`"Noto Serif SC", "Songti SC", Georgia, serif`
- 正文：`"Noto Sans SC", "PingFang SC", system-ui, sans-serif`
- 行距：1.8

### 布局

- 单栏居中，最大宽度 720px
- 大量留白，区块间用留白分隔
- 固定导航栏，半透明纸张色背景带模糊

### 动效

- 链接 hover 颜色过渡 + 下划线动画
- 区块滚动进入视口淡入
- 无花哨动画

## 目录结构

```
src/
  data/           # JSON 数据文件
  components/
    Layout/       # 导航栏、页脚
    sections/     # 首页各区块
    ui/           # 通用UI组件
  pages/
    Home.tsx
    Tools.tsx
    Blog.tsx
  hooks/          # 自定义 hooks
```

## 不支持

- 不支持暗色模式
- 不支持多语言切换（中英混排）
