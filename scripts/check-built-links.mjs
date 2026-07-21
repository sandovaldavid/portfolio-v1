import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const referencePattern = /\b(?:href|src)=["']([^"'<>]+)["']/g;
const externalPattern = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

/**
 * @param {string} directory
 * @returns {Promise<string[]>}
 */
async function collectHtmlFiles(directory) {
	const entries = await fs.readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async entry => {
			const target = path.join(directory, entry.name);
			if (entry.isDirectory()) {
				return collectHtmlFiles(target);
			}
			return entry.name.endsWith('.html') ? [target] : [];
		})
	);
	return files.flat();
}

/**
 * @param {string} html
 * @returns {string[]}
 */
function extractReferences(html) {
	const references = [];
	for (const match of html.matchAll(referencePattern)) {
		references.push(match[1]);
	}
	return references;
}

/** @param {string} filePath */
async function exists(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

/**
 * @param {string} reference
 * @param {string} htmlFile
 * @returns {string[]}
 */
function getCandidates(reference, htmlFile) {
	const withoutQuery = reference.split(/[?#]/, 1)[0];
	let decoded;
	try {
		decoded = decodeURIComponent(withoutQuery);
	} catch {
		decoded = withoutQuery;
	}

	const resolved = decoded.startsWith('/')
		? path.join(distDir, decoded)
		: path.resolve(path.dirname(htmlFile), decoded);

	if (decoded.endsWith('/')) {
		return [path.join(resolved, 'index.html')];
	}
	if (path.extname(resolved)) {
		return [resolved];
	}
	return [resolved, `${resolved}.html`, path.join(resolved, 'index.html')];
}

/** @param {string} reference */
function shouldIgnore(reference) {
	return (
		!reference ||
		reference.startsWith('#') ||
		reference.startsWith('?') ||
		reference.startsWith('//') ||
		reference.startsWith('data:') ||
		externalPattern.test(reference)
	);
}

const htmlFiles = await collectHtmlFiles(distDir);
const violations = [];
let checkedReferences = 0;

for (const htmlFile of htmlFiles) {
	const html = await fs.readFile(htmlFile, 'utf8');
	for (const reference of extractReferences(html)) {
		if (shouldIgnore(reference)) {
			continue;
		}

		checkedReferences += 1;
		const candidates = getCandidates(reference, htmlFile);
		const withinDist = candidates.every(candidate => {
			const relative = path.relative(distDir, candidate);
			return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
		});
		if (!withinDist) {
			violations.push(`${path.relative(rootDir, htmlFile)} -> ${reference} escapes dist/`);
			continue;
		}

		let found = false;
		for (const candidate of candidates) {
			if (await exists(candidate)) {
				found = true;
				break;
			}
		}
		if (!found) {
			violations.push(
				`${path.relative(rootDir, htmlFile)} -> ${reference} (checked ${candidates
					.map(candidate => path.relative(rootDir, candidate))
					.join(', ')})`
			);
		}
	}
}

if (violations.length > 0) {
	console.error('\nGenerated internal link check failed:\n');
	for (const violation of violations) {
		console.error(`- ${violation}`);
	}
	console.error(`\n${violations.length} broken reference(s) found.`);
	process.exit(1);
}

console.log(
	`Generated internal links passed: ${checkedReferences} references checked across ${htmlFiles.length} HTML files.`
);
