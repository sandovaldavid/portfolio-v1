import { getViteConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

const root = fileURLToPath(new URL('.', import.meta.url));

export default getViteConfig(
	{
		test: {
			globals: true,
			environment: 'node',
			include: ['tests/unit/**/*.spec.ts'],
			coverage: {
				provider: 'v8',
				reporter: ['text', 'json', 'html', 'lcov'],
				include: [
					'src/shared/lib/i18n/**/*.ts',
					'src/shared/config/i18n/**/*.ts',
				],
				exclude: [
					'node_modules/',
					'dist/',
					'tests/',
					'**/*.spec.ts',
					'**/*.test.ts',
					'src/shared/config/i18n/locales/**',
				],
				thresholds: {
					lines: 90,
					functions: 90,
					branches: 90,
					statements: 90,
				},
			},
		},
		resolve: {
			alias: {
				'@shared': path.resolve(root, 'src/shared'),
				'@entities': path.resolve(root, 'src/entities'),
				'@features': path.resolve(root, 'src/features'),
				'@widgets': path.resolve(root, 'src/widgets'),
				'@app': path.resolve(root, 'src/app'),
				'@assets': path.resolve(root, 'src/assets'),
				'@': path.resolve(root, 'src'),
			},
		},
	},
	{
		// Astro config overrides
		site: 'https://sandovaldavid.com',
	}
);
