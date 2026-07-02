#!/usr/bin/env node

/**
 * Bundle size report for the production build.
 * Mirrors the inline analysis CI runs in the `build` job of .github/workflows/ci.yml,
 * so `bun run bundle:analyze` gives the same numbers locally after `bun run build`.
 *
 * Usage: bun run build && bun run bundle:analyze
 */

import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs';
import path from 'path';

const DIST_DIR = 'dist';
const DIST_ASTRO_DIR = path.join(DIST_DIR, '_astro');
const OUTPUT_DIR = 'bundle-analysis';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'report.txt');

function humanSize(bytes) {
	if (bytes < 1024) return `${bytes}B`;
	const units = ['KB', 'MB', 'GB'];
	let size = bytes;
	let unitIndex = -1;
	do {
		size /= 1024;
		unitIndex++;
	} while (size >= 1024 && unitIndex < units.length - 1);
	return `${size.toFixed(1)}${units[unitIndex]}`;
}

function listFiles(dir, extension) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir)
		.filter((file) => file.endsWith(extension))
		.map((file) => ({ file, size: statSync(path.join(dir, file)).size }))
		.sort((a, b) => b.size - a.size);
}

function dirSize(dir) {
	if (!existsSync(dir)) return 0;
	let total = 0;
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const entryPath = path.join(dir, entry.name);
		total += entry.isDirectory() ? dirSize(entryPath) : statSync(entryPath).size;
	}
	return total;
}

if (!existsSync(DIST_DIR)) {
	console.error(`[bundle:analyze] ${DIST_DIR}/ not found — run "bun run build" first.`);
	process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

const jsFiles = listFiles(DIST_ASTRO_DIR, '.js');
const cssFiles = listFiles(DIST_ASTRO_DIR, '.css');
const totalSize = dirSize(DIST_DIR);

const lines = [
	'=== JavaScript Bundle Analysis ===',
	jsFiles.length ? jsFiles.map((f) => `${humanSize(f.size)}\t${f.file}`).join('\n') : 'No JS files',
	'',
	'=== CSS Bundle Analysis ===',
	cssFiles.length ? cssFiles.map((f) => `${humanSize(f.size)}\t${f.file}`).join('\n') : 'No CSS files',
	'',
	'=== Total Size ===',
	`${humanSize(totalSize)}\t${DIST_DIR}`,
];

const report = lines.join('\n') + '\n';
writeFileSync(OUTPUT_FILE, report);

console.log(report);
console.log(`[bundle:analyze] Report written to ${OUTPUT_FILE}`);
console.log(`[bundle:analyze] Treemap (generated during build): ${OUTPUT_DIR}/index.html`);
