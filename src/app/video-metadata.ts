import { Hero } from './hero';

export interface VideoMetadata {
  videoUrl: string,
  videoDate: string,
  videoTitle: string,
  hero: Hero,
  description: string,
  tags: string,
  ytIframe: string
};