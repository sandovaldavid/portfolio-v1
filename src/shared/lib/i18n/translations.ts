import type { Language } from '@shared/config/i18n';
import { translations, type TranslationKey } from '@shared/config/i18n';

/**
 * Retorna una función para obtener traducciones en el idioma especificado.
 *
 * @param locale Idioma/localización actual.
 * @returns Función que recibe una clave y retorna la traducción correspondiente.
 */
export function useTranslations(locale: Language) {
	/**
	 * Obtiene la traducción para una clave dada en el idioma actual.
	 *
	 * @param key Clave de traducción.
	 * @returns Traducción correspondiente o la clave si no existe traducción.
	 */
	return function t(key: TranslationKey): string {
		const value = translations[locale]?.[key];

		if (!value) {
			console.warn(`Missing translation: ${key} for locale: ${locale}`);
			return key as string;
		}

		// Algunas entradas pueden ser arrays (por ejemplo, listas). Tomamos el primer elemento.
		if (Array.isArray(value)) {
			return (value[0] ?? key) as string;
		}

		return value as string;
	};
}

/**
 * Retorna traducciones preservando arrays cuando la clave corresponde a una lista.
 * Útil para descripciones en bullet points, tecnologías, etc.
 */
export function useTranslationsList(locale: Language) {
	return function tList(key: TranslationKey): string | string[] {
		const value = translations[locale]?.[key];
		if (!value) {
			console.warn(`Missing translation: ${key} for locale: ${locale}`);
			return key as string;
		}
		return Array.isArray(value) ? [...value] : (value as string);
	};
}
