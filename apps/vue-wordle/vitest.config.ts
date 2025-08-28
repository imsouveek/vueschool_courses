import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            include: ['src/**/*.spec.ts'],
            exclude: [...configDefaults.exclude],
            root: fileURLToPath(new URL('./', import.meta.url)),
            globals: true
        }
    })
)
