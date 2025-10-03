
import React, { useState, useEffect, useCallback } from 'react';
import { Chapter, Comic } from '../types';

interface ReaderViewProps {
  comic: Comic;
  initialChapter: Chapter;
  onClose: () => void;
  onChapterChange: (chapterId: string) => Chapter | undefined;
}

const ReaderView: React.FC<ReaderViewProps> = ({ comic, initialChapter, onClose, onChapterChange }) => {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);

  const findChapterIndex = useCallback((chapterId: string) => {
    return comic.chapters.findIndex(ch => ch.id === chapterId);
  }, [comic.chapters]);

  const navigateChapter = useCallback((direction: 'next' | 'prev') => {
    const currentIndex = findChapterIndex(currentChapter.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = currentIndex - 1;
    } else {
      newIndex = currentIndex + 1;
    }

    if (newIndex >= 0 && newIndex < comic.chapters.length) {
      const nextChapter = comic.chapters[newIndex];
      setCurrentChapter(nextChapter);
      window.scrollTo(0, 0);
    }
  }, [currentChapter.id, comic.chapters, findChapterIndex]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigateChapter('next');
      if (e.key === 'ArrowLeft') navigateChapter('prev');
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateChapter, onClose]);

  const chapterIndex = findChapterIndex(currentChapter.id);
  const isFirstChapter = chapterIndex === comic.chapters.length - 1;
  const isLastChapter = chapterIndex === 0;

  return (
    <div className="fixed inset-0 bg-gray-900 z-[60] overflow-y-auto scroll-container">
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-sm p-4 flex items-center justify-between shadow-lg shadow-purple-500/10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>عودة</span>
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{comic.title}</h1>
            <p className="text-sm text-gray-400">{currentChapter.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigateChapter('prev')} disabled={isFirstChapter} className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors">السابق</button>
          <button onClick={() => navigateChapter('next')} disabled={isLastChapter} className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors">التالي</button>
        </div>
      </header>

      <main className="flex flex-col items-center">
        {currentChapter.pages.map((pageUrl, index) => (
          <img key={`${currentChapter.id}-${index}`} src={pageUrl} alt={`Page ${index + 1}`} className="max-w-full md:max-w-3xl lg:max-w-4xl" />
        ))}
      </main>

      <footer className="py-8 flex justify-center items-center gap-4">
        <button onClick={() => navigateChapter('prev')} disabled={isFirstChapter} className="px-6 py-3 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors">الفصل السابق</button>
        <button onClick={() => navigateChapter('next')} disabled={isLastChapter} className="px-6 py-3 bg-purple-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors">الفصل التالي</button>
      </footer>
    </div>
  );
};

export default ReaderView;
