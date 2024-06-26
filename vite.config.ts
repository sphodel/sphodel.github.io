import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    'window.global': {},
  },
  server: {
    host: '0.0.0.0',  // 监听所有网络接口
    port: 5173,       // 确保端口号与启动的端口号一致
    open: true        // 启动时自动打开浏览器
  },
})
// vite.config.js
