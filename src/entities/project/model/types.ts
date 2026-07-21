import type { ImageMetadata } from 'astro';
import type { Technology } from '@shared/config/technology';

/**
 * Architecture evidence rendered by the project case-study widget.
 */
export interface CaseStudyArchitecture {
	/** Accessible caption explaining the diagram and its current scope */
	caption: string;
	/** Browser application and frontend responsibility */
	client: string;
	/** Identity provider and authentication boundary */
	identity: string;
	/** HTTP application and business-rule boundary */
	api: string;
	/** Implemented business modules owned by the API */
	modules: string;
	/** Durable data store and persistence responsibility */
	database: string;
	/** Supporting runtime processes */
	processes: string;
}

/**
 * Repository or demo source used to substantiate a case-study claim.
 */
export interface CaseStudySource {
	label: string;
	access: string;
	href?: string;
}

/**
 * Optional evidence package for flagship case studies.
 */
export interface CaseStudyEvidence {
	statusLabel: string;
	status: string;
	statusDetail: string;
	implementedLabel: string;
	implemented: string[];
	plannedLabel: string;
	planned: string[];
	architectureLabel: string;
	architecture: CaseStudyArchitecture;
	securityLabel: string;
	security: string[];
	testingLabel: string;
	testing: string[];
	deploymentLabel: string;
	deployment: string[];
	limitationsLabel: string;
	limitations: string[];
	sourcesLabel: string;
	sources: CaseStudySource[];
}

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
	/** Verifiable implementation, architecture and delivery evidence (optional) */
	evidence?: CaseStudyEvidence;
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
