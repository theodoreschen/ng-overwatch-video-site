export function initializeVideoMetadata(): VideoMetadata {
  return <VideoMetadata>{
    video_url: null,
    video_date: null,
    video_title: null,
    hero: null,
    description: null,
    type: null,
    tags: [],
    youtube_iframe: null
  };
}

export interface VideoMetadata {
  video_url: string,
  video_date: string,
  video_title: string,
  hero: string,
  description: string,
  type: string,
  tags: string[],
  youtube_iframe: string
};