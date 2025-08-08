import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

/**
 * Creates a complete ESLint configuration for Vue projects.
 * @param {object} options
 * @param {string} options.tsconfigRootDir The root directory for the tsconfig.json file.
 */

export interface createVueEslintConfigOptions {
    tsconfigRootDir: string
}

export default function createVueEslintConfig(options: createVueEslintConfigOptions) {
    const { tsconfigRootDir } = options

    const baseConfig = defineConfigWithVueTs(
        {
            name: 'app/files-to-lint',
            files: ['**/*.{ts,mts,tsx,vue}']
        },
        globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
        pluginVue.configs['flat/essential'],
        vueTsConfigs.recommended,
        skipFormatting,
        { rules: { 'vue/multi-word-component-names': 0 } }
    )

    return [
        ...baseConfig,
        {
            // This new object is where we dynamically add the tsconfigRootDir
            files: ['**/*.{ts,mts,tsx,vue}'],
            languageOptions: {
                parserOptions: {
                    tsconfigRootDir,
                    project: ['./tsconfig.json', './tsconfig.*.json']
                }
            }
        }
    ]
}
