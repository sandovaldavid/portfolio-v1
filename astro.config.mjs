// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
	integrations: [robotsTxt()],
	site: 'https://sandovaldavid.com',
	vite: {
		// @ts-ignore - Tailwind CSS v4 vite plugin type compatibility
		plugins: [tailwindcss()],
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
