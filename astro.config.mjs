// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

import robotsTxt from 'astro-robots-txt';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	experimental: {
		svgOptimizer: svgoOptimizer({
			plugins: ['preset-default', 'removeXMLNS'],
		}),
	},
	integrations: [robotsTxt(), mdx(), sitemap()],
	site: 'https://sandovaldavid.com',
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Press Start 2P',
			cssVariable: '--font-pixel',
			fallbacks: ['monospace'],
			options: {
				variants: [
					{
						weight: '400',
						style: 'normal',
						src: ['./src/assets/fonts/press-start-2p-400.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'VT323',
			cssVariable: '--font-pixel-clean',
			fallbacks: ['monospace'],
			options: {
				variants: [
					{ weight: '400', style: 'normal', src: ['./src/assets/fonts/vt323-400.woff2'] },
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Silkscreen',
			cssVariable: '--font-retro-tag',
			fallbacks: ['monospace'],
			options: {
				variants: [
					{
						weight: '400',
						style: 'normal',
						src: ['./src/assets/fonts/silkscreen-400.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Share Tech Mono',
			cssVariable: '--font-gaming-mono',
			fallbacks: ['monospace'],
			options: {
				variants: [
					{
						weight: '400',
						style: 'normal',
						src: ['./src/assets/fonts/share-tech-mono-400.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			fallbacks: ['monospace'],
			options: {
				variants: [
					{
						weight: '400',
						style: 'normal',
						src: ['./src/assets/fonts/jetbrains-mono-400.woff2'],
					},
				],
			},
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
