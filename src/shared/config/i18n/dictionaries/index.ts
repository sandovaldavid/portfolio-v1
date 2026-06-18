import { Language } from '../languages';
import enRaw from '../locales/en.json';
import esRaw from '../locales/es.json';

function flattenJSON(
	obj: Record<string, unknown>,
	prefix = ''
): Record<string, string | string[]> {
	return Object.entries(obj).reduce((acc, [key, val]) => {
		const fullKey = prefix ? `${prefix}.${key}` : key;
		if (Array.isArray(val)) {
			acc[fullKey] = val as string[];
		} else if (typeof val === 'object' && val !== null) {
			Object.assign(acc, flattenJSON(val as Record<string, unknown>, fullKey));
		} else {
			acc[fullKey] = val as string;
		}
		return acc;
	}, {} as Record<string, string | string[]>);
}

export const translations = {
	[Language.ENGLISH]: flattenJSON(enRaw),
	[Language.SPANISH]: flattenJSON(esRaw),
} as const;

export type TranslationKey = keyof (typeof translations)[Language.ENGLISH];

export type TranslationDictionary = (typeof translations)[Language.ENGLISH];
