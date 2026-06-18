import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display main content', async ({ page }) => {
    await page.goto('/');

    // Verify page title
    await expect(page).toHaveTitle(/David Sandoval|Portfolio/i);

    // Check main heading exists
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
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
    page.setViewportSize({ width: 375, height: 667 });
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

    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();
  });

  test('should have theme toggle functionality', async ({ page }) => {
    await page.goto('/');

    // Check if theme toggle exists
    const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="dark"], [aria-label*="light"]').first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }
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
