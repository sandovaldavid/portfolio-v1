import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const devcontainer = JSON.parse(readFileSync('.devcontainer/devcontainer.json', 'utf8'));
const dockerfile = readFileSync('.devcontainer/Dockerfile', 'utf8');
const postCreateScript = readFileSync('.devcontainer/post-create.sh', 'utf8');
const repairScript = readFileSync('.devcontainer/repair-workspace-permissions.sh', 'utf8');
const dockerCompose = readFileSync('docker-compose.yml', 'utf8');
const dockerTestScript = readFileSync('docker-test.sh', 'utf8');
const runPlaywrightScript = readFileSync('scripts/run-playwright.mjs', 'utf8');
const prettierIgnore = readFileSync('.prettierignore', 'utf8');
const eslintConfig = readFileSync('eslint.config.js', 'utf8');
const preCommitHook = readFileSync('.husky/pre-commit', 'utf8');
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
/** @type {string[]} */
const runArgs = Array.isArray(devcontainer.runArgs) ? devcontainer.runArgs : [];
const workspaceFolder = '/workspaces/portfolio-v1';
const dependencyVolumeMount =
	'source=${localWorkspaceFolderBasename}-devcontainer-node_modules,target=${containerWorkspaceFolder}/node_modules,type=volume';
const repairCommand = 'bash .devcontainer/repair-workspace-permissions.sh';

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
	dockerfile.includes('ARG DEVCONTAINER_UID=1000') &&
		dockerfile.includes('ARG DEVCONTAINER_GID=1000') &&
		dockerfile.includes('usermod --uid "${DEVCONTAINER_UID}"') &&
		dockerfile.includes('groupmod --gid "${DEVCONTAINER_GID}" pwuser'),
	'the development image must normalize pwuser to the standard Linux UID/GID before runtime remapping.'
);
expect(
	dockerfile.includes('USER pwuser') && dockerfile.includes('WORKDIR /workspaces/portfolio-v1'),
	'the development image must finish as pwuser in the canonical workspace.'
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
	devcontainer.remoteUser === 'pwuser' && devcontainer.containerUser === 'pwuser',
	'VS Code and all default container processes must run as pwuser.'
);
expect(devcontainer.updateRemoteUserUID === true, 'Host UID mapping must remain enabled.');
expect(devcontainer.init === true, 'The devcontainer must use an init process as PID 1.');
expect(
	runArgs.includes('--ipc=host'),
	'The devcontainer must share host IPC for direct Chromium execution.'
);
expect(
	devcontainer.postCreateCommand === 'bash .devcontainer/post-create.sh',
	'devcontainer.json must use the versioned post-create script.'
);
expect(
	devcontainer.postStartCommand === repairCommand,
	'devcontainer.json must repair writable state whenever the container starts.'
);
expect(
	devcontainer.postAttachCommand === repairCommand,
	'devcontainer.json must repair writable state whenever VS Code attaches.'
);
expect(
	devcontainer.waitFor === 'postStartCommand',
	'VS Code must wait for startup permission repair before attaching extensions.'
);
expect(
	devcontainer.containerEnv?.DEVCONTAINER === 'true',
	'devcontainer.json must identify the managed development shell.'
);
expect(
	devcontainer.containerEnv?.HOST_WORKSPACE_FOLDER === '${localWorkspaceFolder}',
	'devcontainer.json must expose the real host workspace path to Docker Compose.'
);
expect(
	devcontainer.containerEnv?.PLAYWRIGHT_BROWSERS_PATH === '/ms-playwright',
	'devcontainer.json must use the browsers bundled with the Playwright image.'
);
expect(
	devcontainer.containerEnv?.TERM === 'xterm-256color',
	'devcontainer.json must expose a consistent interactive terminal capability.'
);
expect(
	postCreateScript.includes(repairCommand),
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
	repairScript.includes('git rev-parse --absolute-git-dir') &&
		repairScript.includes('chown -R --no-dereference'),
	'the repair script must restore writable Git metadata without following symbolic links.'
);
expect(
	repairScript.includes('workspace_uid=') &&
		repairScript.includes('Development container identity mismatch') &&
		repairScript.includes('Rebuild Container Without Cache'),
	'the repair script must reject stale containers whose UID differs from the Linux bind mount owner.'
);
expect(
	repairScript.includes('bun_home=') &&
		repairScript.includes('.devcontainer-owner-state') &&
		repairScript.includes('Repairing inherited Bun home') &&
		repairScript.includes('bun_probe='),
	'the repair script must version, repair and verify the writable Bun home.'
);
expect(
	repairScript.includes('.devcontainer-volume-state') &&
		repairScript.includes('Repairing inherited node_modules volume') &&
		repairScript.includes('dependency_probe='),
	'the repair script must version, repair and verify the dependency volume.'
);
expect(
	repairScript.includes('generated_paths=(') && repairScript.includes('.docker'),
	'the repair script must use an explicit allowlist of generated paths.'
);
expect(
	repairScript.includes('sudo mkdir -p .docker/runtime/node_modules .docker/runtime/home'),
	'the repair script must be able to recreate generated Docker runtime paths before assigning ownership.'
);
expect(
	!repairScript.includes('chown -R "$owner" -- "$REPOSITORY_ROOT"'),
	'the repair script must never recursively change ownership of the repository root.'
);
expect(
	dockerCompose.includes('init: true') && dockerCompose.includes('ipc: host'),
	'the pinned Playwright container must use init and host IPC.'
);
expect(
	dockerCompose.includes("'${HOST_WORKSPACE_FOLDER:-.}:/workspace:z'"),
	'Docker Compose must bind the real host workspace into the Playwright container.'
);
expect(
	dockerTestScript.includes('HOST_WORKSPACE_FOLDER') &&
		dockerTestScript.includes('test -f /workspace/package.json') &&
		dockerTestScript.includes('VERIFY_DOCKER_WORKSPACE_ONLY'),
	'the Docker test wrapper must validate the host workspace mount before running tests.'
);
expect(
	dockerTestScript.includes(repairCommand),
	'the Docker test wrapper must repair generated runtime paths inside the devcontainer.'
);
expect(
	runPlaywrightScript.includes("spawnSync('bash'") &&
		runPlaywrightScript.includes('.devcontainer/repair-workspace-permissions.sh'),
	'direct Playwright commands must repair stale generated output inside the devcontainer.'
);
expect(
	packageJson.scripts?.['test:e2e:smoke']?.startsWith('node scripts/run-playwright.mjs'),
	'the smoke gate must use the permission-aware Playwright runner.'
);
expect(
	prettierIgnore.split(/\r?\n/).includes('.docker/'),
	'.prettierignore must exclude Docker runtime state.'
);
expect(
	packageJson.scripts?.format === 'node scripts/format-tracked-files.mjs --write',
	'the write formatter must operate only on Git-tracked files.'
);
expect(
	packageJson.scripts?.['format:check'] === 'node scripts/format-tracked-files.mjs --check',
	'the formatting gate must operate only on Git-tracked files.'
);
expect(
	eslintConfig.includes("'**/.docker/**'"),
	'ESLint must globally exclude Docker runtime state and nested cache configurations.'
);
expect(
	preCommitHook.includes('bun run lint') && preCommitHook.includes('bun run format:check'),
	'the pre-commit hook must run non-mutating lint and formatting gates.'
);
expect(
	!preCommitHook.includes('lint:fix') && !preCommitHook.includes('git add -A'),
	'the pre-commit hook must not autofix or stage unrelated repository changes.'
);
expect(
	(devcontainerWorkflow.match(/bun install --frozen-lockfile/g) ?? []).length >= 2,
	'the devcontainer workflow must prove that two consecutive frozen installs succeed.'
);
expect(
	devcontainerWorkflow.includes('Verify Linux workspace identity alignment'),
	'the devcontainer workflow must assert that the remote user owns the bind-mounted workspace.'
);
expect(
	devcontainerWorkflow.includes('Create stale Git metadata fixture'),
	'the devcontainer workflow must validate recovery from an unwritable FETCH_HEAD.'
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
	devcontainerWorkflow.includes('Create hostile Prettier traversal fixture'),
	'the devcontainer workflow must prove Prettier does not enumerate Docker runtime state.'
);
expect(
	devcontainerWorkflow.includes(
		'Recreate stale Playwright output before the direct smoke command'
	),
	'the devcontainer workflow must prove the direct Playwright runner repairs stale output.'
);
expect(
	devcontainerWorkflow.includes('VERIFY_DOCKER_WORKSPACE_ONLY=true bash docker-test.sh'),
	'the devcontainer workflow must prove Docker can mount the real host workspace.'
);
expect(
	devcontainerWorkflow.includes('sh .husky/pre-commit'),
	'the devcontainer workflow must execute the real pre-commit hook.'
);

if (failures.length > 0) {
	console.error('Devcontainer contract validation failed:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log(
	`Devcontainer contract verified: Bun ${bunVersion}, Playwright ${playwrightVersion}, normalized Linux identity, init and IPC isolation settings, writable Git metadata and Bun home, isolated node_modules, lifecycle repair, tracked-file formatting, permission-aware Playwright, and host-aware Docker mounts.`
);
