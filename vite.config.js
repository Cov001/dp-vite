import { defineConfig } from 'vite'
import { resolve } from 'path';
import global from 'global';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Polyfill cho các module không có sẵn trong trình duyệt
      events: 'events/',
      util: 'util/'
    }
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    global: 'globalThis'  // Polyfill cho global
  }
})
