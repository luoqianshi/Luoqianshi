import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 使用相对路径 base，使构建产物可部署到任意 GitHub Pages 子路径（用户页或项目页）
  base: './',
  plugins: [react()],
})
