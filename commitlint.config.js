export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat',      // A new feature
				'fix',       // A bug fix
				'docs',      // Documentation only changes
				'style',     // Changes that don't affect code meaning (white-space, formatting, etc)
				'refactor',  // Code change that neither fixes a bug nor adds a feature
				'perf',      // Code change that improves performance
				'test',      // Adding missing tests or correcting existing tests
				'chore',     // Changes to build process, dependencies, tooling, or other non-code changes
				'ci',        // Changes to CI configuration files and scripts
				'revert',    // Reverts a previous commit
				'build',     // Changes in the build system or dependencies
				'deps',      // Dependency updates
				'security',  // Security fixes and improvements
				'hotfix',    // Urgent patches for production issues
			],
		],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'subject-case': [2, 'always', 'lower-case'],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'header-max-length': [2, 'always', 72],
	},
};
