import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173, // พอร์ตสำหรับเซิร์ฟเวอร์ Vite
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // ชี้ไปที่ Backend (Express)
        changeOrigin: true,
        secure: false,
      },
    },
  },
});