
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12 py-6">
      <div className="container mx-auto text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} MangaVerse. جميع الحقوق محفوظة.</p>
        <p className="text-sm mt-2">تم إنشاؤه بحب لعشاق المانجا.</p>
      </div>
    </footer>
  );
};

export default Footer;
