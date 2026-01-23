import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

const RouteGenerateExclude = ['**/components/**', '**/layouts/**', '**/data/**', '**/types/**']

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      VueRouter({
        exclude: RouteGenerateExclude,
        dts: 'src/types/typed-router.d.ts',
      }),
      vue(),
      vueJsx(),
      vueDevTools(),
      tailwindcss(),
      visualizer({ gzipSize: true, brotliSize: true }),
      Layouts({
        defaultLayout: 'default',
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue$/,
        ],
        imports: [
          'vue',
          VueRouterAutoImports,
        ],
        dirs: [
          'src/composables/**/*.ts',
          'src/constants/**/*.ts',
          'src/stores/**/*.ts',
        ],
        defaultExportByFilename: true,
        dts: 'src/types/auto-import.d.ts',
      }),
      Component({
        dirs: [
          'src/components',
        ],
        collapseSamePrefixes: true,
        directoryAsNamespace: true,
        dts: 'src/types/auto-import-components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log'],
    },
    // Dev server proxy configuration to resolve CORS issues
    server: {
      proxy: {
        // Proxy requests starting with /api/auth to the authentication service
        '/api/auth': {
          target: 'https://auth.fduhole.com',
          changeOrigin: true,
          // Remove /api/auth prefix when forwarding the request
          rewrite: path => path.replace(/^\/api\/auth/, '/api'),
        },
        // Proxy requests starting with /api/treehole to the treehole service
        '/api/treehole': {
          target: 'https://www.fduhole.com',
          changeOrigin: true,
          // Remove /api/treehole prefix when forwarding the request
          rewrite: path => path.replace(/^\/api\/treehole/, '/api'),
        },
      },
    },
    define: {
      'process.env': env,
      'import.meta.env.VITE_AUTH_API_URL': JSON.stringify(env.VITE_AUTH_API_URL),
      'import.meta.env.VITE_TREEHOLE_API_URL': JSON.stringify(env.VITE_TREEHOLE_API_URL),
    },
  }
})
