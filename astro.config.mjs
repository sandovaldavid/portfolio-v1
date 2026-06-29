// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
	experimental: {
		svgOptimizer: svgoOptimizer({
			plugins: ['preset-default', 'removeXMLNS'],
		}),
	},
	integrations: [robotsTxt()],
	site: 'https://sandovaldavid.com',
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Press Start 2P',
			cssVariable: '--font-pixel',
			weights: ['400'],
			fallbacks: ['monospace'],
		},
		{
			provider: fontProviders.google(),
			name: 'VT323',
			cssVariable: '--font-pixel-clean',
			weights: ['400'],
			fallbacks: ['monospace'],
		},
		{
			provider: fontProviders.google(),
			name: 'Silkscreen',
			cssVariable: '--font-retro-tag',
			weights: ['400'],
			fallbacks: ['monospace'],
		},
		{
			provider: fontProviders.google(),
			name: 'Share Tech Mono',
			cssVariable: '--font-gaming-mono',
			weights: ['400'],
			fallbacks: ['monospace'],
		},
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			weights: ['400'],
			fallbacks: ['monospace'],
		},
	],
	vite: {
		// @ts-ignore - Tailwind CSS and visualizer type compatibility
		plugins: [tailwindcss(), visualizer({ filename: 'bundle-analysis/index.html', title: 'Análisis de Bundle - Portafolio', template: 'treemap', gzipSize: true, brotliSize: true })],
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
