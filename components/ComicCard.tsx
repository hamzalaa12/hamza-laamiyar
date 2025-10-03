import React from 'react';
import { Comic } from '../types';

interface ComicCardProps {
  comic: Comic;
  onSelect: (comic: Comic) => void;
  showLatestChapter?: boolean;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic, onSelect, showLatestChapter }) => {
  const typeColor = {
    'مانجا': 'bg-red-500',
    'مانهوا': 'bg-blue-500',
    'مانها': 'bg-green-500',
  };

  return (
    <div
      className="group relative rounded-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 shadow-lg"
      onClick={() => onSelect(comic)}
    >
      <img src={comic.coverUrl} alt={comic.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 right-0 p-4 text-right w-full">
        <h3 className="text-white text-lg font-bold drop-shadow-md truncate">{comic.title}</h3>
        {showLatestChapter && comic.chapters.length > 0 && (
          <p className="text-purple-300 text-sm mt-1">{comic.chapters[0].title}</p>
        )}
        <span className={`text-xs text-white px-2 py-1 rounded-full ${typeColor[comic.type]} mt-1 inline-block`}>
          {comic.type}
        </span>
      </div>
       <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xl font-bold">عرض التفاصيل</p>
       </div>
    </div>
  );
};

export default ComicCard;
