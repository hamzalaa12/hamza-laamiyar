import React, { useState } from 'react';
import { Comic, ComicType } from '../types';

interface AddComicFormProps {
    onAddComic: (newComicData: Omit<Comic, 'id' | 'chapters' | 'createdAt' | 'updatedAt'>) => void;
}

const initialFormData = {
    title: '',
    author: '',
    description: '',
    coverUrl: '',
    status: 'مستمرة' as 'مستمرة' | 'مكتملة',
    type: 'مانجا' as ComicType,
    tags: '',
};

const AddComicForm: React.FC<AddComicFormProps> = ({ onAddComic }) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.title || !formData.author || !formData.coverUrl) {
            alert('يرجى ملء الحقول المطلوبة: العنوان، المؤلف، ورابط صورة الغلاف.');
            return;
        }

        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);

        onAddComic({ ...formData, tags: tagsArray });
        setFormData(initialFormData);
    };

    const inputClasses = "w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">العنوان</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClasses} required />
            </div>
            <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">المؤلف</label>
                <input type="text" name="author" id="author" value={formData.author} onChange={handleChange} className={inputClasses} required />
            </div>
            <div>
                <label htmlFor="coverUrl" className="block text-sm font-medium text-gray-300 mb-1">رابط صورة الغلاف</label>
                <input type="url" name="coverUrl" id="coverUrl" value={formData.coverUrl} onChange={handleChange} className={inputClasses} required />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">الوصف</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className={inputClasses}></textarea>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">النوع</label>
                    <select name="type" id="type" value={formData.type} onChange={handleChange} className={inputClasses}>
                        <option value="مانجا">مانجا</option>
                        <option value="مانهوا">مانهوا</option>
                        <option value="مانها">مانها</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">الحالة</label>
                    <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClasses}>
                        <option value="مستمرة">مستمرة</option>
                        <option value="مكتملة">مكتملة</option>
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">التاجات (مفصولة بفاصلة)</label>
                <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} className={inputClasses} />
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                إضافة العمل
            </button>
        </form>
    );
};

export default AddComicForm;
