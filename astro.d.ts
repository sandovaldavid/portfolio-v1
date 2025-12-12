/// <reference types="astro/client" />

declare module '*.astro' {
	const component: import('astro').AstroComponent;
	export default component;
}
