import { test, expect } from './fixtures';

const pages = [
  { path: '/', name: 'Home (English)' },
  { path: '/about', name: 'About (English)' },
  { path: '/projects', name: 'Projects (English)' },
  { path: '/blog', name: 'Blog (English)' },
  { path: '/es/', name: 'Home (Spanish)' },
  { path: '/es/about', name: 'About (Spanish)' },
  { path: '/es/projects', name: 'Projects (Spanish)' },
  { path: '/es/blog', name: 'Blog (Spanish)' },
];

pages.forEach(({ path, name }) => {
  test(`${name} - should render without errors`, async ({ page }) => {
    await page.goto(path);

    // Verify page loaded successfully
    await expect(page).not.toHaveTitle(/404|Error/i);

    // Check that main content is visible
    const main = page.locator('main, [role="main"]');
    await expect(main).toBeVisible();
  });

  test(`${name} - should have proper meta tags`, async ({ page }) => {
    await page.goto(path);

    // Check for description meta tag
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });

  test(`${name} - should have proper language attribute`, async ({ page }) => {
    await page.goto(path);

    // Check HTML lang attribute
    const htmlElement = page.locator('html');
    const lang = path.includes('/es') ? 'es' : 'en';
    await expect(htmlElement).toHaveAttribute('lang', lang);
  });
});

test.describe('Navigation between pages', () => {
  test('should navigate between English pages', async ({ page }) => {
    await page.goto('/');

    // Try to find and click navigation links
    const links = page.locator('a[href]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have working links', async ({ page }) => {
    await page.goto('/');

    // Get all links
    const links = page.locator('a[href^="/"]');
    const linkCount = await links.count();

    // Test first few internal links
    for (let i = 0; i < Math.min(3, linkCount); i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');

      if (href && href !== '#') {
        const response = await page.goto(href || '/');
        // response is null when navigating to the same URL — skip those
        if (response !== null) {
          expect(response.status()).toBeLessThan(400);
        }
      }
    }
  });
});
