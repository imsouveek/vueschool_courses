import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', { host: '0.0.0.0', port: 3010 }]],

    use: {
        baseURL: 'http://localhost:3009',
        trace: 'on',
        testIdAttribute: 'data-test'
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        }
    ],

    webServer: {
        command: 'pnpm dev',
        url: 'http://localhost:3009',
        reuseExistingServer: !process.env.CI
    }
})
