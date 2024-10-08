/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), eslintPlugin(), mkcert()],
  server: {
    host: true,
    strictPort: true,
    https: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      esmExternals: true 
   },
  }
})
