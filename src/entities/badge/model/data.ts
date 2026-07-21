import type { BadgeItem } from './types';

/**
 * Certification badges database
 */
export function getBadgesData(t: (key: string) => string): BadgeItem[] {
	return [
		{
			label: t('badges.github-foundations.label'),
			link: 'https://www.credly.com/badges/5ba766a3-e275-4be8-ac14-17a69119b3af/linked_in_profile',
			image: 'https://images.credly.com/size/340x340/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png',
		},
		{
			label: t('badges.data-modeling.label'),
			link: 'https://app.aluracursos.com/degree/certificate/d26312ad-b17d-4a4f-9b91-a761ea22fd25?lang',
			image: 'https://cdn1.gnarususercontent.com.br/6/409126/0cbae998-197d-4fc8-ac13-5d12d560e624.png',
		},
		{
			label: t('badges.etl.label'),
			link: 'https://app.aluracursos.com/degree/certificate/817f4fb9-ad6a-429d-b67b-7769f0cd935c?lang',
			image: 'https://cdn1.gnarususercontent.com.br/6/409126/007f0f58-5970-4133-94b8-9af2551f2ab2.png',
		},
		{
			label: t('badges.statistics-ml.label'),
			link: 'https://app.aluracursos.com/degree/certificate/2f9a9981-0e97-4d43-a400-e3b2761d407d?lang',
			image: 'https://cdn1.gnarususercontent.com.br/6/409126/832d01c5-aa1f-4a72-894b-9bb18b8d2a00.png',
		},
	];
}
