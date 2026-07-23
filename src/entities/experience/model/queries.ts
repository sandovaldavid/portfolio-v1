import { getCollection } from 'astro:content';
import type { Language } from '@shared/config/i18n';
import {
	EXPERIENCE_METADATA,
	EXPERIENCE_TECHNOLOGIES,
	isExperienceId,
} from './metadata';
import type { ExperienceItem, ExperienceList } from './types';

function toExperienceItem(entry: Awaited<ReturnType<typeof getCollection<'experience'>>>[number]) {
	const { experienceId, locale, company, title, dateLabel, achievements } = entry.data;

	if (!isExperienceId(experienceId)) {
		throw new Error(`Missing language-neutral metadata for experience "${experienceId}".`);
	}

	const metadata = EXPERIENCE_METADATA[experienceId];

	return {
		experienceId,
		date: dateLabel,
		title,
		company,
		description: [...achievements],
		technologies: metadata.technologyIds.map(id => EXPERIENCE_TECHNOLOGIES[id]),
		startDate: metadata.startDate,
		endDate: metadata.endDate,
		isCurrent: metadata.isCurrent,
		featured: metadata.featured,
		link: metadata.evidenceUrl,
		locale,
	};
}

export async function getExperienceData(lang: Language): Promise<ExperienceList> {
	const entries = await getCollection('experience', ({ data }) => data.locale === lang);
	const seen = new Set<string>();

	const experience = entries.map(entry => {
		if (seen.has(entry.data.experienceId)) {
			throw new Error(
				`Duplicate experience ID "${entry.data.experienceId}" for locale "${lang}".`
			);
		}
		seen.add(entry.data.experienceId);

		const item = toExperienceItem(entry);
		if (item.locale !== lang) {
			throw new Error(
				`Experience locale mismatch: requested "${lang}", received "${item.locale}".`
			);
		}

		const { locale: _locale, ...localizedItem } = item;
		return localizedItem satisfies ExperienceItem;
	});

	return experience.sort(
		(left, right) =>
			EXPERIENCE_METADATA[right.experienceId].order -
			EXPERIENCE_METADATA[left.experienceId].order
	);
}
