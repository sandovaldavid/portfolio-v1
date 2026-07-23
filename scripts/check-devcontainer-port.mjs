import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const devcontainer = JSON.parse(readFileSync('.devcontainer/devcontainer.json', 'utf8'));
const vscodeTasks = JSON.parse(readFileSync('.vscode/tasks.json', 'utf8'));
const vscodeLaunch = JSON.parse(readFileSync('.vscode/launch.json', 'utf8'));
const expectedPublications = new Map([
	['4321', '127.0.0.1:4321:4321'],
	['9323', '127.0.0.1:9323:9323'],
]);
const appPorts = Array.isArray(devcontainer.appPort) ? devcontainer.appPort : [];
const forwardedPorts = Array.isArray(devcontainer.forwardPorts) ? devcontainer.forwardPorts : [];
const tasks = Array.isArray(vscodeTasks.tasks) ? vscodeTasks.tasks : [];
const launchConfigurations = Array.isArray(vscodeLaunch.configurations)
	? vscodeLaunch.configurations
	: [];
const failures = [];

for (const [port, publication] of expectedPublications) {
	if (!appPorts.includes(publication)) {
		failures.push(`appPort must publish ${publication}.`);
	}

	if (devcontainer.portsAttributes?.[port]?.onAutoForward !== 'ignore') {
		failures.push(`port ${port} must disable duplicate VS Code auto-forwarding.`);
	}
}

if (appPorts.length !== expectedPublications.size) {
	failures.push('appPort must expose only the reviewed Astro and Playwright loopback ports.');
}

if (forwardedPorts.length > 0) {
	failures.push('forwardPorts must remain empty when Docker publishes development ports.');
}

if (packageJson.scripts?.['dev:host'] !== 'astro dev --host 0.0.0.0') {
	failures.push('dev:host must make Astro reachable through the Docker loopback publication.');
}

if (
	packageJson.scripts?.['test:e2e:report'] !==
	'playwright show-report playwright-report --host 0.0.0.0 --port 9323'
) {
	failures.push('test:e2e:report must serve the local Playwright report on container port 9323.');
}

const hostDevelopmentTask = tasks.find(
	(task) => task.label === 'Portfolio: Start Dev Server on Host'
);
if (hostDevelopmentTask?.command !== 'bun run dev:host') {
	failures.push('VS Code must expose a task that starts the reviewed host development command.');
}

const hostDevelopmentLaunch = launchConfigurations.find(
	(configuration) => configuration.name === 'Portfolio: Dev Server + Host Browser'
);
if (
	hostDevelopmentLaunch?.type !== 'node-terminal' ||
	hostDevelopmentLaunch?.command !== 'bun run dev:host' ||
	hostDevelopmentLaunch?.serverReadyAction?.uriFormat !== 'http://localhost:4321' ||
	hostDevelopmentLaunch?.serverReadyAction?.action !== 'openExternally'
) {
	failures.push(
		'VS Code must start dev:host and open the published localhost URL in the host browser.'
	);
}

if (failures.length > 0) {
	console.error('Devcontainer host-port contract validation failed:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log(
	'Devcontainer host-development contract verified: Astro, Playwright reports and VS Code launch actions use host-loopback publications.'
);
