import { readFileSync } from 'node:fs';

const devcontainer = JSON.parse(readFileSync('.devcontainer/devcontainer.json', 'utf8'));
const expectedPublication = '127.0.0.1:4321:4321';
const appPorts = Array.isArray(devcontainer.appPort) ? devcontainer.appPort : [];
const forwardedPorts = Array.isArray(devcontainer.forwardPorts) ? devcontainer.forwardPorts : [];
const astroPortAttributes = devcontainer.portsAttributes?.['4321'];
const failures = [];

if (!appPorts.includes(expectedPublication)) {
	failures.push(`appPort must publish ${expectedPublication}.`);
}

if (forwardedPorts.length > 0) {
	failures.push('forwardPorts must remain empty when Docker publishes the Astro port.');
}

if (astroPortAttributes?.onAutoForward !== 'ignore') {
	failures.push('port 4321 must disable duplicate VS Code auto-forwarding.');
}

if (failures.length > 0) {
	console.error('Devcontainer host-port contract validation failed:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log('Devcontainer host-port contract verified: http://localhost:4321 is published on host loopback only.');
