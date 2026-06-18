import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		ignores: ['dist', 'node_modules', '.astro', '*.config.js', '*.config.mjs'],
	},
	{
		files: ['src/**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: tsParser,
			globals: {
				console: 'readonly',
				URL: 'readonly',
				URLSearchParams: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error'],
				},
			],
			'prefer-const': 'error',
			'no-var': 'error',
		},
	},
];
