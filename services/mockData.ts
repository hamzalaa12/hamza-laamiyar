import { Comic, Chapter } from '../types';

const COMIC_TYPES = ['مانجا', 'مانهوا', 'مانها'] as const;
const STATUSES = ['مستمرة', 'مكتملة'] as const;
const AUTHORS = ['يوكيمورا ماكوتو', 'كينتارو ميورا', 'إييتشيرو أودا', 'هاجيمي إيساياما', 'ماساشي كيشيموتو'];
const TAGS = ['أكشن', 'مغامرة', 'خيال', 'دراما', 'كوميديا', 'رومانسي', 'شونين', 'سينين'];
const TITLES = [
  'هجوم العمالقة',
  'قطعة واحدة',
  'ناروتو',
  'بيرسيرك',
  'فينلاند ساغا',
  'صياد ضد صياد',
  'قاتل الشياطين',
  'برج الإله',
  'تسوية فردية',
  'فن السيف عبر الإنترنت'
];

const generateChapters = (comicId: string, chapterCount: number): Chapter[] => {
  return Array.from({ length: chapterCount }, (_, i) => {
    const chapterNum = chapterCount - i;
    return {
      id: `${comicId}-chapter-${chapterNum}`,
      title: `الفصل ${chapterNum}`,
      pages: Array.from({ length: Math.floor(Math.random() * 20) + 15 }, () => `https://picsum.photos/800/1200?random=${Math.random()}`),
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // Simulate chapters being added over time
    };
  });
};

const getRandomElement = <T extends string | number>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomTags = (): string[] => {
    const shuffled = [...TAGS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
}

export const generateMockComics = (count: number): Comic[] => {
  const comics: Comic[] = [];
  const usedTitles = new Set<string>();

  while(comics.length < count) {
    const title = getRandomElement(TITLES);
    if(usedTitles.has(title)) continue;
    usedTitles.add(title);
    
    const id = title.toLowerCase().replace(/\s/g, '-');
    const hasDescription = Math.random() > 0.3;

    const createdAt = new Date(Date.now() - comics.length * 3 * 24 * 60 * 60 * 1000);
    const chapters = generateChapters(id, Math.floor(Math.random() * 150) + 10);
    const updatedAt = chapters[0]?.createdAt || createdAt;

    comics.push({
      id,
      title,
      author: getRandomElement(AUTHORS),
      description: hasDescription ? 'هذه قصة مغامرة مثيرة في عالم خيالي مليء بالسحر والوحوش. يتبع بطلنا رحلة ملحمية لتحقيق مصيره ومواجهة قوى الظلام التي تهدد بتدمير العالم. هل سينجح في مهمته؟' : '',
      coverUrl: `https://picsum.photos/400/600?random=${id}`,
      status: getRandomElement(STATUSES),
      type: getRandomElement(COMIC_TYPES),
      chapters: chapters,
      tags: getRandomTags(),
      createdAt,
      updatedAt,
    });
  }
  return comics.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const mockComics: Comic[] = generateMockComics(20);
