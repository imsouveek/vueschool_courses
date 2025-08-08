import createVueConfig from 'eslint-config/vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Pass the local root directory to the shared config
export default createVueConfig({
    tsconfigRootDir: __dirname
})
