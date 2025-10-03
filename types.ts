export type ComicType = 'مانجا' | 'مانهوا' | 'مانها';

export interface Chapter {
  id: string;
  title: string;
  pages: string[];
  createdAt: Date;
}

export interface Comic {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  status: 'مستمرة' | 'مكتملة';
  type: ComicType;
  chapters: Chapter[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
