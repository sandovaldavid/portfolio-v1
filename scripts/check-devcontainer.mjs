import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const devcontainer = JSON.parse(readFileSync('.devcontainer/devcontainer.json', 'utf8'));
const dockerfile = readFileSync('.devcontainer/Dockerfile', 'utf8');
const postCreateScript = readFileSync('.devcontainer/post-create.sh', 'utf8');
const repairScript = readFileSync('.devcontainer/repair-workspace-permissions.sh', 'utf8');
const dockerTestScript = readFileSync('docker-test.sh', 'utf8');
const prettierIgnore = readFileSync('.prettierignore', 'utf8');
const eslintConfig = readFileSync('eslint.config.js', 'utf8');
const devcontainerWorkflow = readFileSync('.github/workflows/build-devcontainer.yml', 'utf8');

/** @type {string[]} */
const failures = [];

/**
 * @param {unknown} condition
 * @param {string} message
 */
function expect(condition, message) {
	if (!condition) failures.push(message);
}

const bunVersion = packageJson.packageManager?.match(/^bun@(.+)$/)?.[1];
const playwrightVersion = packageJson.devDependencies?.['@playwright/test'];
/** @type {string[]} */
const mounts = Array.isArray(devcontainer.mounts) ? devcontainer.mounts : [];
const workspaceFolder = '/workspaces/portfolio-v1';
const dependencyVolumeMount =
	'source=${localWorkspaceFolderBasename}-devcontainer-node_modules,target=${containerWorkspaceFolder}/node_modules,type=volume';

expect(Boolean(bunVersion), 'packageManager must pin Bun as bun@<version>.');
expect(
	/^\d+\.\d+\.\d+$/.test(playwrightVersion ?? ''),
	'@playwright/test must use an exact compatibility-sensitive version.'
);

expect(
	dockerfile.includes(`ARG BUN_VERSION=${bunVersion}`),
	'.devcontainer/Dockerfile must pin the packageManager Bun version.'
);
expect(
	dockerfile.includes(`ARG PLAYWRIGHT_VERSION=${playwrightVersion}`),
	'.devcontainer/Dockerfile must pin the project Playwright version.'
);
expect(
	devcontainer.build?.args?.BUN_VERSION === bunVersion,
	'devcontainer.json must pass the packageManager Bun version to the image build.'
);
expect(
	devcontainer.build?.args?.PLAYWRIGHT_VERSION === playwrightVersion,
	'devcontainer.json must pass the project Playwright version to the image build.'
);
expect(
	devcontainer.workspaceMount ===
		`source=${'${localWorkspaceFolder}'},target=${workspaceFolder},type=bind,consistency=cached`,
	'devcontainer.json must mount the repository at the canonical workspace path.'
);
expect(
	devcontainer.workspaceFolder === workspaceFolder,
	'devcontainer.json must open the canonical workspace folder.'
);
expect(
	mounts.includes(dependencyVolumeMount),
	'devcontainer.json must isolate node_modules in a named Docker volume.'
);
expect(
	Boolean(devcontainer.features?.['ghcr.io/devcontainers/features/docker-outside-of-docker:1']),
	'devcontainer.json must enable Docker outside of Docker.'
);
expect(
	Boolean(devcontainer.features?.['ghcr.io/devcontainers/features/github-cli:1']),
	'devcontainer.json must install GitHub CLI support.'
);
expect(
	devcontainer.postCreateCommand === 'bash .devcontainer/post-create.sh',
	'devcontainer.json must use the versioned post-create script.'
);
expect(
	devcontainer.containerEnv?.DEVCONTAINER === 'true',
	'devcontainer.json must identify the managed development shell.'
);
expect(
	postCreateScript.includes('bash .devcontainer/repair-workspace-permissions.sh'),
	'post-create setup must repair generated workspace paths before validation.'
);
expect(
	postCreateScript.includes('/proc/self/mountinfo'),
	'post-create setup must verify that node_modules is a separate mount.'
);
expect(
	postCreateScript.includes('sudo chown'),
	'post-create setup must make the dependency volume writable by the remote user.'
);
expect(
	postCreateScript.includes('bun install --frozen-lockfile'),
	'post-create setup must install from the committed lockfile.'
);
expect(
	postCreateScript.includes('bun run check:devcontainer'),
	'post-create setup must validate the devcontainer contract.'
);
expect(
	repairScript.includes('generated_paths=(') && repairScript.includes('.docker'),
	'the repair script must use an explicit allowlist of generated paths.'
);
expect(
	!repairScript.includes('chown -R "$owner" -- "$REPOSITORY_ROOT"'),
	'the repair script must never recursively change ownership of the repository root.'
);
expect(
	dockerTestScript.includes('bash .devcontainer/repair-workspace-permissions.sh'),
	'the Docker test wrapper must repair generated runtime paths inside the devcontainer.'
);
expect(
	prettierIgnore.split(/\r?\n/).includes('.docker/'),
	'.prettierignore must exclude Docker runtime state.'
);
expect(
	eslintConfig.includes("'**/.docker/**'"),
	'ESLint must globally exclude Docker runtime state and nested cache configurations.'
);
expect(
	(devcontainerWorkflow.match(/bun install --frozen-lockfile/g) ?? []).length >= 2,
	'the devcontainer workflow must prove that two consecutive frozen installs succeed.'
);
expect(
	devcontainerWorkflow.includes('Create stale generated ownership fixtures'),
	'the devcontainer workflow must validate recovery from stale generated ownership.'
);
expect(
	devcontainerWorkflow.includes('Create hostile nested ESLint fixture'),
	'the devcontainer workflow must prove ESLint does not traverse Docker runtime state.'
);
expect(
	devcontainer.containerEnv?.PLAYWRIGHT_BROWSERS_PATH === '/ms-playwright',
	'devcontainer.json must use the browsers bundled with the Playwright image.'
);
expect(devcontainer.remoteUser === 'pwuser', 'The development user must be pwuser.');
expect(devcontainer.updateRemoteUserUID === true, 'Host UID mapping must remain enabled.');

if (failures.length > 0) {
	console.error('Devcontainer contract validation failed:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log(
	`Devcontainer contract verified: Bun ${bunVersion}, Playwright ${playwrightVersion}, isolated node_modules, repairable generated paths, isolated Docker lint scope.`
);
