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
	role: 'Software Engineer · BiLSTM/OSS Researcher',
	location: 'Piura, Peru',
	currentCompany: 'Atena',
	availability: true,

	// ─── Site / SEO ──────────────────────────────────────────────
	url: 'https://sandovaldavid.com',
	/** Used for canonical and og:url — appended with Astro.url.pathname */
	get canonicalBase() {
		return this.url;
	},
	defaultTitle: 'David Sandoval — Software Engineer & BiLSTM Researcher',
	defaultDescription:
		'Portfolio of David Sandoval, Software Engineer specialized in .NET 8, Angular 19 and OSS abandonment prediction using BiLSTM neural networks. Available for hire.',
	defaultImage: '/projects/portfolio.webp',
	twitterCard: 'summary_large_image' as const,

	// ─── Contact ─────────────────────────────────────────────────
	email: 'hello@sandovaldavid.com',
	emailSubjectRecruiter: 'Opportunity at our Company',

	// ─── Social Networks ─────────────────────────────────────────
	social: {
		github: 'https://github.com/sandovaldavid',
		githubUsername: 'sandovaldavid',
		linkedin: 'https://www.linkedin.com/in/jdavidsandoval',
		linkedinUsername: 'jdavidsandoval',
		linkHub: 'https://linkdevs.social',
	},

	// ─── Resume ──────────────────────────────────────────────────
	resumeUrl: '/David_Sandoval_Salvador-resume.pdf',
} as const;

/** Shorthand getters for the most-used values */
export const siteUrl = siteConfig.url;
export const siteEmail = siteConfig.email;
export const siteSocial = siteConfig.social;
export const siteName = siteConfig.name;
