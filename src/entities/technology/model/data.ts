import PythonIcon from '@assets/technologies/Python.astro';
import DjangoIcon from '@assets/technologies/Django.astro';
import MarkdownIcon from '@assets/technologies/Markdown.astro';
import BootstrapIcon from '@assets/technologies/Bootstrap.astro';
import JavaScriptIcon from '@assets/technologies/JavaScript.astro';
import CSSIcon from '@assets/technologies/CSS.astro';
import HTMLIcon from '@assets/technologies/HTML.astro';
import TailwindIcon from '@assets/technologies/Tailwind.astro';
import ReactIcon from '@assets/technologies/React.astro';
import NextJSIcon from '@assets/technologies/NextJS.astro';
import MySQLIcon from '@assets/technologies/MySQL.astro';
import MaterialUIIcon from '@assets/technologies/MaterialUI.astro';
import PostgreSQLIcon from '@assets/technologies/PostgreSQL.astro';
import ExpressIcon from '@assets/technologies/Express.astro';
import CloudinaryIcon from '@assets/technologies/Cloudinary.astro';
import SQLiteIcon from '@assets/technologies/SQLite.astro';
import SanityIcon from '@assets/technologies/Sanity.astro';
import ChartJsIcon from '@assets/technologies/ChartJs.astro';
import AstroIcon from '@assets/technologies/AstroIcon.astro';

import type { TechnologyTags } from './types';

/**
 * Technology tags database
 * Contains all available technologies used in projects
 */
export const TAGS: TechnologyTags = {
	PYTHON: {
		name: 'Python',
		class: 'bg-blue-500 text-white',
		icon: PythonIcon,
	},
	DJANGO: {
		name: 'Django',
		class: 'bg-green-500 text-white',
		icon: DjangoIcon,
	},
	MARKDOWN: {
		name: 'Markdown',
		class: 'bg-gray-500 text-white',
		icon: MarkdownIcon,
	},
	BOOTSTRAP: {
		name: 'Bootstrap',
		class: 'bg-purple-500 text-white',
		icon: BootstrapIcon,
	},
	JAVASCRIPT: {
		name: 'JavaScript',
		class: 'bg-yellow-500 text-white',
		icon: JavaScriptIcon,
	},
	CSS: {
		name: 'CSS',
		class: 'bg-blue-500 text-white',
		icon: CSSIcon,
	},
	HTML: {
		name: 'HTML',
		class: 'bg-red-500 text-white',
		icon: HTMLIcon,
	},
	TAILWIND: {
		name: 'Tailwind',
		class: 'bg-blue-500 text-white',
		icon: TailwindIcon,
	},
	REACT: {
		name: 'React',
		class: 'bg-blue-500 text-white',
		icon: ReactIcon,
	},
	NEXTJS: {
		name: 'Next.js',
		class: 'bg-black text-white',
		icon: NextJSIcon,
	},
	MYSQL: {
		name: 'MySQL',
		class: 'bg-blue-500 text-white',
		icon: MySQLIcon,
	},
	MATERIALUI: {
		name: 'Material-UI',
		class: 'bg-white text-blue-600',
		icon: MaterialUIIcon,
	},
	POSTGRESQL: {
		name: 'PostgreSQL',
		class: 'bg-blue-500 text-white',
		icon: PostgreSQLIcon,
	},
	EXPRESS: {
		name: 'Express',
		class: 'bg-black text-white border border-withe',
		icon: ExpressIcon,
	},
	CLOUDINARY: {
		name: 'Cloudinary',
		class: 'bg-white text-blue-900',
		icon: CloudinaryIcon,
	},
	SQLITE: {
		name: 'SQLite',
		class: 'bg-blue-500 text-white',
		icon: SQLiteIcon,
	},
	SANITY: {
		name: 'Sanity',
		class: 'bg-black text-white',
		icon: SanityIcon,
	},
	CHARTJS: {
		name: 'Chart.js',
		class: 'bg-blue-500 text-white',
		icon: ChartJsIcon,
	},
	ASTRO: {
		name: 'Astro',
		class: 'bg-black text-white',
		icon: AstroIcon,
	},
} as const;
