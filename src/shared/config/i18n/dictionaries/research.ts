import { Language } from '../languages';

export const researchTranslations = {
	[Language.ENGLISH]: {
		'research.title': 'Research Work',
		'research.thesis.title': 'Predicting Code Quality Degradation using LSTM Networks',
		'research.thesis.problem':
			'Fragmentation of maintainability in mission-critical software (OSS/Health repositories)',
		'research.thesis.hypothesis':
			'Can RNNs (LSTM) predict code quality degradation based on historical commit metrics?',
		'research.thesis.dataset': 'Curated selection of GitHub repositories (Health-Tech / OSS)',
		'research.thesis.evaluation':
			'MAE (Mean Absolute Error) comparison against linear regression baseline',
		'research.thesis.status': 'In Progress - Phase: Dataset Preprocessing',
		'research.thesis.metrics-title': 'Evaluation Strategy',
		'research.thesis.metrics.mae': 'MAE comparison vs. linear regression baseline',
		'research.thesis.metrics.loss': 'Loss curves documented in project README',
		'research.thesis.keywords': [
			'MSR',
			'LSTM',
			'Code Quality',
			'Maintainability',
			'Deep Learning',
		],
	},
	[Language.SPANISH]: {
		'research.title': 'Trabajo de Investigación',
		'research.thesis.title': 'Predicción de Degradación de Calidad de Código usando Redes LSTM',
		'research.thesis.problem':
			'Fragmentación de la mantenibilidad en software de misión crítica (Repositorios OSS/Salud)',
		'research.thesis.hypothesis':
			'¿Pueden las RNN (LSTM) predecir la degradación de la calidad del código basándose en métricas históricas de commits?',
		'research.thesis.dataset': 'Selección curada de repositorios en GitHub (Health-Tech / OSS)',
		'research.thesis.evaluation':
			'Comparación de MAE (Mean Absolute Error) contra un baseline de regresión lineal',
		'research.thesis.status': 'En Progreso - Fase: Preprocesamiento del Dataset',
		'research.thesis.metrics-title': 'Estrategia de Evaluación',
		'research.thesis.metrics.mae': 'Comparación de MAE vs. baseline de regresión lineal',
		'research.thesis.metrics.loss': 'Curvas de pérdida documentadas en el README del proyecto',
		'research.thesis.keywords': [
			'MSR',
			'LSTM',
			'Calidad de Código',
			'Mantenibilidad',
			'Deep Learning',
		],
	},
} as const;
