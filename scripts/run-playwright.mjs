import { spawnSync } from 'node:child_process';

if (process.env.DEVCONTAINER === 'true') {
	const repairResult = spawnSync('bash', ['.devcontainer/repair-workspace-permissions.sh'], {
		stdio: 'inherit',
	});

	if (repairResult.error) {
		console.error(repairResult.error.message);
		process.exit(1);
	}

	if (repairResult.status !== 0) {
		process.exit(repairResult.status ?? 1);
	}
}

const playwrightResult = spawnSync(
	'bunx',
	['playwright', 'test', ...process.argv.slice(2)],
	{
		stdio: 'inherit',
		env: process.env,
	}
);

if (playwrightResult.error) {
	console.error(playwrightResult.error.message);
	process.exit(1);
}

process.exit(playwrightResult.status ?? 1);
