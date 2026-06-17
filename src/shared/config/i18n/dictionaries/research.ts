import { Language } from '../languages';

export const researchTranslations = {
	[Language.ENGLISH]: {
		'research.title': 'Research Work',
		'research.thesis.label': 'Bachelor Thesis',
		'research.thesis.title':
			'Predicting the Abandonment State of OSS Repositories using BiLSTM Neural Networks',
		'research.thesis.problem':
			'A significant number of Open Source Software (OSS) repositories become abandoned over time, leaving dependent projects exposed to security vulnerabilities, missing updates, and technical debt. Early detection of abandonment risk is a critical yet underexplored challenge in software ecosystem health.',
		'research.thesis.hypothesis':
			'Can Bidirectional LSTM (BiLSTM) networks, trained on historical activity metrics from GitHub repositories (commits, issues, pull requests, contributor patterns), predict the abandonment state of an OSS repository with higher accuracy than traditional ML baselines?',
		'research.thesis.approach':
			'Mining Software Repositories (MSR) — extracting temporal sequences of activity signals from the GitHub API (GH Archive), engineering features that capture contribution decay, issue resolution rates, and bus factor trends, then training BiLSTM models to classify future abandonment probability.',
		'research.thesis.dataset':
			'Curated dataset of GitHub OSS repositories spanning multiple domains, labeled by abandonment state using historical activity thresholds (commit frequency, last contribution date, open issue aging).',
		'research.thesis.metrics-title': 'Evaluation Metrics',
		'research.thesis.metrics.accuracy': 'Classification accuracy vs. Logistic Regression & Random Forest baselines',
		'research.thesis.metrics.f1': 'F1-Score on imbalanced abandonment classes',
		'research.thesis.metrics.auc': 'AUC-ROC for abandonment probability ranking',
		'research.thesis.metrics.loss': 'Binary Cross-Entropy loss curves for BiLSTM training convergence',
		'research.thesis.status': 'In Progress — Phase: Model Training & Evaluation',
		'research.thesis.institution': 'National University of Piura',
		'research.thesis.keywords': [
			'BiLSTM',
			'OSS Abandonment',
			'MSR',
			'Deep Learning',
			'GitHub Mining',
			'Repository Health',
			'Time Series Classification',
		],
	},
	[Language.SPANISH]: {
		'research.title': 'Investigación',
		'research.thesis.label': 'Tesis de Pregrado',
		'research.thesis.title':
			'Predicción del Estado de Abandono de Repositorios OSS usando Redes Neuronales BiLSTM',
		'research.thesis.problem':
			'Un número significativo de repositorios de Software de Código Abierto (OSS) son abandonados con el tiempo, dejando expuestos a proyectos dependientes ante vulnerabilidades de seguridad, falta de actualizaciones y deuda técnica. La detección temprana del riesgo de abandono es un desafío crítico y poco explorado en la salud de los ecosistemas de software.',
		'research.thesis.hypothesis':
			'¿Pueden las redes BiLSTM (Bidirectional Long Short-Term Memory), entrenadas con métricas históricas de actividad de repositorios GitHub (commits, issues, pull requests, patrones de contribuidores), predecir el estado de abandono de un repositorio OSS con mayor precisión que los baselines de ML tradicionales?',
		'research.thesis.approach':
			'Mining Software Repositories (MSR) — extracción de secuencias temporales de señales de actividad desde la API de GitHub (GH Archive), ingeniería de características que capturan decaimiento de contribuciones, tasas de resolución de issues y tendencias del bus factor, para luego entrenar modelos BiLSTM que clasifiquen la probabilidad futura de abandono.',
		'research.thesis.dataset':
			'Dataset curado de repositorios OSS en GitHub de múltiples dominios, etiquetados por estado de abandono usando umbrales de actividad histórica (frecuencia de commits, fecha del último aporte, antigüedad de issues abiertos).',
		'research.thesis.metrics-title': 'Métricas de Evaluación',
		'research.thesis.metrics.accuracy':
			'Accuracy de clasificación vs. baselines Logistic Regression y Random Forest',
		'research.thesis.metrics.f1': 'F1-Score sobre clases de abandono desbalanceadas',
		'research.thesis.metrics.auc': 'AUC-ROC para ranking de probabilidad de abandono',
		'research.thesis.metrics.loss':
			'Curvas de Binary Cross-Entropy para convergencia del entrenamiento BiLSTM',
		'research.thesis.status': 'En Progreso — Fase: Entrenamiento y Evaluación del Modelo',
		'research.thesis.institution': 'Universidad Nacional de Piura',
		'research.thesis.keywords': [
			'BiLSTM',
			'Abandono OSS',
			'MSR',
			'Deep Learning',
			'Minería de GitHub',
			'Salud de Repositorios',
			'Clasificación de Series Temporales',
		],
	},
} as const;
