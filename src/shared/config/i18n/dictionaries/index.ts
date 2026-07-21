import { Language } from '../languages';
import enRaw from '../locales/en.json';
import esRaw from '../locales/es.json';
import yukidokeEnRaw from '../locales/projects/yukidoke.en.json';
import yukidokeEsRaw from '../locales/projects/yukidoke.es.json';

const enDictionary = {
	...enRaw,
	projects: {
		...enRaw.projects,
		yukidoke: yukidokeEnRaw,
	},
};

const esDictionary = {
	...esRaw,
	projects: {
		...esRaw.projects,
		yukidoke: yukidokeEsRaw,
	},
};

function flattenJSON(obj: Record<string, unknown>, prefix = ''): Record<string, string | string[]> {
	return Object.entries(obj).reduce(
		(acc, [key, val]) => {
			const fullKey = prefix ? `${prefix}.${key}` : key;
			if (Array.isArray(val)) {
				acc[fullKey] = val as string[];
			} else if (typeof val === 'object' && val !== null) {
				Object.assign(acc, flattenJSON(val as Record<string, unknown>, fullKey));
			} else {
				acc[fullKey] = val as string;
			}
			return acc;
		},
		{} as Record<string, string | string[]>
	);
}

export const translations = {
	[Language.ENGLISH]: flattenJSON(enDictionary),
	[Language.SPANISH]: flattenJSON(esDictionary),
} as const;

export type TranslationKey = keyof (typeof translations)[Language.ENGLISH];

export type TranslationDictionary = (typeof translations)[Language.ENGLISH];
