import { test, expect } from './fixtures';

test.describe('Localized shared shell', () => {
	test('renders English navigation, controls and CLI labels', async ({ page }) => {
		await page.goto('/');

		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeAttached();
		await expect(page.getByRole('button', { name: 'Choose theme' })).toBeAttached();
		await expect(page.getByRole('group', { name: 'Choose language' }).first()).toBeAttached();
		await expect(page.getByRole('button', { name: 'Recruiter links' })).toBeVisible();
		await expect(page.locator('a[href="#main-content"]')).toHaveText('Skip to main content');

		await page.keyboard.press('?');
		await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeVisible();
		await page.keyboard.press('Escape');

		await page.keyboard.press(':');
		await expect(page.getByRole('dialog', { name: 'Portfolio CLI terminal' })).toBeVisible();
		await expect(page.getByRole('textbox', { name: 'Terminal command input' })).toHaveAttribute(
			'placeholder',
			"type a command… (try 'help')"
		);
	});

	test('renders Spanish navigation, controls and CLI labels', async ({ page }) => {
		await page.goto('/es/');

		await expect(page.locator('html')).toHaveAttribute('lang', 'es');
		await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeAttached();
		await expect(page.getByRole('button', { name: 'Elegir tema' })).toBeAttached();
		await expect(page.getByRole('group', { name: 'Elegir idioma' }).first()).toBeAttached();
		await expect(page.getByRole('button', { name: 'Enlaces para reclutadores' })).toBeVisible();
		await expect(page.locator('a[href="#main-content"]')).toHaveText(
			'Saltar al contenido principal'
		);

		await page.keyboard.press('?');
		await expect(page.getByRole('dialog', { name: 'Atajos de teclado' })).toBeVisible();
		await page.keyboard.press('Escape');

		await page.keyboard.press(':');
		await expect(
			page.getByRole('dialog', { name: 'Terminal CLI del portafolio' })
		).toBeVisible();
		await expect(
			page.getByRole('textbox', { name: 'Entrada de comandos de la terminal' })
		).toHaveAttribute('placeholder', "escribe un comando… (prueba 'help')");
	});
});
