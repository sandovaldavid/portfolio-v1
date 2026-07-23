import { getCollection } from 'astro:content';
import type { Language } from '@shared/config/i18n';
import {
	PROJECT_METADATA,
	PROJECT_TECHNOLOGIES,
	isProjectId,
	type ProjectId,
} from './metadata';
import type {
	CaseStudyEvidence,
	ProjectContentEntry,
	ProjectItem,
	ProjectList,
} from './types';

interface LocalizedProjectItem extends ProjectItem {
	locale: 'en' | 'es';
}

function toEvidence(
	entry: ProjectContentEntry,
	projectId: ProjectId
): CaseStudyEvidence | undefined {
	const evidence = entry.data.caseStudy.evidence;
	if (!evidence) return undefined;

	const sourceUrls = PROJECT_METADATA[projectId].evidenceSourceUrls ?? {};
	const seenSources = new Set<string>();
	const sources = evidence.sources.map(source => {
		if (seenSources.has(source.sourceId)) {
			throw new Error(
				`Duplicate evidence source "${source.sourceId}" for project "${projectId}" and locale "${entry.data.locale}".`
			);
		}
		seenSources.add(source.sourceId);

		const href = sourceUrls[source.sourceId];
		if (!href) {
			throw new Error(
				`Missing language-neutral URL for evidence source "${source.sourceId}" in project "${projectId}".`
			);
		}

		return { ...source, href };
	});

	return {
		...evidence,
		implemented: [...evidence.implemented],
		planned: [...evidence.planned],
		architecture: { ...evidence.architecture },
		security: [...evidence.security],
		testing: [...evidence.testing],
		deployment: [...evidence.deployment],
		limitations: [...evidence.limitations],
		sources,
	};
}

function toProjectItem(entry: ProjectContentEntry): LocalizedProjectItem {
	const { projectId, locale, title, description, category, imageAlt, caseStudy } = entry.data;

	if (!isProjectId(projectId)) {
		throw new Error(`Missing language-neutral metadata for project "${projectId}".`);
	}

	const metadata = PROJECT_METADATA[projectId];
	const link = metadata.link ? { link: metadata.link } : {};
	const github = metadata.github ? { github: metadata.github } : {};
	const evidence = toEvidence(entry, projectId);

	return {
		projectId,
		slug: metadata.slug,
		title,
		description,
		category,
		imageAlt,
		image: metadata.image,
		tags: metadata.technologyIds.map(id => PROJECT_TECHNOLOGIES[id]),
		featured: metadata.featured,
		caseStudy: {
			problem: caseStudy.problem,
			approach: caseStudy.approach,
			tradeoffs: caseStudy.tradeoffs,
			outcome: caseStudy.outcome,
			learnings: [...caseStudy.learnings],
			timeline: caseStudy.timeline,
			role: caseStudy.role,
			...(evidence ? { evidence } : {}),
		},
		locale,
		...link,
		...github,
	};
}

export async function getProjectsData(lang: Language): Promise<ProjectList> {
	const entries = await getCollection('projects', ({ data }) => data.locale === lang);
	const seen = new Set<string>();

	const projects = entries.map(entry => {
		if (seen.has(entry.data.projectId)) {
			throw new Error(`Duplicate project ID "${entry.data.projectId}" for locale "${lang}".`);
		}
		seen.add(entry.data.projectId);

		const item = toProjectItem(entry);
		if (item.locale !== lang) {
			throw new Error(
				`Project locale mismatch: requested "${lang}", received "${item.locale}".`
			);
		}

		const { locale: _locale, ...localizedItem } = item;
		return localizedItem;
	});

	const expectedIds = Object.keys(PROJECT_METADATA) as ProjectId[];
	const missingIds = expectedIds.filter(projectId => !seen.has(projectId));
	if (missingIds.length > 0) {
		throw new Error(`Missing project content for locale "${lang}": ${missingIds.join(', ')}.`);
	}

	return projects.sort(
		(left, right) => PROJECT_METADATA[right.projectId].order - PROJECT_METADATA[left.projectId].order
	);
}

export async function getProjectBySlug(
	lang: Language,
	slug: string
): Promise<ProjectItem | undefined> {
	const projects = await getProjectsData(lang);
	return projects.find(project => project.slug === slug);
}
