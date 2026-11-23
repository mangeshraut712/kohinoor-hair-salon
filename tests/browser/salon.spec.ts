import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const dimensions = [
  { width: 320, height: 640 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

for (const viewport of dimensions) {
  test(`shop is usable at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto('/');
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('The Kohinoor');
    const brand = page.getByRole('banner').getByRole('link', { name: 'The Kohinoor AC Salon' });
    await expect(brand.locator('img')).toBeVisible();
    await expect.poll(() => brand.locator('img').evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator('p[lang="mr"]')).toHaveText('द कोहिनूर एसी सलून (पिंपळे निलख)');
    await expect(page.getByRole('link', { name: 'Call +91 97640 48382' })).toHaveAttribute('href', 'tel:+919764048382');
    await expect(page.locator('#appointment dd').last()).toHaveText('Closed');
    await expect(page.getByRole('link', { name: 'Google Maps directions' })).toHaveAttribute('href', /maps\.app\.goo\.gl\/141XQMZtooLVQQN29/);
    await expect(page.getByRole('link', { name: 'Open shop Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/the_kohinoor_salon/');
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
    const dock = page.getByRole('navigation', { name: 'Quick actions' });
    if (viewport.width < 768) {
      await expect(dock).toBeVisible();
      await expect(dock.getByRole('link', { name: 'Call' })).toHaveAttribute('href', 'tel:+919764048382');
      await expect(dock.getByRole('link', { name: 'Directions' })).toBeInViewport();
    } else {
      await expect(dock).toBeHidden();
    }
    expect(errors).toEqual([]);
  });
}

test('keyboard skip link, escape, and mobile menu keep focus usable', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  // macOS WebKit defaults to Option+Tab to reach links.
  await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  const menu = page.locator('summary').filter({ hasText: 'Menu' });
  const nav = page.getByRole('navigation', { name: 'Primary mobile' });
  await menu.press('Enter');
  await expect(nav).toBeVisible();
  const services = nav.getByRole('link', { name: 'Services' });
  await services.press('Escape');
  await expect(nav).toBeHidden();
  await expect(menu).toBeFocused();
  await menu.press('Enter');
  await nav.getByRole('link', { name: 'Location' }).press('Enter');
  await expect(nav).toBeHidden();
  await expect(page.getByRole('region', { name: 'Shivaji Chowk, Pimple Nilakh' })).toBeFocused();
  await expect(page).toHaveURL(/#location$/);
  await expect(page.getByRole('heading', { name: 'Shivaji Chowk, Pimple Nilakh' })).toBeInViewport();
});

test('service board switches categories and resets to all', async ({ page }) => {
  await page.goto('/');
  const group = page.getByRole('group', { name: 'Filter services' });
  await group.getByRole('button', { name: 'Hair & Cuts' }).click();
  await expect(group.getByRole('button', { name: 'Hair & Cuts' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('article')).toHaveCount(1);
  await group.getByRole('button', { name: 'All', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(3);
});

for (const width of [390, 1440]) {
  test(`axe WCAG A/AA checks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(report.violations.map(({ id, nodes }) => ({ id, selectors: nodes.map((node) => node.target) }))).toEqual([]);
  });
}

test('short landscape menu exposes Contact and scrolls it clear of the dock', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 667, height: 300 }, hasTouch: true, reducedMotion: 'reduce' });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await page.locator('summary').filter({ hasText: 'Menu' }).tap();
    const nav = page.getByRole('navigation', { name: 'Primary mobile' });
    await nav.getByRole('link', { name: 'Contact' }).tap();
    await expect(page).toHaveURL(/#appointment$/);
    await expect(nav).toBeHidden();
    const heading = page.getByRole('heading', { name: 'Call before you visit' });
    await expect(heading).toBeInViewport();
    await expect.poll(async () => heading.evaluate((h) => {
      const rect = h.getBoundingClientRect();
      const header = document.querySelector('header')?.getBoundingClientRect();
      const dock = document.querySelector('[aria-label="Quick actions"]')?.getBoundingClientRect();
      return rect.top >= (header?.bottom ?? 0) && rect.bottom <= (dock?.top ?? innerHeight);
    })).toBe(true);
  } finally {
    await context.close();
  }
});

test('missing page gives visitors a working route back to the salon', async ({ page }) => {
  const response = await page.goto('/missing-salon-page');
  expect(response?.status()).toBe(404);
  await page.getByRole('link', { name: 'Salon home' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('The Kohinoor');
});
