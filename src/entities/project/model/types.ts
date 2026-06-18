import type { ImageMetadata } from 'astro';
import type { Technology } from '@entities/technology';

/**
 * Project represents a portfolio project with details and metadata
 */
export interface ProjectItem {
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
}
