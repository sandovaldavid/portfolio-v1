interface GitHubStats {
	login: string;
	name: string;
	followers: number;
	following: number;
	public_repos: number;
	totalStars: number;
	totalForks: number;
	topLangs: string[];
	bio: string | null;
}

interface CliWindow extends Window {
	__portfolioCliAbort?: AbortController;
	__openShortcutsModal?: () => void;
	__openCLI?: (prefill?: string) => void;
	__portfolioGitHub?: { fetch: () => Promise<GitHubStats | null> };
}

type LineType = 'output' | 'command' | 'error' | 'info' | 'muted' | 'warning';
type RuntimeCopy = Record<string, string>;

const COMMANDS = [
	'help',
	'whoami',
	'about',
	'research',
	'ls',
	'goto ',
	'github',
	'contact',
	'skills',
	'matrix',
	'open resume',
	'clear',
	'vim',
	'nvim',
	'sudo',
	'exit',
	':q',
] as const;

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function formatCopy(template: string, variables: Record<string, string> = {}): string {
	let value = template;
	for (const [name, replacement] of Object.entries(variables)) {
		value = value.replaceAll(`{${name}}`, replacement);
	}
	return value;
}

export function setupCliTerminal(): void {
	const root = document.getElementById('cli-terminal-root');
	const dataElement = document.getElementById('cli-runtime-data');
	if (!(root instanceof HTMLElement) || !(dataElement instanceof HTMLElement)) return;

	const cliWindow = window as CliWindow;
	cliWindow.__portfolioCliAbort?.abort();
	const controller = new AbortController();
	cliWindow.__portfolioCliAbort = controller;
	const listenerOptions = { signal: controller.signal };

	const copy = JSON.parse(dataElement.dataset.copy ?? '{}') as RuntimeCopy;
	const sectionNames = JSON.parse(dataElement.dataset.sectionNames ?? '[]') as string[];
	const resumeUrl = dataElement.dataset.resumeUrl ?? '';
	const githubUser = dataElement.dataset.githubUser ?? '';
	const contactEmail = dataElement.dataset.email ?? '';
	const contactLinkedin = dataElement.dataset.linkedin ?? '';
	const siteUrl = dataElement.dataset.siteUrl ?? '';

	const getCopy = (key: string): string => {
		const value = copy[key];
		if (!value) throw new Error(`Missing CLI translation: ${key}`);
		return value;
	};
	const localized = (key: string, variables: Record<string, string> = {}): string =>
		escapeHtml(formatCopy(getCopy(key), variables));

	const cliOverlayElement = document.getElementById('cli-overlay');
	const cliOutputElement = document.getElementById('cli-output');
	const cliInputElement = document.getElementById('cli-input');
	const cliCloseElement = document.getElementById('cli-close-dot');
	const shortcutsModalElement = document.getElementById('shortcuts-modal');
	const shortcutsCloseElement = document.getElementById('shortcuts-close');
	const easterEggOverlayElement = document.getElementById('easter-egg-overlay');
	const eggLoadingElement = document.getElementById('egg-loading');
	const eggStatsElement = document.getElementById('egg-stats');
	const eggCloseElement = document.getElementById('egg-close');

	if (
		!(cliOverlayElement instanceof HTMLElement) ||
		!(cliOutputElement instanceof HTMLElement) ||
		!(cliInputElement instanceof HTMLInputElement) ||
		!(cliCloseElement instanceof HTMLElement) ||
		!(shortcutsModalElement instanceof HTMLElement) ||
		!(shortcutsCloseElement instanceof HTMLElement) ||
		!(easterEggOverlayElement instanceof HTMLElement) ||
		!(eggLoadingElement instanceof HTMLElement) ||
		!(eggStatsElement instanceof HTMLElement) ||
		!(eggCloseElement instanceof HTMLElement)
	) {
		return;
	}

	const cliOverlay = cliOverlayElement;
	const cliOutput = cliOutputElement;
	const cliInput = cliInputElement;
	const cliClose = cliCloseElement;
	const shortcutsModal = shortcutsModalElement;
	const shortcutsClose = shortcutsCloseElement;
	const easterEggOverlay = easterEggOverlayElement;
	const eggLoading = eggLoadingElement;
	const eggStats = eggStatsElement;
	const eggClose = eggCloseElement;

	const history: string[] = [];
	let historyIndex = -1;
	let cliBooted = false;
	let githubCache: GitHubStats | null = null;
	let keyBuffer = '';
	let keyTimer: number | null = null;

	const colorClasses: Record<LineType, string> = {
		output: 'text-[#00ff88]',
		command: 'text-white',
		error: 'text-red-400',
		info: 'text-[#00b0ff]',
		muted: 'text-white/40',
		warning: 'text-yellow-400',
	};

	function printLine(html: string, type: LineType = 'output'): void {
		const line = document.createElement('div');
		line.className = `${colorClasses[type]} text-sm leading-relaxed`;
		line.innerHTML = html;
		cliOutput.appendChild(line);
		cliOutput.scrollTop = cliOutput.scrollHeight;
	}

	function printBlank(): void {
		const spacer = document.createElement('div');
		spacer.className = 'h-1.5';
		cliOutput.appendChild(spacer);
	}

	function printBoxTitle(key: string): void {
		printLine(`┌─ ${localized(key)} ─────────────────────────────┐`, 'info');
	}

	function printBoxEnd(): void {
		printLine('└─────────────────────────────────────────────────┘', 'info');
	}

	function printCommand(command: string, descriptionKey: string): void {
		printLine(
			`│  <span class="text-yellow-400">${escapeHtml(command)}</span> — ${localized(descriptionKey)}`,
			'output'
		);
	}

	function openCli(prefill = ''): void {
		cliOverlay.classList.remove('hidden');
		cliOverlay.classList.add('flex');
		if (!cliBooted) bootCli();
		cliInput.value = prefill;
		requestAnimationFrame(() => cliInput.focus());
	}

	function closeCli(): void {
		cliOverlay.classList.add('hidden');
		cliOverlay.classList.remove('flex');
	}

	function bootCli(): void {
		cliBooted = true;
		const lines: Array<[string, LineType]> = [
			['╔══════════════════════════════════════════╗', 'info'],
			['║  PORTFOLIO OS v2.0 — sandovaldavid.com  ║', 'info'],
			[`║  ${localized('runtime.bootRole')}  ║`, 'info'],
			['╚══════════════════════════════════════════╝', 'info'],
		];
		lines.forEach(([text, type], index) => {
			window.setTimeout(() => printLine(text, type), index * 40);
		});
		window.setTimeout(
			() => {
				printBlank();
				const command = '<span class="text-yellow-400 font-bold">help</span>';
				const message = localized('runtime.ready', { command: '__COMMAND__' }).replace(
					'__COMMAND__',
					command
				);
				printLine(message, 'muted');
				printBlank();
			},
			lines.length * 40 + 30
		);
	}

	const sections = [
		{ number: 1, id: null as string | null, name: sectionNames[0] ?? 'Hero' },
		{ number: 2, id: 'experience', name: sectionNames[1] ?? 'Experience' },
		{ number: 3, id: 'research', name: sectionNames[2] ?? 'Research' },
		{ number: 4, id: 'projects', name: sectionNames[3] ?? 'Projects' },
		{ number: 5, id: 'about-me', name: sectionNames[4] ?? 'About' },
		{ number: 6, id: 'technologies', name: sectionNames[5] ?? 'Technologies' },
	];

	function showNavigationPopup(text: string): void {
		const popup = document.createElement('div');
		popup.className =
			'fixed top-[10%] left-1/2 -translate-x-1/2 bg-primary-500 text-white dark:text-black px-5 py-2 border-2 border-black dark:border-white font-mono font-bold text-xs uppercase tracking-widest z-[150] opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap';
		popup.textContent = text;
		document.body.appendChild(popup);
		requestAnimationFrame(() => {
			popup.style.opacity = '1';
		});
		window.setTimeout(() => {
			popup.style.opacity = '0';
			window.setTimeout(() => popup.remove(), 250);
		}, 1100);
	}

	function navigateToSection(number: number): void {
		const section = sections.find(item => item.number === number);
		if (!section) return;
		if (section.id) document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
		else window.scrollTo({ top: 0, behavior: 'smooth' });
		showNavigationPopup(section.name);
	}

	async function fetchGitHubStats(): Promise<GitHubStats | null> {
		if (githubCache) return githubCache;
		try {
			const cached = sessionStorage.getItem('pf_gh_stats');
			if (cached) {
				githubCache = JSON.parse(cached) as GitHubStats;
				return githubCache;
			}
		} catch {
			// Storage may be unavailable in privacy-restricted contexts.
		}

		try {
			const [userResponse, repositoriesResponse] = await Promise.all([
				fetch(`https://api.github.com/users/${githubUser}`),
				fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`),
			]);
			if (!userResponse.ok) throw new Error('GitHub API unavailable');
			const user = (await userResponse.json()) as {
				login: string;
				name: string | null;
				followers: number;
				following: number;
				public_repos: number;
				bio: string | null;
			};
			const repositories = repositoriesResponse.ok
				? ((await repositoriesResponse.json()) as Array<{
						stargazers_count?: number;
						forks_count?: number;
						language?: string;
					}>)
				: [];
			const languageCounts: Record<string, number> = {};
			for (const repository of repositories) {
				if (repository.language) {
					languageCounts[repository.language] =
						(languageCounts[repository.language] ?? 0) + 1;
				}
			}
			githubCache = {
				login: user.login,
				name: user.name ?? 'David Sandoval',
				followers: user.followers,
				following: user.following,
				public_repos: user.public_repos,
				totalStars: repositories.reduce(
					(total, repository) => total + (repository.stargazers_count ?? 0),
					0
				),
				totalForks: repositories.reduce(
					(total, repository) => total + (repository.forks_count ?? 0),
					0
				),
				topLangs: Object.entries(languageCounts)
					.sort((left, right) => right[1] - left[1])
					.slice(0, 3)
					.map(([language]) => language),
				bio: user.bio,
			};
			try {
				sessionStorage.setItem('pf_gh_stats', JSON.stringify(githubCache));
			} catch {
				// Cache is optional.
			}
			return githubCache;
		} catch {
			return null;
		}
	}

	cliWindow.__portfolioGitHub = { fetch: fetchGitHubStats };

	function printHelp(): void {
		printBlank();
		printBoxTitle('runtime.helpTitle');
		printCommand('about', 'runtime.helpAbout');
		printCommand('research', 'runtime.helpResearch');
		printCommand('whoami', 'runtime.helpWhoami');
		printCommand('ls', 'runtime.helpList');
		printCommand('goto <section>', 'runtime.helpGoto');
		printCommand('github', 'runtime.helpGithub');
		printCommand('contact', 'runtime.helpContact');
		printCommand('skills', 'runtime.helpSkills');
		printCommand('matrix', 'runtime.helpMatrix');
		printCommand('open resume', 'runtime.helpResume');
		printCommand('clear', 'runtime.helpClear');
		printCommand(':q / exit', 'runtime.helpExit');
		printBoxEnd();
	}

	function printProfile(): void {
		printBlank();
		printBoxTitle('runtime.profileTitle');
		printLine(`│  ${localized('runtime.profileName')}: David Sandoval`, 'output');
		printLine(
			`│  ${localized('runtime.profileRole')}: ${localized('runtime.profileRoleValue')}`,
			'output'
		);
		printLine(
			`│  ${localized('runtime.profileLocation')}: ${localized('runtime.profileLocationValue')}`,
			'output'
		);
		printLine(`│  ${localized('runtime.profileCompany')}: Atena`, 'output');
		printLine(
			`│  ${localized('runtime.profileStatus')}: <span class="text-[#00ff88]">${localized('runtime.profileStatusValue')}</span>`,
			'output'
		);
		printBoxEnd();
	}

	function printDirectory(path: string, descriptionKey: string): void {
		printLine(
			`drwxr-xr-x  <span class="text-[#00b0ff]">${escapeHtml(path)}/</span>  ${localized(descriptionKey)}`,
			'output'
		);
	}

	function printSectionList(): void {
		printBlank();
		printDirectory('hero', 'runtime.listHero');
		printDirectory('experience', 'runtime.listExperience');
		printDirectory('research', 'runtime.listResearch');
		printDirectory('projects', 'runtime.listProjects');
		printDirectory('about-me', 'runtime.listAbout');
		printDirectory('technologies', 'runtime.listTechnologies');
		printBlank();
		printLine(localized('runtime.listTip', { name: 'name' }), 'muted');
	}

	async function printGitHubStats(): Promise<void> {
		printLine(localized('runtime.githubFetching'), 'muted');
		const stats = await fetchGitHubStats();
		if (!stats) {
			printLine(localized('runtime.githubError'), 'error');
			printLine(
				`${localized('runtime.githubDirect')}: <span class="text-[#00b0ff]">github.com/${escapeHtml(githubUser)}</span>`,
				'muted'
			);
			return;
		}
		printBlank();
		printBoxTitle('runtime.githubTitle');
		printLine(`│  ${localized('runtime.githubRepos')}: ${stats.public_repos}`, 'output');
		printLine(`│  ${localized('runtime.githubStars')}: ${stats.totalStars}`, 'output');
		printLine(`│  ${localized('runtime.githubForks')}: ${stats.totalForks}`, 'output');
		printLine(`│  ${localized('runtime.githubFollowers')}: ${stats.followers}`, 'output');
		if (stats.topLangs.length > 0) {
			printLine(
				`│  ${localized('runtime.githubLanguages')}: ${escapeHtml(stats.topLangs.join(', '))}`,
				'output'
			);
		}
		if (stats.bio) printLine(`│  Bio: ${escapeHtml(stats.bio)}`, 'muted');
		printBoxEnd();
	}

	function printContact(): void {
		printBlank();
		printBoxTitle('runtime.contactTitle');
		printLine(`│  ${escapeHtml(contactEmail)}`, 'output');
		printLine(`│  linkedin.com/in/${escapeHtml(contactLinkedin)}`, 'output');
		printLine(`│  github.com/${escapeHtml(githubUser)}`, 'output');
		printLine(`│  ${escapeHtml(siteUrl)}`, 'output');
		printBoxEnd();
	}

	function printSkills(): void {
		printBlank();
		printBoxTitle('runtime.skillsTitle');
		printLine(
			`│  ${localized('runtime.skillsFrontend')}: Angular · React · Astro · TypeScript`,
			'output'
		);
		printLine(
			`│  ${localized('runtime.skillsBackend')}: Django · FastAPI · .NET · Node.js`,
			'output'
		);
		printLine(
			`│  ${localized('runtime.skillsMl')}: BiLSTM · TensorFlow · Scikit-learn`,
			'output'
		);
		printLine(
			`│  ${localized('runtime.skillsDevops')}: Docker · Kubernetes · GitHub Actions`,
			'output'
		);
		printLine(
			`│  ${localized('runtime.skillsDatabase')}: PostgreSQL · MongoDB · Redis`,
			'output'
		);
		printBoxEnd();
	}

	function printResearch(): void {
		printBlank();
		printBoxTitle('runtime.researchTitle');
		printLine(`│  ${localized('runtime.researchThesis')}`, 'output');
		printLine(`│  ${localized('runtime.researchModel')}`, 'output');
		printLine(`│  ${localized('runtime.researchData')}`, 'output');
		printLine(`│  ${localized('runtime.researchEvaluation')}`, 'output');
		printLine(
			`│  <span class="text-[#00ff88]">${localized('runtime.researchStatus')}</span>`,
			'output'
		);
		printLine(`│  ${localized('runtime.researchDetails')}`, 'muted');
		printBoxEnd();
	}

	function printAbout(): void {
		printBlank();
		printBoxTitle('runtime.aboutTitle');
		printLine(`│  ${localized('runtime.aboutRole')}`, 'output');
		printLine(`│  ${localized('runtime.aboutCurrent')}`, 'output');
		printLine(`│  ${localized('runtime.aboutThesis')}`, 'output');
		printLine(`│  ${localized('runtime.aboutUsing')}`, 'output');
		printLine(
			`│  <span class="text-[#00ff88]">${localized('runtime.aboutAvailable')}</span>`,
			'output'
		);
		printBoxEnd();
	}

	async function handleCommand(raw: string): Promise<void> {
		const input = raw.trim();
		if (!input) return;
		history.unshift(input);
		historyIndex = -1;
		printLine(
			`<span class="text-[#00b0ff]">$</span> <span class="text-white">${escapeHtml(input)}</span>`,
			'command'
		);
		const [rawCommand = '', ...args] = input.split(/\s+/);
		const command = rawCommand.toLowerCase();

		switch (command) {
			case 'help':
				printHelp();
				break;
			case 'whoami':
				printProfile();
				break;
			case 'ls':
				printSectionList();
				break;
			case 'goto': {
				const target = args[0]?.toLowerCase() ?? '';
				const sectionMap: Record<string, string | null> = {
					hero: null,
					top: null,
					inicio: null,
					experience: 'experience',
					exp: 'experience',
					experiencia: 'experience',
					research: 'research',
					investigacion: 'research',
					thesis: 'research',
					projects: 'projects',
					proyectos: 'projects',
					about: 'about-me',
					'about-me': 'about-me',
					sobre: 'about-me',
					tech: 'technologies',
					technologies: 'technologies',
					stack: 'technologies',
					tecnologias: 'technologies',
				};
				if (!target) {
					printLine(localized('runtime.gotoUsage', { section: 'section' }), 'warning');
				} else if (target in sectionMap) {
					printLine(localized('runtime.gotoNavigating', { section: target }), 'output');
					window.setTimeout(() => {
						const id = sectionMap[target];
						if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
						else window.scrollTo({ top: 0, behavior: 'smooth' });
						closeCli();
					}, 500);
				} else {
					printLine(localized('runtime.gotoUnknown', { section: target }), 'error');
					printLine(localized('runtime.gotoAvailable'), 'muted');
				}
				break;
			}
			case 'github':
				await printGitHubStats();
				break;
			case 'contact':
				printContact();
				break;
			case 'skills':
				printSkills();
				break;
			case 'matrix':
				document.getElementById('hud-cheat-matrix')?.click();
				printLine(localized('runtime.matrixToggled'), 'output');
				break;
			case 'open':
			case 'cat': {
				const target = args[0]?.toLowerCase() ?? '';
				if (target === 'resume' || target === 'cv') {
					printLine(localized('runtime.resumeOpening'), 'muted');
					window.setTimeout(
						() => window.open(resumeUrl, '_blank', 'noopener,noreferrer'),
						400
					);
				} else {
					printLine(localized('runtime.unknownTarget', { target }), 'error');
					printLine(localized('runtime.tryResume'), 'muted');
				}
				break;
			}
			case 'clear':
				cliOutput.innerHTML = '';
				cliBooted = false;
				bootCli();
				return;
			case 'exit':
			case 'q':
			case ':q':
			case ':q!':
			case ':wq':
				printLine(localized('runtime.goodbye'), 'muted');
				window.setTimeout(closeCli, 400);
				break;
			case 'research':
				printResearch();
				break;
			case 'about':
				printAbout();
				break;
			case 'sudo':
				printLine(localized('runtime.sudoDenied'), 'error');
				printLine(localized('runtime.sudoHint'), 'muted');
				break;
			case 'vim':
			case 'nvim':
				printLine(localized('runtime.vimTaste'), 'output');
				window.setTimeout(() => printLine(localized('runtime.vimMotions'), 'muted'), 500);
				break;
			default:
				printLine(localized('runtime.commandNotFound', { command }), 'error');
				printLine(localized('runtime.typeHelp'), 'muted');
		}
		printBlank();
	}

	function openShortcuts(): void {
		shortcutsModal.classList.remove('hidden');
		shortcutsModal.classList.add('flex');
		shortcutsClose.focus();
	}

	function closeShortcuts(): void {
		shortcutsModal.classList.add('hidden');
		shortcutsModal.classList.remove('flex');
	}

	function triggerEasterEgg(): void {
		easterEggOverlay.classList.remove('hidden');
		easterEggOverlay.classList.add('flex');
		eggStats.classList.add('hidden');
		eggLoading.innerHTML = '';
		document.documentElement.classList.add('pf-glitch');
		window.setTimeout(() => document.documentElement.classList.remove('pf-glitch'), 450);
		const loadLines = Array.from({ length: 9 }, (_, index) =>
			getCopy(`easter.load${index + 1}`)
		);
		loadLines.forEach((text, index) => {
			window.setTimeout(() => {
				const line = document.createElement('div');
				line.className = 'text-[#00b0ff] text-xs font-mono leading-relaxed';
				line.textContent = text;
				eggLoading.appendChild(line);
				eggLoading.scrollTop = eggLoading.scrollHeight;
			}, index * 370);
		});
		window.setTimeout(() => eggStats.classList.remove('hidden'), loadLines.length * 370 + 300);
	}

	cliInput.addEventListener(
		'keydown',
		event => {
			if (event.key === 'Enter') {
				const value = cliInput.value;
				cliInput.value = '';
				void handleCommand(value);
			} else if (event.key === 'Escape') {
				closeCli();
			} else if (event.key === 'ArrowUp') {
				event.preventDefault();
				if (historyIndex < history.length - 1) {
					historyIndex += 1;
					cliInput.value = history[historyIndex] ?? '';
				}
			} else if (event.key === 'ArrowDown') {
				event.preventDefault();
				if (historyIndex > 0) {
					historyIndex -= 1;
					cliInput.value = history[historyIndex] ?? '';
				} else {
					historyIndex = -1;
					cliInput.value = '';
				}
			} else if (event.key === 'Tab') {
				event.preventDefault();
				const match = COMMANDS.find(
					candidate =>
						candidate.startsWith(cliInput.value) && candidate !== cliInput.value
				);
				if (match) cliInput.value = match;
			}
		},
		listenerOptions
	);

	cliClose.addEventListener('click', closeCli, listenerOptions);
	cliOverlay.addEventListener(
		'click',
		event => {
			if (event.target === cliOverlay) closeCli();
		},
		listenerOptions
	);
	shortcutsClose.addEventListener('click', closeShortcuts, listenerOptions);
	shortcutsModal.addEventListener(
		'click',
		event => {
			if (event.target === shortcutsModal) closeShortcuts();
		},
		listenerOptions
	);
	eggClose.addEventListener(
		'click',
		() => {
			easterEggOverlay.classList.add('hidden');
			easterEggOverlay.classList.remove('flex');
		},
		listenerOptions
	);

	cliWindow.__openShortcutsModal = openShortcuts;
	cliWindow.__openCLI = openCli;

	document.addEventListener(
		'keydown',
		event => {
			const activeElement = document.activeElement as HTMLElement | null;
			if (
				activeElement &&
				(activeElement.tagName === 'INPUT' ||
					activeElement.tagName === 'TEXTAREA' ||
					activeElement.isContentEditable)
			) {
				return;
			}
			if (event.ctrlKey || event.metaKey || event.altKey) return;

			const overlaysOpen =
				!cliOverlay.classList.contains('hidden') ||
				!shortcutsModal.classList.contains('hidden') ||
				!easterEggOverlay.classList.contains('hidden');
			if (overlaysOpen) {
				if (event.key === 'Escape') {
					closeCli();
					closeShortcuts();
					easterEggOverlay.classList.add('hidden');
					easterEggOverlay.classList.remove('flex');
				}
				return;
			}

			if (event.key === ':') {
				event.preventDefault();
				openCli();
				return;
			}
			if (event.key === '/') {
				event.preventDefault();
				openCli('goto ');
				return;
			}
			if (event.key === '?') {
				event.preventDefault();
				openShortcuts();
				return;
			}
			if (event.key === 'j') {
				window.scrollBy({ top: 280, behavior: 'smooth' });
				return;
			}
			if (event.key === 'k') {
				window.scrollBy({ top: -280, behavior: 'smooth' });
				return;
			}
			if (event.key === 'G') {
				event.preventDefault();
				window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
				keyBuffer = '';
				if (keyTimer) window.clearTimeout(keyTimer);
				return;
			}

			keyBuffer += event.key;
			if (keyTimer) window.clearTimeout(keyTimer);
			if (keyBuffer.endsWith('gg')) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
				keyBuffer = '';
				return;
			}
			if (keyBuffer.includes('12')) {
				event.preventDefault();
				triggerEasterEgg();
				keyBuffer = '';
				return;
			}
			keyTimer = window.setTimeout(() => {
				const lastNumber = keyBuffer.replace(/\D/g, '').slice(-1);
				const number = Number.parseInt(lastNumber, 10);
				if (!Number.isNaN(number) && number >= 1 && number <= 6) navigateToSection(number);
				keyBuffer = '';
			}, 360);
		},
		listenerOptions
	);
}
