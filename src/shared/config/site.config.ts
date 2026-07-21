/**
 * Site Configuration — Single Source of Truth
 * FSD Layer: Shared > Config
 *
 * Edit this file to update all SEO metadata, social links,
 * contact info, and personal details across the entire portfolio.
 */

export const siteConfig = {
	// ─── Personal ────────────────────────────────────────────────
	name: 'David Sandoval',
	fullName: 'Juan David Sandoval Salvador',
	handle: 'sandovaldavid',
	role: 'Software Engineer · Angular, .NET & TypeScript',
	location: 'Lima, Peru (UTC-5)',
	currentCompany: 'Atena',
	availability: true,

	// ─── Site / SEO ──────────────────────────────────────────────
	url: 'https://sandovaldavid.com',
	/** Used for canonical and og:url — appended with Astro.url.pathname */
	get canonicalBase() {
		return this.url;
	},
	defaultTitle: 'David Sandoval — Software Engineer',
	defaultDescription:
		'Portfolio of David Sandoval, a Software Engineer building reliable web products with Angular, .NET and TypeScript. Based in Lima and open to remote opportunities across Europe and Latin America.',
	defaultImage: '/projects/portfolio.webp',
	twitterCard: 'summary_large_image' as const,

	// ─── Contact ─────────────────────────────────────────────────
	email: 'hello@sandovaldavid.com',
	emailSubjectRecruiter: 'Software engineering opportunity',

	// ─── Social Networks ─────────────────────────────────────────
	social: {
		github: 'https://github.com/sandovaldavid',
		githubUsername: 'sandovaldavid',
		linkedin: 'https://www.linkedin.com/in/jdavidsandoval',
		linkedinUsername: 'jdavidsandoval',
		linkHub: 'https://linkdevs.social',
	},

	// ─── Resume ──────────────────────────────────────────────────
	resume: {
		en: 'https://sandovaldavid.com/resume/david-sandoval-resume.pdf',
		es: 'https://sandovaldavid.com/resume/david-sandoval-resume-es.pdf',
	},
} as const;

/** Shorthand getters for the most-used values */
export const siteUrl = siteConfig.url;
export const siteEmail = siteConfig.email;
export const siteSocial = siteConfig.social;
export const siteName = siteConfig.name;
