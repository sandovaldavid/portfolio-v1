import type { ImageMetadata } from 'astro';
import type { Technology } from '@shared/config/technology';

/**
 * Case study data for detailed project showcase pages
 */
export interface CaseStudy {
	/** The core problem/challenge (the "boss" faced) */
	problem: string;
	/** The strategic approach taken to solve it */
	approach: string;
	/** Key trade-offs or constraints accepted */
	tradeoffs: string;
	/** Final outcome and measurable results */
	outcome: string;
	/** Key learnings ("XP gained") */
	learnings: string[];
	/** Project timeline (optional) */
	timeline?: string;
	/** My role in the project (optional) */
	role?: string;
}

/**
 * Project represents a portfolio project with details and metadata
 */
export interface ProjectItem {
	/** URL slug for project detail page */
	slug: string;
	/** Project title */
	title: string;
	/** Detailed project description */
	description: string;
	/** Live demo URL (optional) */
	link?: string;
	/** GitHub repository URL (optional) */
	github?: string;
	/** Project preview image — imported asset for Astro optimization */
	image: ImageMetadata;
	/** Technologies used in the project */
	tags: Technology[];
	/** Optional: emphasizes project in UI */
	featured?: boolean;
	/** Optional: category label (i18n key or plain) */
	category?: string;
	/** Optional: detailed case study for dedicated project page */
	caseStudy?: CaseStudy;
}
