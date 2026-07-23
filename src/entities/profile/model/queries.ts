import { getEntry } from 'astro:content';
import { Language } from '@shared/config/i18n';
import type { PortfolioProfile } from './types';

const PROFILE_ENTRY_ID: Record<Language, string> = {
	[Language.ENGLISH]: 'en/profile',
	[Language.SPANISH]: 'es/profile',
};

export async function getPortfolioProfile(lang: Language): Promise<PortfolioProfile> {
	const profile = await getEntry('portfolioProfile', PROFILE_ENTRY_ID[lang]);

	if (!profile) {
		throw new Error(`Missing portfolio profile content for locale "${lang}".`);
	}

	if (profile.data.locale !== lang) {
		throw new Error(
			`Portfolio profile locale mismatch: requested "${lang}", received "${profile.data.locale}".`
		);
	}

	return profile;
}
