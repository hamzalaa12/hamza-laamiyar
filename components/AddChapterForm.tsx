import React, { useState, useEffect } from 'react';
import { Comic, Chapter } from '../types';

interface AddChapterFormProps {
    comic: Comic;
    onClose: () => void;
    onAddChapter: (comicId: string, newChapterData: Omit<Chapter, 'id' | 'createdAt'>) => void;
}

const AddChapterForm: React.FC<AddChapterFormProps> = ({ comic, onClose, onAddChapter }) => {
    const nextChapterNumber = (comic.chapters[0]?.title.match(/\d+/) || [0])[0] as number + 1 || comic.chapters.length + 1;
    const [title, setTitle] = useState(`الفصل ${nextChapterNumber}`);
    const [pages, setPages] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pagesArray = pages.split('\n').map(p => p.trim()).filter(Boolean);
        if (!title || pagesArray.length === 0) {
            alert('يرجى إدخال عنوان الفصل ورابط صفحة واحدة على الأقل.');
            return;
        }
        onAddChapter(comic.id, { title, pages: pagesArray });
        alert(`تمت إضافة "${title}" إلى "${comic.title}" بنجاح!`);
        onClose();
    };
    
    const inputClasses = "w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

    return (
        <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-gray-900 shadow-2xl shadow-purple-500/20 rounded-lg p-6 md:p-8 w-11/12 md:w-1/2 max-w-2xl relative animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-white mb-4">إضافة فصل جديد لـ <span className="text-purple-400">{comic.title}</span></h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="chapterTitle" className="block text-sm font-medium text-gray-300 mb-1">عنوان الفصل</label>
                        <input 
                            type="text" 
                            id="chapterTitle" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className={inputClasses}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="pages" className="block text-sm font-medium text-gray-300 mb-1">روابط الصفحات (رابط واحد في كل سطر)</label>
                        <textarea 
                            id="pages" 
                            value={pages} 
                            onChange={(e) => setPages(e.target.value)} 
                            rows={8} 
                            className={inputClasses}
                            placeholder="https://example.com/page1.jpg&#10;https://example.com/page2.jpg"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                        >
                            إلغاء
                        </button>
                        <button 
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                        >
                            إضافة الفصل
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default AddChapterForm;
