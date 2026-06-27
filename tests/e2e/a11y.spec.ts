import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const KEY_PAGES = [
  { path: '/', name: 'Homepage EN' },
  { path: '/es/', name: 'Homepage ES' },
  { path: '/about', name: 'About EN' },
  { path: '/es/about', name: 'About ES' },
  { path: '/projects', name: 'Projects EN' },
  { path: '/es/projects', name: 'Projects ES' },
  { path: '/research', name: 'Research EN' },
  { path: '/es/research', name: 'Research ES' },
] as const;

test.describe('Accessibility — axe-core scan (dark theme)', () => {
  for (const { path, name } of KEY_PAGES) {
    test(`${name} (${path}) should have no critical a11y violations`, async ({ page }) => {
      await page.goto(path);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(results.violations.filter((v) => v.impact === 'critical')).toEqual([]);
    });
  }
});

test.describe('Accessibility — axe-core scan (light theme)', () => {
  for (const { path, name } of KEY_PAGES) {
    test(`${name} (${path}) in light theme should have no critical a11y violations`, async ({
      page,
    }) => {
      await page.goto(path);

      // Switch to light theme
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      });

      // Reload so paint is correct
      await page.reload();

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(results.violations.filter((v) => v.impact === 'critical')).toEqual([]);
    });
  }
});

test.describe('Accessibility — image alt text', () => {
  test('all <img> elements should have alt attribute', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `Image ${i} is missing alt text`).not.toBeNull();
    }
  });

  test('homepage avatar has descriptive alt text', async ({ page }) => {
    await page.goto('/');
    const avatar = page.locator('img[alt*="David"]').first();
    await expect(avatar).toBeVisible();
  });
});

test.describe('Accessibility — focus-visible', () => {
  test('skip-to-content link should be visible on Tab', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');

    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();

    // Verify the link targets the main element
    const href = await skipLink.getAttribute('href');
    expect(href).toBe('#main-content');
  });

  test('interactive elements should have visible focus ring', async ({ page }) => {
    await page.goto('/about');

    // Focus the first link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check that the focused element has a non-default outline
    const focused = page.locator(':focus');
    const outline = await focused.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe('none');
  });
});

test.describe('Accessibility — reduced-motion', () => {
  test('animations should be suppressed with prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const animatedElements = page.locator('.animate-pulse');
    const count = await animatedElements.count();

    for (let i = 0; i < count; i++) {
      const duration = await animatedElements
        .nth(i)
        .evaluate((el) => getComputedStyle(el).animationDuration);
      // With reduced motion, animation duration should be near-zero
      expect(parseFloat(duration)).toBeLessThan(0.02);
    }
  });
});
