// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
	integrations: [robotsTxt()],
	site: 'https://sandovaldavid.com',
	vite: {
		// @ts-ignore - Tailwind CSS and visualizer type compatibility
		plugins: [tailwindcss(), visualizer({ filename: 'dist/bundle-analysis/index.html', title: 'Análisis de Bundle - Portafolio', template: 'treemap', gzipSize: true, brotliSize: true })],
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
