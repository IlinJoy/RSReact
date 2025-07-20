interface Images {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
  medium_image_url?: string;
  maximum_image_url?: string;
}

export interface ApiImages {
  jpg: Images;
  webp: Images;
}

export interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images?: Images;
}

export interface ApiTitles {
  type: string;
  title: string;
}

export interface ApiResource {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
