export const INTENTIONAL_SINGLE_LOCALE_EDITORIAL = Object.freeze({
	blog: Object.freeze({
		'draft-rss-test':
			'English-only draft fixture used to prove production RSS exclusion; it is never published.',
	}),
	devlog: Object.freeze({}),
});

export const HARD_CODED_TEXT_ALLOWLIST = Object.freeze([
	Object.freeze({
		file: 'src/features/cli-terminal/ui/CLITerminalCatalog.astro',
		value: 'portfolio@sandovaldavid:~',
		reason: 'Decorative shell prompt composed only from the public handle and source-code syntax.',
	}),
	Object.freeze({
		file: 'src/widgets/hero/ui/Hero.astro',
		value: 'David Sandoval',
		reason: 'Proper name displayed as the portfolio owner identity; proper names are language-neutral.',
	}),
]);

export const HARD_CODED_COPY_DEBT_BASELINE = Object.freeze([
	Object.freeze({
		file: 'src/pages/atena.astro',
		count: 19,
		digest: '730fc2904050d02f4c4cfea5b96c5ef038e0b44ebc75cdab6a0f3c97213bc357',
		reason: 'Existing English Atena route copy predates granular ownership and is removed by #143.',
	}),
	Object.freeze({
		file: 'src/pages/es/atena.astro',
		count: 19,
		digest: '848122fbf62a099d6ec15ca4bb2c04c2f2d7a2c9d8eca90ec052bd5d55ecc7b9',
		reason: 'Existing Spanish Atena route copy predates granular ownership and is removed by #143.',
	}),
	Object.freeze({
		file: 'src/pages/components.astro',
		count: 8,
		digest: '3ee8e4e1eb2b06f21ac55ab59f9c81200e50afa0769e5c78291ae3d8e58edc96',
		reason: 'Existing English component-showcase copy is migration debt tracked for #143.',
	}),
	Object.freeze({
		file: 'src/pages/es/components.astro',
		count: 46,
		digest: '0890446a6f51a63e5ebbb9e44884c791676b189b85e41aa52d216a027447c6da',
		reason: 'Existing Spanish component-showcase copy is migration debt tracked for #143.',
	}),
	Object.freeze({
		file: 'src/pages/skills.astro',
		count: 7,
		digest: 'ac20da59a34c60eaddbd64676aa6a28285ddaea3c48525a84e32c54adf5fd7b3',
		reason: 'Existing English skills-route copy is migration debt tracked for #143.',
	}),
	Object.freeze({
		file: 'src/pages/es/skills.astro',
		count: 7,
		digest: '3136e12a5693d451380c9f550974e48bec5b5fd5796303a39d1d01fe73508d71',
		reason: 'Existing Spanish skills-route copy is migration debt tracked for #143.',
	}),
]);

export const SPANISH_FORBIDDEN_PHRASES = Object.freeze([
	'Skip to main content',
	'Main navigation',
	'Mobile navigation',
	'Open navigation menu',
	'Close navigation menu',
	'Choose language',
	'Opens in a new tab',
	'Current page',
	'Translation unavailable',
	'Social and contact links',
	'Experience tabs',
	'Portfolio CLI terminal',
	'Terminal command input',
	'Close terminal',
	'Developer secret mode',
	'Something went wrong',
	'The requested content could not be loaded.',
	'Page not found',
	'Go to home',
	'Go back',
	'A required translation is missing.',
]);

export const REPRESENTATIVE_ROUTE_PAIRS = Object.freeze([
	Object.freeze({ english: '/', spanish: '/es/' }),
	Object.freeze({ english: '/about', spanish: '/es/about' }),
	Object.freeze({ english: '/research', spanish: '/es/research' }),
	Object.freeze({ english: '/projects', spanish: '/es/projects' }),
	Object.freeze({ english: '/projects/yukidoke', spanish: '/es/projects/yukidoke' }),
	Object.freeze({ english: '/blog', spanish: '/es/blog' }),
	Object.freeze({
		english: '/blog/building-this-portfolio-with-astro-and-fsd',
		spanish: '/es/blog/building-this-portfolio-with-astro-and-fsd',
	}),
	Object.freeze({ english: '/devlog', spanish: '/es/devlog' }),
	Object.freeze({
		english: '/devlog/phase-3-complete',
		spanish: '/es/devlog/phase-3-complete',
	}),
]);
