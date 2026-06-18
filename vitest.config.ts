import { defineConfig } from 'vitest/config';
import { getViteConfig } from 'astro/config';

export default defineConfig(
  getViteConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [],
      include: ['tests/unit/**/*.spec.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        exclude: [
          'node_modules/',
          'dist/',
          'tests/',
          '**/*.spec.ts',
          '**/*.test.ts',
        ],
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
      testTimeout: 10000,
    },
  })
);
