import type { Language, LocalizedPathMap } from '@shared/config/i18n';

export type { Language, LocalizedPathMap };

/** Language picker behavior and optional verified routes for localized content. */
export interface LanguagePickerProps {
	currentLang?: Language;
	localizedPaths?: LocalizedPathMap;
}
