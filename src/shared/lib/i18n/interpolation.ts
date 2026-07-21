/**
 * Helper para traducciones con interpolación de variables.
 *
 * @param template Cadena de texto con variables en formato {{variable}}.
 * @param vars Objeto con los valores a interpolar en la plantilla.
 * @returns Cadena de texto con las variables reemplazadas por sus valores.
 *
 * @example
 * const text = interpolate('Hola {{name}}', { name: 'David' });
 */
export function interpolate(template: string, vars: Record<string, string | number>): string {
	return Object.entries(vars).reduce(
		(result, [key, value]) => result.replaceAll(`{{${key}}}`, String(value)),
		template
	);
}
