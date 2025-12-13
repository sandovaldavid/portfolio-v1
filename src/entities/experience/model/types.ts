/**
 * Experience item representing work or education history
 */
export interface ExperienceItem {
	/** Date or date range (e.g., "2023 - Present") */
	date: string;
	/** Position or role title */
	title: string;
	/** Company or organization name */
	company: string;
	/** Detailed description of responsibilities and achievements - array of bullet points */
	description: string[];
	/** Technologies, languages, and tools used */
	technologies: string[];
	/** Optional link to company website or project */
	link?: string;
}

/**
 * List of experience entries
 */
export type ExperienceList = ExperienceItem[];
