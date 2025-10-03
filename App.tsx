import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ComicDetail from './components/ComicDetail';
import ReaderView from './components/ReaderView';
import AdminDashboard from './components/AdminDashboard';
import { Comic, Chapter } from './types';
import { mockComics } from './services/mockData';

const App: React.FC = () => {
  const [comics, setComics] = useState<Comic[]>(mockComics);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [view, setView] = useState<'home' | 'admin'>('home');

  const filteredComics = useMemo(() => {
    return comics.filter(comic =>
      comic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [comics, searchQuery]);
  
  const handleSelectChapter = (chapter: Chapter) => {
    setCurrentChapter(chapter);
  };

  const handleCloseReader = () => {
    setCurrentChapter(null);
  };

  const handleCloseDetail = () => {
    setSelectedComic(null);
  };
  
  const handleChapterChange = (chapterId: string): Chapter | undefined => {
      if(!selectedComic) return undefined;
      const chapter = selectedComic.chapters.find(ch => ch.id === chapterId);
      return chapter;
  }
  
  const handleAddComic = (newComicData: Omit<Comic, 'id' | 'chapters' | 'createdAt' | 'updatedAt'>) => {
    const newComic: Comic = {
        ...newComicData,
        id: newComicData.title.toLowerCase().replace(/\s/g, '-') + `-${Date.now()}`,
        chapters: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    setComics(prevComics => [newComic, ...prevComics]);
    alert(`تمت إضافة "${newComic.title}" بنجاح!`);
  };

  const handleAddChapter = (comicId: string, newChapterData: Omit<Chapter, 'id' | 'createdAt'>) => {
    setComics(comics.map(comic => {
        if (comic.id === comicId) {
            const newChapter: Chapter = {
                ...newChapterData,
                id: `${comicId}-chapter-${comic.chapters.length + 1}`,
                createdAt: new Date(),
            };
            return {
                ...comic,
                chapters: [newChapter, ...comic.chapters],
                updatedAt: newChapter.createdAt,
            };
        }
        return comic;
    }));
  };


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onNavigate={setView}
        currentView={view}
      />
      <div className="flex-grow">
        {view === 'home' ? (
          <HomePage comics={filteredComics} onSelectComic={setSelectedComic} />
        ) : (
          <AdminDashboard comics={comics} onAddComic={handleAddComic} onAddChapter={handleAddChapter} />
        )}
      </div>
      <Footer />
      
      {selectedComic && !currentChapter && (
        <ComicDetail 
          comic={selectedComic} 
          onClose={handleCloseDetail} 
          onSelectChapter={handleSelectChapter} 
        />
      )}
      
      {currentChapter && selectedComic && (
        <ReaderView 
          comic={selectedComic}
          initialChapter={currentChapter}
          onClose={handleCloseReader}
          onChapterChange={handleChapterChange}
        />
      )}
    </div>
  );
};

export default App;
