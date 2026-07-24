import { existsSync } from 'node:fs';
import path from 'node:path';
import { HARD_CODED_TEXT_ALLOWLIST } from './config.mjs';
import {
	assertNoIssues,
	isDirectExecution,
	lineAt,
	listFiles,
	readText,
	REPOSITORY_ROOT,
	repositoryRelative,
	runValidationCli,
} from './shared.mjs';

const PRODUCTION_EXTENSIONS = new Set(['.astro', '.ts', '.tsx']);
const EXCLUDED_PREFIXES = [
	'src/assets/',
	'src/content/',
	'src/shared/config/i18n/locales/',
];
const USER_FACING_ATTRIBUTES = ['aria-label', 'aria-description', 'alt', 'title', 'placeholder'];

/** @param {string} value */
function normalizeLiteral(value) {
	return value.replace(/\s+/g, ' ').trim();
}

/** @param {string} value */
function looksLikeUserFacingText(value) {
	const normalized = normalizeLiteral(value);
	if (!normalized || normalized.includes('{') || normalized.includes('}')) return false;
	if (/^(?:https?:|mailto:|tel:|\/|\.|#|[A-Za-z]+:)/.test(normalized)) return false;
	const words = normalized.match(/\p{L}[\p{L}\p{M}'’-]*/gu) ?? [];
	return words.length >= 2;
}

/** @param {string} value */
function maskPreservingLines(value) {
	return value.replace(/[^\n]/g, ' ');
}

/** @param {string} source */
function astroTemplate(source) {
	return source
		.replace(/^---\s*\n[\s\S]*?\n---\s*/m, maskPreservingLines)
		.replace(/<!--([\s\S]*?)-->/g, maskPreservingLines)
		.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, maskPreservingLines)
		.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, maskPreservingLines);
}

/**
 * @param {string} file
 * @param {string} value
 */
function allowlistEntry(file, value) {
	const normalized = normalizeLiteral(value);
	return HARD_CODED_TEXT_ALLOWLIST.find(
		entry => entry.file === file && normalizeLiteral(entry.value) === normalized
	);
}

/**
 * @param {string} template
 * @param {string} file
 * @param {{ file: string; message: string }[]} issues
 */
function inspectLiteralAttributes(template, file, issues) {
	const attributePattern = new RegExp(
		`\\b(${USER_FACING_ATTRIBUTES.join('|')})\\s*=\\s*(["'])([^"']*\\p{L}[^"']*)\\2`,
		'gu'
	);
	for (const match of template.matchAll(attributePattern)) {
		const attribute = match[1] ?? 'attribute';
		const value = normalizeLiteral(match[3] ?? '');
		if (!looksLikeUserFacingText(value) || allowlistEntry(file, value)) continue;
		issues.push({
			file: `${file}:${lineAt(template, match.index ?? 0)}`,
			message: `hardcoded user-facing ${attribute} value ${JSON.stringify(value)}; use the owning catalog or content source`,
		});
	}
}

/**
 * @param {string} template
 * @param {string} file
 * @param {{ file: string; message: string }[]} issues
 */
function inspectTemplateText(template, file, issues) {
	for (const match of template.matchAll(/>([^<{][^<]*?)</gs)) {
		const value = normalizeLiteral(match[1] ?? '');
		if (!looksLikeUserFacingText(value) || allowlistEntry(file, value)) continue;
		issues.push({
			file: `${file}:${lineAt(template, match.index ?? 0)}`,
			message: `hardcoded visible text ${JSON.stringify(value)}; use the owning catalog or content source`,
		});
	}
}

/**
 * @param {string} source
 * @param {string} file
 * @param {{ file: string; message: string }[]} issues
 */
function inspectBilingualPatterns(source, file, issues) {
	const copyMapPatterns = [
		/\b(?:const|let|var)\s+([A-Za-z0-9_]*(?:copy|labels|messages|translations)[A-Za-z0-9_]*)\s*=\s*\{[\s\S]{0,2000}?\ben\s*:[\s\S]{0,1000}?\bes\s*:/gi,
		/\b(?:const|let|var)\s+([A-Za-z0-9_]*(?:copy|labels|messages|translations)[A-Za-z0-9_]*)\s*=\s*\{[\s\S]{0,2000}?\bes\s*:[\s\S]{0,1000}?\ben\s*:/gi,
	];
	for (const pattern of copyMapPatterns) {
		for (const match of source.matchAll(pattern)) {
			issues.push({
				file: `${file}:${lineAt(source, match.index ?? 0)}`,
				message: `component-local bilingual map "${match[1] ?? '<anonymous>'}" is prohibited; move copy to mirrored catalogs or localized content`,
			});
		}
	}

	const ternaryPattern = /\b(?:lang|locale|currentLocale)\s*===?\s*(?:Language\.ENGLISH|["']en["'])\s*\?\s*(["'`])([^"'`\n]+)\1\s*:\s*(["'`])([^"'`\n]+)\3/g;
	for (const match of source.matchAll(ternaryPattern)) {
		const english = normalizeLiteral(match[2] ?? '');
		const spanish = normalizeLiteral(match[4] ?? '');
		if (!looksLikeUserFacingText(english) && !looksLikeUserFacingText(spanish)) continue;
		issues.push({
			file: `${file}:${lineAt(source, match.index ?? 0)}`,
			message: `locale ternary selects complete messages (${JSON.stringify(english)} / ${JSON.stringify(spanish)}); use a typed translator`,
		});
	}
}

/**
 * @param {string} source
 * @param {string} file
 * @param {{ file: string; message: string }[]} issues
 */
function inspectDomTextSinks(source, file, issues) {
	const assignmentPattern = /\b(textContent|innerText|innerHTML|ariaLabel|title|placeholder)\s*=\s*(["'`])([^"'`\n]*\p{L}[^"'`\n]*)\2/gu;
	for (const match of source.matchAll(assignmentPattern)) {
		const value = normalizeLiteral(match[3] ?? '');
		if (!looksLikeUserFacingText(value) || allowlistEntry(file, value)) continue;
		issues.push({
			file: `${file}:${lineAt(source, match.index ?? 0)}`,
			message: `hardcoded DOM ${match[1] ?? 'text'} value ${JSON.stringify(value)}; pass localized copy into the runtime`,
		});
	}

	const setAttributePattern = /setAttribute\(\s*(["'])(aria-label|aria-description|alt|title|placeholder)\1\s*,\s*(["'`])([^"'`\n]*\p{L}[^"'`\n]*)\3\s*\)/gu;
	for (const match of source.matchAll(setAttributePattern)) {
		const value = normalizeLiteral(match[4] ?? '');
		if (!looksLikeUserFacingText(value) || allowlistEntry(file, value)) continue;
		issues.push({
			file: `${file}:${lineAt(source, match.index ?? 0)}`,
			message: `hardcoded setAttribute(${JSON.stringify(match[2] ?? 'attribute')}) value ${JSON.stringify(value)}; pass localized copy into the runtime`,
		});
	}
}

/**
 * @param {{ rootDir?: string }} [options]
 */
export function validateHardcodedCopy({ rootDir = REPOSITORY_ROOT } = {}) {
	const sourceRoot = path.join(rootDir, 'src');
	/** @type {{ file: string; message: string }[]} */
	const issues = [];
	let inspectedFiles = 0;

	for (const filePath of listFiles(sourceRoot, PRODUCTION_EXTENSIONS)) {
		const file = repositoryRelative(filePath, rootDir);
		if (EXCLUDED_PREFIXES.some(prefix => file.startsWith(prefix)) || file.endsWith('.d.ts')) {
			continue;
		}
		inspectedFiles += 1;
		const source = readText(filePath);
		inspectBilingualPatterns(source, file, issues);
		inspectDomTextSinks(source, file, issues);
		if (path.extname(filePath) === '.astro' || path.extname(filePath) === '.tsx') {
			const template = astroTemplate(source);
			inspectLiteralAttributes(template, file, issues);
			inspectTemplateText(template, file, issues);
		}
	}

	for (const entry of HARD_CODED_TEXT_ALLOWLIST) {
		const target = path.join(rootDir, entry.file);
		if (!existsSync(target) || !readText(target).includes(entry.value)) {
			issues.push({
				file: 'scripts/i18n/config.mjs',
				message: `stale hardcoded-copy allowlist entry for ${entry.file}: ${JSON.stringify(entry.value)}`,
			});
			continue;
		}
		if (!entry.reason.trim()) {
			issues.push({
				file: 'scripts/i18n/config.mjs',
				message: `allowlist entry for ${entry.file} must include a non-empty reason`,
			});
		}
	}

	assertNoIssues('i18n:hardcoded', issues);
	return `${inspectedFiles} production Astro/TypeScript file(s) checked for prohibited copy patterns.`;
}

if (isDirectExecution(import.meta.url)) {
	runValidationCli('i18n:hardcoded', () => validateHardcodedCopy());
}
