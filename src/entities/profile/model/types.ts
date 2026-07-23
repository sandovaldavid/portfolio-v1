import type { CollectionEntry } from 'astro:content';

export type PortfolioProfile = CollectionEntry<'portfolioProfile'>;
export type PortfolioProfileData = PortfolioProfile['data'];
