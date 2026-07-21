import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const devcontainer = JSON.parse(readFileSync('.devcontainer/devcontainer.json', 'utf8'));
const dockerfile = readFileSync('.devcontainer/Dockerfile', 'utf8');
const postCreateScript = readFileSync('.devcontainer/post-create.sh', 'utf8');
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
	(devcontainerWorkflow.match(/bun install --frozen-lockfile/g) ?? []).length >= 2,
	'the devcontainer workflow must prove that two consecutive frozen installs succeed.'
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
	`Devcontainer contract verified: Bun ${bunVersion}, Playwright ${playwrightVersion}, isolated node_modules.`
);
