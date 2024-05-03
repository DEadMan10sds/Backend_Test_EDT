interface ImageItem {
  src: string;
  alt: string;
}

interface Content {
  paragraph?: string;
  image?: ImageItem[];
  list?: string[];
}

export interface Information {
  title: string;
  content: Content[];
}
