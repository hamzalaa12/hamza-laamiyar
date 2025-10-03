import React from 'react';
import { Comic } from '../types';
import ComicCard from './ComicCard';

interface HomePageProps {
  comics: Comic[];
  onSelectComic: (comic: Comic) => void;
}

const ComicSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-r-4 border-purple-500 pr-4">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {children}
        </div>
    </section>
);


const HomePage: React.FC<HomePageProps> = ({ comics, onSelectComic }) => {
  if (comics.length === 0) {
    return (
        <div className="text-center py-20">
            <p className="text-2xl text-gray-400">لم يتم العثور على نتائج.</p>
        </div>
    )
  }

  const latestWorks = [...comics].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 12);
  const latestChapters = [...comics]
      .filter(c => c.chapters.length > 0)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 12);
    
  return (
    <main className="container mx-auto px-4 py-8">
      <ComicSection title="آخر الفصول المحدثة">
        {latestChapters.map(comic => (
          <ComicCard key={comic.id} comic={comic} onSelect={onSelectComic} showLatestChapter={true} />
        ))}
      </ComicSection>

      <ComicSection title="أحدث الأعمال المضافة">
        {latestWorks.map(comic => (
          <ComicCard key={comic.id} comic={comic} onSelect={onSelectComic} />
        ))}
      </ComicSection>
    </main>
  );
};

export default HomePage;
