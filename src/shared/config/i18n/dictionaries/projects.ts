import { Language } from '../languages';

export const projectsTranslations = {
	[Language.ENGLISH]: {
		'projects.code-button': 'Code',
		'projects.preview-button': 'Preview',
		'projects.category.machine-learning': 'Machine Learning · Thesis Project',
		'projects.category.fullstack': 'Full-Stack Development',
		'projects.category.enterprise': 'Enterprise Software',

		// Wiki
		'projects.wiki.title': 'Wiki',
		'projects.wiki.description':
			'This project is a Django-built encyclopedia-type website called "wiki", which contains a single application called "encyclopedia"',

		// Auctions
		'projects.auctions.title': 'Auctions',
		'projects.auctions.description':
			'The Auction Site is a web application where users can create, bid on, and manage online auctions. It provides a platform for users to list items for sale, place competitive bids, and interact with the auction community through comments and watchlists.',

		// Campus Map UNP
		'projects.campus-map.title': 'UNP Campus Map',
		'projects.campus-map.description':
			'A centralized, location-first platform helping students at the National University of Piura to quickly find faculties, pavilions, and academic resources. Built with Next.js 14 and MySQL.',

		// FluentReads
		'projects.fluentreads.title': 'FluentReads',
		'projects.fluentreads.description':
			'A modern online store specializing in the sale of English books, international exams, and study packages. It features an interactive catalog, functional shopping cart, and checkout flow, built with Astro Islands architecture for maximum performance.',

		// MAD-AI
		'projects.madai.title': 'MAD AI',
		'projects.madai.description':
			'A modern administrative platform built with Angular 20 and Clean Architecture. It incorporates advanced user and role management, secure authentication, notifications, and server-side rendering (SSR) with Express, all styled with the latest version of Tailwind CSS.',
	},
	[Language.SPANISH]: {
		'projects.code-button': 'Código',
		'projects.preview-button': 'Vista previa',
		'projects.category.machine-learning': 'Machine Learning · Proyecto de Tesis',
		'projects.category.fullstack': 'Desarrollo Full-Stack',
		'projects.category.enterprise': 'Software Empresarial',

		// Wiki
		'projects.wiki.title': 'Wiki',
		'projects.wiki.description':
			"Este proyecto es un sitio web tipo enciclopedia construido con Django, llamado 'wiki', que contiene una única aplicación llamada 'encyclopedia'",

		// Auctions
		'projects.auctions.title': 'Auctions',
		'projects.auctions.description':
			'El Sitio de Subastas es una aplicación web donde los usuarios pueden crear, pujar y gestionar subastas en línea. Proporciona una plataforma para que los usuarios enumeren artículos para la venta, realicen ofertas competitivas e interactúen con la comunidad de subastas a través de comentarios y listas de seguimiento.',

		// Campus Map UNP
		'projects.campus-map.title': 'UNP Campus Map',
		'projects.campus-map.description':
			'Una plataforma centralizada y orientada a la ubicación que ayuda a los estudiantes de la Universidad Nacional de Piura a encontrar rápidamente facultades, pabellones y recursos académicos. Construido con Next.js 14 y MySQL.',

		// FluentReads
		'projects.fluentreads.title': 'FluentReads',
		'projects.fluentreads.description':
			'Una tienda en línea moderna especializada en la venta de libros en inglés, exámenes internacionales y paquetes de estudio. Cuenta con un catálogo interactivo, carrito de compras funcional y flujo de pago, construida con la arquitectura de Islas de Astro para máximo rendimiento.',

		// MAD-AI
		'projects.madai.title': 'MAD AI',
		'projects.madai.description':
			'Una plataforma administrativa moderna construida con Angular 20 y Clean Architecture. Incorpora gestión avanzada de usuarios y roles, autenticación segura, notificaciones y renderizado del lado del servidor (SSR) con Express, todo estilizado con la última versión de Tailwind CSS.',
	},
} as const;
