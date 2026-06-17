import { Language } from '../languages';

export const splashScreenTranslations = {
	[Language.ENGLISH]: {
		'splash.press-enter': '[ PRESS ENTER / CLICK START ]',
		'splash.initializing': '> INITIALIZING SYSTEM MODULES...',
		'splash.loading-stack': '> LOADING TECH STACK LIBRARY... [ OK ]',
		'splash.connecting-github': '> CONNECTING TO GITHUB API... [ OK ]',
		'splash.ready-player': '> READY PLAYER 1 // ',
		'splash.welcome': '>> HELLO VISITOR. WELCOME TO MY PORTFOLIO.',
		'splash.prepare': '>> PREPARE FOR AN INTERACTIVE ADVENTURE...',
	},
	[Language.SPANISH]: {
		'splash.press-enter': '[ PRESIONA ENTER / CLICK INICIAR ]',
		'splash.initializing': '> INICIALIZANDO MÓDULOS DEL SISTEMA...',
		'splash.loading-stack': '> CARGANDO LIBRERÍA DE TECH STACK... [ OK ]',
		'splash.connecting-github': '> CONECTANDO A LA API DE GITHUB... [ OK ]',
		'splash.ready-player': '> JUGADOR 1 LISTO // ',
		'splash.welcome': '>> HOLA VISITANTE. BIENVENIDO A MI PORTAFOLIO.',
		'splash.prepare': '>> PREPÁRATE PARA UNA AVENTURA INTERACTIVA...',
	},
} as const;
