import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-elfsborg-border bg-elfsborg-black pt-6 pb-4 md:pt-8 md:pb-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-4">
        <div className="flex flex-row items-center justify-center md:justify-start gap-3 md:gap-4">
          <img 
            src="https://pbs.twimg.com/profile_images/1962512980840419328/yFawlVRF_400x400.jpg" 
            alt="Elfsborg Daily" 
            className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-elfsborg-surfaceHighlight shadow-lg"
          />
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter leading-none text-center md:text-left drop-shadow-xl">
            Elfsborg <span className="text-transparent bg-clip-text bg-gradient-to-br from-elfsborg-yellow to-yellow-600">Daily</span>
          </h1>
        </div>
        
        <div className="flex justify-center md:justify-end">
          <a 
            href="https://x.com/ElfsborgDaily" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-elfsborg-surface border border-elfsborg-border hover:border-elfsborg-yellow hover:bg-elfsborg-surfaceHighlight px-4 py-2.5 rounded transition-all duration-200 group"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-300 group-hover:text-white fill-current transition-colors" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
            <span className="font-bold text-sm text-gray-200 tracking-wide group-hover:text-white">
              @ElfsborgDaily
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;