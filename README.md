# 骆谦实 · 个人作品集网站

基于 React + Vite + Tailwind CSS 构建的纸质感极简风格个人站点。内容由 JSON 数据驱动，方便维护。

## 本地开发

```bash
npm install
npm run dev      # 启动开发服务器 http://localhost:5173
npm run build    # 类型检查 + 生产构建，产物输出到 dist/
```

## 内容维护

站点所有文案与数据存储在 `src/data/` 下，修改后保存即可热更新：

- `profile.json` — 个人信息（姓名、网名、身份、社交链接）
- `portfolio.json` — 作品集（名称、描述、链接、标签、缩略图）
- `awards.json` — 获奖情况（标题、组织、证书图片）

图片资源放在 `public/assets/` 下，通过 `/assets/...` 路径引用。

## 部署到 GitHub Pages

已配置 GitHub Actions 自动部署（`.github/workflows/deploy.yml`），推送到 `main` 分支即自动构建并发布。

1. 将代码推送到 GitHub 仓库（仓库名任意，例如 `Luoqianshi`）。
2. 进入仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
3. 推送/合并到 `main` 分支，Actions 会自动构建部署。

部署后访问地址为 `https://<用户名>.github.io/<仓库名>/`。

> 说明：项目使用相对路径 `base: './'`，因此无论部署为用户页（`用户名.github.io`）还是项目页（`用户名.github.io/仓库名`），资源均可正确加载。路由采用 HashRouter（`#/tools`、`#/blog`），无需服务端 SPA fallback，天然兼容 GitHub Pages。
