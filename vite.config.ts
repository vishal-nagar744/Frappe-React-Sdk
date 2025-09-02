import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    proxy: {
      "/frappe": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // Strip the /frappe prefix when forwarding to ERPNext
        rewrite: (path) => path.replace(/^\/frappe/, ""),
        // Make cookies usable on the Vite dev origin
        cookieDomainRewrite: "localhost",
        cookiePathRewrite: "/",
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            // Ensure CSRF referer/origin checks pass on Frappe
            proxyReq.setHeader("origin", "http://localhost:8080")
            proxyReq.setHeader("referer", "http://localhost:8080/")
          })
        }
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.tsx'),
      name: 'Frappe React',
      fileName: (format) => `frappe-react-sdk.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  react(),
  tsconfigPaths()
  ]
})
