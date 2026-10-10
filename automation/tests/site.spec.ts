import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

const siteUrl = pathToFileURL(path.resolve(__dirname, '../../site/index.html')).href;

test.describe('Portfolio site', () => {
  test('loads with no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(siteUrl);

    await expect(page).toHaveTitle(/Iain York/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('every nav link points to a section that exists', async ({ page }) => {
    await page.goto(siteUrl);
    const hrefs = await page.locator('.site-nav a').evaluateAll((links) =>
      links.map((a) => a.getAttribute('href'))
    );

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      await expect(page.locator(href!)).toHaveCount(1);
    }
  });

  test('renders all six bug reports', async ({ page }) => {
    await page.goto(siteUrl);
    await expect(page.locator('.bug')).toHaveCount(6);
    await expect(page.locator('.bug-count')).toHaveText('Showing 6 of 6 bugs');
  });

  test('severity filter shows only matching bugs', async ({ page }) => {
    await page.goto(siteUrl);

    await page.getByRole('button', { name: 'Critical' }).click();
    await expect(page.locator('.bug:visible')).toHaveCount(2);
    await expect(page.locator('.bug:visible .badge')).toHaveText(['Critical', 'Critical']);
    await expect(page.getByRole('button', { name: 'Critical' })).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('button', { name: 'Major' }).click();
    await expect(page.locator('.bug:visible')).toHaveCount(4);

    await page.getByRole('button', { name: 'All' }).click();
    await expect(page.locator('.bug:visible')).toHaveCount(6);
  });

  test('bug card expands to show the full details', async ({ page }) => {
    await page.goto(siteUrl);
    const first = page.locator('.bug').first();

    await expect(first.getByText('Expected')).toBeHidden();
    await first.locator('summary').click();
    await expect(first.getByText('Expected')).toBeVisible();
  });

  test('theme toggle switches theme and remembers it after reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(siteUrl);
    const html = page.locator('html');

    await expect(html).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: /Switch to dark theme/ }).click();
    await expect(html).toHaveAttribute('data-theme', 'dark');

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(siteUrl);
    const menuButton = page.getByRole('button', { name: 'Open menu' });

    await expect(page.locator('.site-nav')).toBeHidden();
    await menuButton.click();
    await expect(page.locator('.site-nav')).toBeVisible();

    await page.locator('.site-nav').getByRole('link', { name: 'Contact' }).click();
    await expect(page.locator('.site-nav')).toBeHidden();
  });
});
