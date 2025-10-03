import React, { useState } from 'react';
import { Comic, Chapter } from '../types';
import AddComicForm from './AddComicForm';
import AddChapterForm from './AddChapterForm';

interface AdminDashboardProps {
    comics: Comic[];
    onAddComic: (newComicData: Omit<Comic, 'id' | 'chapters' | 'createdAt' | 'updatedAt'>) => void;
    onAddChapter: (comicId: string, newChapterData: Omit<Chapter, 'id' | 'createdAt'>) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ comics, onAddComic, onAddChapter }) => {
    const [selectedComicForChapter, setSelectedComicForChapter] = useState<Comic | null>(null);

    const sortedComics = [...comics].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-white border-r-4 border-purple-500 pr-4">لوحة التحكم</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-gray-800/50 p-6 rounded-lg self-start">
                    <h2 className="text-2xl font-bold mb-4 text-white">إضافة عمل جديد</h2>
                    <AddComicForm onAddComic={onAddComic} />
                </div>

                <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-white">إدارة الأعمال الحالية ({comics.length})</h2>
                    <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scroll-container">
                        {sortedComics.map(comic => (
                            <div key={comic.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center transition-colors hover:bg-gray-700">
                                <span className="text-white font-semibold">{comic.title}</span>
                                <button 
                                    onClick={() => setSelectedComicForChapter(comic)} 
                                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-3 rounded-md transition-colors duration-300"
                                >
                                    إضافة فصل
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedComicForChapter && (
                <AddChapterForm 
                    comic={selectedComicForChapter} 
                    onAddChapter={onAddChapter}
                    onClose={() => setSelectedComicForChapter(null)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
