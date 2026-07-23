import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const devcontainer = JSON.parse(readFileSync('.devcontainer/devcontainer.json', 'utf8'));
const expectedPublications = new Map([
	['4321', '127.0.0.1:4321:4321'],
	['9323', '127.0.0.1:9323:9323'],
]);
const appPorts = Array.isArray(devcontainer.appPort) ? devcontainer.appPort : [];
const forwardedPorts = Array.isArray(devcontainer.forwardPorts) ? devcontainer.forwardPorts : [];
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

if (
	packageJson.scripts?.['test:e2e:report'] !==
	'playwright show-report playwright-report --host 0.0.0.0 --port 9323'
) {
	failures.push('test:e2e:report must serve the local Playwright report on container port 9323.');
}

if (failures.length > 0) {
	console.error('Devcontainer host-port contract validation failed:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log(
	'Devcontainer host-port contract verified: Astro and Playwright reports are published on host loopback only.'
);
