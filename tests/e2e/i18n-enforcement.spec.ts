import type { Page } from '@playwright/test';
import {
	REPRESENTATIVE_ROUTE_PAIRS,
	SPANISH_FORBIDDEN_PHRASES,
} from '../../scripts/i18n/config.mjs';
import { expect, test } from './fixtures';

const normalizeRoute = (route: string): string => {
	const pathname = new URL(route, 'https://sandovaldavid.com').pathname;
	return pathname === '/' ? pathname : pathname.replace(/\/$/, '');
};

async function expectLocalizedRoute(
	page: Page,
	route: string,
	locale: 'en' | 'es',
	expectedEnglishPath: string,
	expectedSpanishPath: string
) {
	const response = await page.goto(route);
	expect(response?.ok()).toBe(true);
	await expect(page.locator('html')).toHaveAttribute('lang', locale);

	const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
	expect(canonical).toBeTruthy();
	expect(normalizeRoute(canonical ?? '')).toBe(normalizeRoute(route));

	const englishAlternate = await page
		.locator('link[rel="alternate"][hreflang="en"]')
		.getAttribute('href');
	const spanishAlternate = await page
		.locator('link[rel="alternate"][hreflang="es"]')
		.getAttribute('href');
	const defaultAlternate = await page
		.locator('link[rel="alternate"][hreflang="x-default"]')
		.getAttribute('href');

	expect(normalizeRoute(englishAlternate ?? '')).toBe(normalizeRoute(expectedEnglishPath));
	expect(normalizeRoute(spanishAlternate ?? '')).toBe(normalizeRoute(expectedSpanishPath));
	expect(normalizeRoute(defaultAlternate ?? '')).toBe(normalizeRoute(expectedEnglishPath));

	const languageTargets = await page
		.locator('a[data-language-base-path]')
		.evaluateAll(links =>
			links.map(link => (link as HTMLAnchorElement).dataset.languageBasePath).filter(Boolean)
		);
	expect(languageTargets.map(normalizeRoute)).toContain(normalizeRoute(expectedEnglishPath));
	expect(languageTargets.map(normalizeRoute)).toContain(normalizeRoute(expectedSpanishPath));

	if (locale === 'es') {
		const html = await page.content();
		for (const phrase of SPANISH_FORBIDDEN_PHRASES) {
			expect(html, `${route} contains English-only phrase: ${phrase}`).not.toContain(phrase);
		}
	}
}

test.describe('mandatory bilingual route matrix', () => {
	for (const pair of REPRESENTATIVE_ROUTE_PAIRS) {
		test(`${pair.english} and ${pair.spanish} expose verified localized contracts`, async ({
			page,
		}) => {
			await expectLocalizedRoute(page, pair.english, 'en', pair.english, pair.spanish);
			await expectLocalizedRoute(page, pair.spanish, 'es', pair.english, pair.spanish);
		});
	}

	for (const scenario of [
		{ route: '/missing-i18n-quality-route', locale: 'en' },
		{ route: '/es/missing-i18n-quality-route', locale: 'es' },
	] as const) {
		test(`${scenario.route} preserves localized 404 behavior`, async ({ page }) => {
			const response = await page.goto(scenario.route);
			expect(response?.status()).toBe(404);
			await expect(page.locator('html')).toHaveAttribute('lang', scenario.locale);
		});
	}
});
