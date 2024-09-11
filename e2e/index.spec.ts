import { expect, test } from '@playwright/test'

test('Verify that the page renders properly', async ({ page }) => {
  await page.goto('http://localhost:5173')
  const res = await page.evaluate(async () => {
    const pageContent = document.body.textContent
    return pageContent?.includes('Layout component')
  })

  expect(res).toBe(true)
})
