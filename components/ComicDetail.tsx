import React, { useState } from 'react';
import { Comic, Chapter } from '../types';
import { generateSynopsis } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';

interface ComicDetailProps {
  comic: Comic;
  onClose: () => void;
  onSelectChapter: (chapter: Chapter) => void;
}

const ComicDetail: React.FC<ComicDetailProps> = ({ comic, onClose, onSelectChapter }) => {
  const [synopsis, setSynopsis] = useState(comic.description);
  const [isLoadingSynopsis, setIsLoadingSynopsis] = useState(false);

  const handleGenerateSynopsis = async () => {
    if (isLoadingSynopsis) return;
    setIsLoadingSynopsis(true);
    const generated = await generateSynopsis(comic.title, comic.type);
    setSynopsis(generated);
    setIsLoadingSynopsis(false);
  };
  
  const handleChapterClick = (chapter: Chapter) => {
    onSelectChapter(chapter);
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl shadow-purple-500/20 w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl h-[90vh] overflow-hidden flex flex-col md:flex-row relative animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="md:w-1/3 w-full h-1/3 md:h-full flex-shrink-0">
          <img src={comic.coverUrl} alt={comic.title} className="w-full h-full object-cover" />
        </div>

        <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col overflow-y-auto scroll-container">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{comic.title}</h2>
          <p className="text-purple-400 mb-4">{comic.author}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-xs text-white px-3 py-1 rounded-full ${comic.status === 'مستمرة' ? 'bg-green-600' : 'bg-yellow-600'}`}>{comic.status}</span>
            {comic.tags.map(tag => (
              <span key={tag} className="text-xs text-gray-300 bg-gray-700 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-gray-300">الملخص</h4>
              {!comic.description && (
                <button
                  onClick={handleGenerateSynopsis}
                  disabled={isLoadingSynopsis}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed text-white text-sm px-3 py-1 rounded-md transition-colors"
                >
                  {isLoadingSynopsis ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      <span>جاري...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-4 h-4" />
                      <span>إنشاء بالذكاء الاصطناعي</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{synopsis || 'لا يتوفر ملخص لهذا العمل.'}</p>
          </div>

          <h4 className="text-lg font-semibold text-gray-300 mb-3">الفصول</h4>
          <div className="flex-grow overflow-y-auto border border-gray-800 rounded-md bg-gray-900/50 p-2 scroll-container">
            <ul className="divide-y divide-gray-800">
              {comic.chapters.map(chapter => (
                <li 
                  key={chapter.id} 
                  onClick={() => handleChapterClick(chapter)}
                  className="p-3 text-gray-300 hover:bg-purple-500/10 hover:text-white cursor-pointer transition-colors rounded-md"
                >
                  {chapter.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Fix: Removed the non-standard 'jsx' prop from the <style> tag to resolve the TypeScript error. */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ComicDetail;