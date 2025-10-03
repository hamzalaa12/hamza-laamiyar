import React from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigate: (view: 'home' | 'admin') => void;
  currentView: 'home' | 'admin';
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onNavigate, currentView }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 p-4 shadow-lg shadow-purple-500/10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider cursor-pointer" onClick={() => onNavigate('home')}>
          <span className="text-purple-400">Manga</span>Verse
        </h1>
        <div className="flex items-center gap-4">
          {currentView === 'home' && (
            <div className="relative w-48 md:w-64">
              <input
                type="text"
                placeholder="ابحث عن مانجا..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          )}
          <button 
            onClick={() => onNavigate(currentView === 'home' ? 'admin' : 'home')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            {currentView === 'home' ? 'لوحة التحكم' : 'العودة للرئيسية'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
