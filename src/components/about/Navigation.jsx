import React from 'react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 right-0 z-50 p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <a
          href="/projects"
          className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-mono text-xs sm:text-sm"
          title="Projects"
        >
          ./builds
        </a>
        <a
          href="/blog"
          className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-mono text-xs sm:text-sm"
          title="Blog"
        >
          ./checkpoints
        </a>
        <span className="text-primary-400 opacity-50 font-mono text-xs sm:text-sm cursor-default hidden sm:inline">
          .about()
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
