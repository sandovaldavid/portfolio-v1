import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const activeRoots = [
	'README.md',
	'README.es.md',
	'AGENTS.md',
	'CONTRIBUTING.md',
	'CLAUDE.md',
	'.github/copilot-instructions.md',
	'.github/instructions',
	'docs',
];
const excludedDirectories = new Set([
	'docs/reports',
	'docs/tasks',
	'docs/FSD-Architecture',
	'docs/archive',
]);
const includedArchivedIndexes = new Set([
	'docs/archive/README.md',
	'docs/reports/README.md',
	'docs/tasks/README.md',
	'docs/FSD-Architecture/README.md',
]);

function toPosix(path) {
	return path.split('\\').join('/');
}

function collectMarkdown(path) {
	const absolute = resolve(repositoryRoot, path);
	if (!existsSync(absolute)) return [];
	const repositoryPath = toPosix(relative(repositoryRoot, absolute));

	if (statSync(absolute).isFile()) {
		return extname(absolute) === '.md' ? [absolute] : [];
	}

	if (excludedDirectories.has(repositoryPath)) {
		return [...includedArchivedIndexes]
			.filter(index => index.startsWith(`${repositoryPath}/`) && existsSync(resolve(repositoryRoot, index)))
			.map(index => resolve(repositoryRoot, index));
	}

	return readdirSync(absolute, { withFileTypes: true }).flatMap(entry =>
		collectMarkdown(join(repositoryPath, entry.name))
	);
}

function normalizeTarget(rawTarget) {
	const withoutTitle = rawTarget.trim().replace(/^<|>$/g, '').split(/\s+["']/u, 1)[0];
	const withoutFragment = withoutTitle.split('#', 1)[0].split('?', 1)[0];
	try {
		return decodeURIComponent(withoutFragment);
	} catch {
		return withoutFragment;
	}
}

function isExternalOrNonFile(target) {
	return (
		!target ||
		target.startsWith('#') ||
		target.startsWith('/') ||
		/^(?:https?:|mailto:|tel:|data:|javascript:)/iu.test(target) ||
		target.includes('{{') ||
		target.includes('<')
	);
}

function resolveCandidate(sourceFile, target) {
	const absolute = normalize(resolve(dirname(sourceFile), target));
	if (existsSync(absolute) && statSync(absolute).isDirectory()) {
		return resolve(absolute, 'README.md');
	}
	return absolute;
}

const markdownFiles = [...new Set(activeRoots.flatMap(collectMarkdown))].sort();
const failures = [];
const markdownLinkPattern = /!?\[[^\]]*\]\(([^)]+)\)/gu;

for (const file of markdownFiles) {
	const source = readFileSync(file, 'utf8');
	for (const match of source.matchAll(markdownLinkPattern)) {
		const target = normalizeTarget(match[1]);
		if (isExternalOrNonFile(target)) continue;

		const candidate = resolveCandidate(file, target);
		if (!existsSync(candidate)) {
			failures.push(
				`${toPosix(relative(repositoryRoot, file))}: ${target} -> ${toPosix(relative(repositoryRoot, candidate))}`
			);
		}
	}
}

if (failures.length > 0) {
	console.error('[check:docs] Broken relative links found:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log(`[check:docs] ${markdownFiles.length} active Markdown files checked; all relative links resolve.`);
