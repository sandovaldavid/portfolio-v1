import fs from 'node:fs/promises';
import path from 'node:path';
import {
	extractImportSpecifiers,
	getAliasCandidates,
	getLayerFromFile,
	validateImport,
} from './architecture-rules.mjs';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'src');
const sourceExtensions = new Set(['.astro', '.cjs', '.js', '.mjs', '.ts', '.tsx']);

/** @param {string} directory */
async function collectSourceFiles(directory) {
	const entries = await fs.readdir(directory, { withFileTypes: true });
	const nestedFiles = await Promise.all(
		entries.map(async entry => {
			const target = path.join(directory, entry.name);
			if (entry.isDirectory()) {
				return collectSourceFiles(target);
			}
			return sourceExtensions.has(path.extname(entry.name)) ? [target] : [];
		})
	);
	return nestedFiles.flat();
}

/** @param {string[]} candidates */
async function hasPublicTarget(candidates) {
	for (const candidate of candidates) {
		try {
			const stats = await fs.stat(path.join(rootDir, candidate));
			if (stats.isFile()) {
				return true;
			}
		} catch {
			// Try the next candidate.
		}
	}
	return false;
}

const files = await collectSourceFiles(sourceDir);
const violations = [];
let checkedImports = 0;
let checkedFiles = 0;

for (const absoluteFile of files) {
	const importer = path.relative(rootDir, absoluteFile).replaceAll(path.sep, '/');
	if (!getLayerFromFile(importer)) {
		continue;
	}

	checkedFiles += 1;
	const source = await fs.readFile(absoluteFile, 'utf8');
	const imports = extractImportSpecifiers(source, importer);

	for (const reference of imports) {
		checkedImports += 1;
		const problems = validateImport({
			importer,
			specifier: reference.specifier,
			rootDir,
		});
		const candidates = getAliasCandidates(reference.specifier);

		if (candidates.length > 0 && !(await hasPublicTarget(candidates))) {
			problems.push(
				`Alias target does not expose a file or index public API. Checked: ${candidates.join(', ')}`
			);
		}

		for (const problem of problems) {
			violations.push({
				file: importer,
				line: reference.line,
				specifier: reference.specifier,
				problem,
			});
		}
	}
}

if (violations.length > 0) {
	console.error('\nArchitecture boundary check failed:\n');
	for (const violation of violations) {
		console.error(
			`- ${violation.file}:${violation.line} -> ${violation.specifier}
  ${violation.problem}`
		);
	}
	console.error(`
${violations.length} violation(s) found.`);
	process.exit(1);
}

console.log(
	`Architecture boundaries passed: ${checkedImports} imports checked across ${checkedFiles} source files.`
);
