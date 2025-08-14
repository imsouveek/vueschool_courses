import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import vueDevTools from 'vite-plugin-vue-devtools'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/plugins/index.ts'),
            name: 'vue-plugins',
            // the proper extensions will be added
            fileName: 'vue-plugins'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    plugins: [
        vue(),
        vueDevTools(),
        checker({
            vueTsc: {
                buildMode: true
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
