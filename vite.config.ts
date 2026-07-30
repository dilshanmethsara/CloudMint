import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
    {
      name: 'serve-static-files',
      configureServer(server) {
        const staticPaths = ['/sitemap.xml', '/robots.txt', '/logo.jpg']
        return () => {
          server.middlewares.use((req, res, next) => {
            const url = req.url ?? ''
            if (
              staticPaths.some(p => url === p) ||
              url.startsWith('/favicon_io/')
            ) {
              if (url.endsWith('.webmanifest')) {
                res.setHeader('Content-Type', 'application/manifest+json')
              }
              next()
              return
            }
            next()
          })
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  server: {
    watch: {
      ignored: ['**/*.jpg', '**/*.png', '**/*.webp'],
    },
  },
})
