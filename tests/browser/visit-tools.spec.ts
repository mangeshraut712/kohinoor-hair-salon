import { expect, test } from '@playwright/test';

test('opening status follows Pune hours even on a device set to New York', async ({ browser }) => {
  const context = await browser.newContext({ timezoneId: 'America/New_York' });
  try {
    const page = await context.newPage();
    for (const [instant, expected] of [
      ['2026-11-23T06:30:00Z', 'Closed now'], // Monday in Pune
      ['2026-11-24T01:59:00Z', 'Closed now'],
      ['2026-11-24T02:00:00Z', 'Open now'],
      ['2026-11-24T16:30:00Z', 'Closed now'],
    ]) {
      await page.clock.setFixedTime(new Date(instant));
      await page.goto('/');
      await expect(page.getByText(expected + ' · Pune time', { exact: true })).toBeVisible();
    }
  } finally {
    await context.close();
  }
});

test('sharing sends the verified shop pin to the device share sheet', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { value: async (data: ShareData) => {
      document.documentElement.dataset.sharedPin = data.url;
    } });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Share the shop location' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-shared-pin', 'https://maps.app.goo.gl/141XQMZtooLVQQN29?g_st=ic');
});
