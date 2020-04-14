export function initializeVideoMetadata(): VideoMetadata {
  return <VideoMetadata>{
    video_url: '',
    video_date: '',
    video_title: '',
    hero: '',
    description: '',
    type: '',
    tags: [],
    youtube_iframe: ''
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