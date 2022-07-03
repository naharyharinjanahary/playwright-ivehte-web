import { test, expect } from '@playwright/test';

test.describe('Ivehte web', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5000/');
  });

  test('Serveur Web', async({ page }) => {
    expect(await page.screenshot()).toMatchSnapshot('button.png');
  });
})

