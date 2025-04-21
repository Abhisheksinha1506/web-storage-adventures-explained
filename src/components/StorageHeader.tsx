
import { useState } from 'react';
import { Book } from 'lucide-react';

const StorageHeader = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 opacity-50" />
      
      <div className="relative max-w-6xl mx-auto">
        <div 
          className={`text-center transition-all duration-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          onMouseEnter={() => setIsAnimated(true)}
        >
          <div className="flex items-center justify-center mb-6">
            <Book className="h-10 w-10 text-purple-600 mr-3" />
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Web Storage</span>
              <span className="block text-indigo-600">Adventures</span>
            </h1>
          </div>
          
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore the fascinating world of browser storage mechanisms. Discover how websites store data in your browser, and why it matters to you as a developer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorageHeader;
