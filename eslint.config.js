import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
	{
		ignores: ['dist/', '.vercel/', 'node_modules/', '**/*.astro'],
	},
	{
		files: ['src/**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				console: 'readonly',
				document: 'readonly',
				window: 'readonly',
				localStorage: 'readonly',
				URL: 'readonly',
				URLSearchParams: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
		},
		rules: {
			...js.configs.recommended.rules,
			...typescript.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'prefer-const': 'error',
			'no-var': 'error',
		},
	},
];
