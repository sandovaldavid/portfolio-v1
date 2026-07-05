import { test, expect } from './fixtures';

test.describe('Homepage', () => {
  test('should load and display main content', async ({ page }) => {
    await page.goto('/');

    // Verify page title
    await expect(page).toHaveTitle(/David Sandoval|Portfolio/i);

    // The Hero renders the page's single h1
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/David Sandoval/i);
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Desktop: nav links are visible; mobile: hamburger toggle button is visible
    const desktopNav = page.locator('header nav a').first();
    const mobileToggle = page.locator('button[aria-label="Toggle menu"]');

    const hasDesktop = await desktopNav.isVisible().catch(() => false);
    const hasMobile = await mobileToggle.isVisible().catch(() => false);
    expect(hasDesktop || hasMobile).toBe(true);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify content is visible on mobile
    const content = page.locator('main, [role="main"]');
    await expect(content).toBeVisible();
  });

  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/');

    // Check for images without alt text
    const imagesWithoutAlt = page.locator('img:not([alt])');
    const count = await imagesWithoutAlt.count();
    expect(count).toBe(0);

    // Heading hierarchy (one h1, no level skips) is enforced in typography.spec.ts
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();
  });

  test('should have theme toggle functionality', async ({ page }) => {
    await page.goto('/');

    // The toggle must exist — a missing toggle is a failure, not a skip
    const themeToggle = page.locator('.theme-toggle-btn').first();
    await expect(themeToggle).toBeVisible();

    const html = page.locator('html');

    // Selecting "light" removes the dark class from <html>
    await themeToggle.click();
    await page.locator('.themes-menu-option[data-theme="light"]').first().click();
    await expect(html).not.toHaveClass(/dark/);

    // Selecting "dark" restores it
    await themeToggle.click();
    await page.locator('.themes-menu-option[data-theme="dark"]').first().click();
    await expect(html).toHaveClass(/dark/);
  });
});

test.describe('Page Load Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    await page.goto('/');

    // Use Navigation Timing API for accurate browser-measured load time
    const loadTime = await page.evaluate(() => {
      const [entry] = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[];
      return entry ? Math.round(entry.loadEventEnd - entry.startTime) : 0;
    });

    expect(loadTime).toBeLessThan(3000);
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore 404s for external resources (fonts, analytics) — only fail on JS errors
        if (!text.includes('Failed to load resource') && !text.includes('net::ERR_')) {
          errors.push(text);
        }
      }
    });

    await page.goto('/');
    expect(errors).toEqual([]);
  });
});
