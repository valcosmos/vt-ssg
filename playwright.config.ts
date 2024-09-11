import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 60000,
  use: {
    headless: true,
  },

  webServer: {
    command: 'pnpm prepare:e2e',
    port: 5173,
  },
})
